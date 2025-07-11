import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
} from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { FiEdit, FiTrash, FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import JSZip from 'jszip';

const FileUploadAndSelect = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [extractingZip, setExtractingZip] = useState(false);
  const [uploadedItems, setUploadedItems] = useState([]);
  const fileInputRefs = useRef({});
  const categories = ['Offset Print', 'Invitation', 'Flex', 'Digital Print'];
  const uploadsRef = collection(db, 'uploads');

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const snapshot = await getDocs(uploadsRef);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        imageUrls: doc.data().imageUrls || []
      }));
      setUploadedItems(items);
    } catch (error) {
      console.error('Error fetching uploads:', error);
      toast.error('Failed to load uploads');
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Reset input to allow selecting same file again
    e.target.value = null;

    // Check if any file is a ZIP
    const zipFile = files.find(file => file.name.toLowerCase().endsWith('.zip'));

    if (zipFile) {
      setExtractingZip(true);
      try {
        const zip = new JSZip();
        const contents = await zip.loadAsync(zipFile);
        
        const imageFiles = [];
        const mimeTypes = {
          jpg: 'image/jpeg',
          jpeg: 'image/jpeg',
          png: 'image/png',
          gif: 'image/gif',
          webp: 'image/webp',
          bmp: 'image/bmp',
          tif: 'image/tiff',
          tiff: 'image/tiff'
        };
        
        // Process each file in ZIP
        const filePromises = [];
        contents.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            const parts = zipEntry.name.split('.');
            if (parts.length > 1) {
              const extension = parts.pop().toLowerCase();
              
              if (mimeTypes[extension]) {
                filePromises.push(
                  zipEntry.async('blob').then(blob => {
                    const file = new File(
                      [blob], 
                      zipEntry.name, 
                      { type: mimeTypes[extension] || 'application/octet-stream' }
                    );
                    imageFiles.push(file);
                  })
                );
              }
            }
          }
        });
        
        await Promise.all(filePromises);
        
        // Validate image count
        if (imageFiles.length < 5) {
          toast.error('ZIP must contain at least 5 images');
          return;
        }
        if (imageFiles.length > 30) {
          toast.error('ZIP can contain at most 30 images');
          return;
        }
        
        setSelectedFiles(imageFiles);
      } catch (error) {
        console.error('Error extracting ZIP:', error);
        toast.error('Failed to extract ZIP: ' + error.message);
      } finally {
        setExtractingZip(false);
      }
    } else {
      // Handle regular image files
      const mimeTypes = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        bmp: 'image/bmp',
        tif: 'image/tiff',
        tiff: 'image/tiff'
      };
      
      const validImages = files.filter(file => {
        const extension = file.name.split('.').pop().toLowerCase();
        return Object.keys(mimeTypes).includes(extension);
      });
      
      const newFiles = validImages.slice(0, 5 - selectedFiles.length);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ClientProject');

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dt0scx3rz/image/upload',
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0 || !selectedCategory) {
      toast.error('Please select files and a category');
      return;
    }
    
    if (selectedFiles.length < 5 && selectedFiles.some(f => f.name.endsWith('.zip'))) {
      toast.error('ZIP uploads must contain at least 5 images');
      return;
    }

    setUploading(true);
    const toastId = toast.loading(`Uploading ${selectedFiles.length} images...`);

    try {
      const uploadPromises = selectedFiles.map(file => uploadToCloudinary(file));
      const imageUrls = await Promise.all(uploadPromises);

      await addDoc(uploadsRef, {
        imageUrls,
        category: selectedCategory,
        createdAt: serverTimestamp(),
      });

      toast.dismiss(toastId);
      toast.success(`Uploaded ${imageUrls.length} images successfully!`);
      setSelectedFiles([]);
      setSelectedCategory('');
      fetchUploads();
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (groupId, index) => {
    if (!window.confirm('Delete this image?')) return;
    const itemRef = doc(db, 'uploads', groupId);
    const item = uploadedItems.find(item => item.id === groupId);

    if (!item) return toast.error('Item not found');

    const updatedImages = item.imageUrls.filter((_, i) => i !== index);

    await updateDoc(itemRef, { imageUrls: updatedImages });
    toast.success('Image deleted');
    fetchUploads();
  };

  const handleImageReplace = async (e, groupId, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading('Replacing image...');
    try {
      const newUrl = await uploadToCloudinary(file);
      const item = uploadedItems.find(item => item.id === groupId);
      if (!item) throw new Error('Item not found');

      const updatedImages = [...item.imageUrls];
      updatedImages[index] = newUrl;

      await updateDoc(doc(db, 'uploads', groupId), {
        imageUrls: updatedImages
      });

      toast.dismiss(toastId);
      toast.success('Image replaced');
      fetchUploads();
    } catch (err) {
      toast.dismiss(toastId);
      toast.error('Replace failed');
    }
  };

  const handleCategoryUpdate = async (id, newCategory) => {
    try {
      await updateDoc(doc(db, 'uploads', id), { category: newCategory });
      toast.success('Category updated!');
      fetchUploads();
    } catch {
      toast.error('Failed to update category');
    }
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm('Delete entire group?')) return;
    try {
      await deleteDoc(doc(db, 'uploads', id));
      toast.success('Deleted group');
      setUploadedItems(prev => prev.filter(item => item.id !== id));
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto p-6 pt-10 space-y-10">
      <Toaster position="top-right" />

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.removeItem('isLoggedIn');
          window.location.href = '/admin';
        }}
        className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded"
      >
        Logout
      </button>

      {/* Upload Section */}
      <section className="bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-xl font-semibold mb-4">Upload New Design</h2>

        {extractingZip ? (
          <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-3"></div>
            <span className="text-blue-600">Extracting ZIP file...</span>
          </div>
        ) : selectedFiles.length < 5 ? (
          <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer rounded-lg">
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.tif,.tiff,.bmp,.gif,.webp,.zip"
              onChange={handleFileChange}
              className="hidden"
            />
            <FiUploadCloud className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-blue-600 text-center">
              Click to upload images (max 5) or ZIP file (5-30 images)
              <br />
              <span className="text-xs text-gray-500">({selectedFiles.length}/5)</span>
            </span>
          </label>
        ) : null}

        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">
                {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                {selectedFiles.some(f => f.name.endsWith('.zip')) && ' (from ZIP)'}
              </h3>
              <button
                onClick={() => setSelectedFiles([])}
                className="text-xs text-red-500 hover:text-red-700 flex items-center"
              >
                <FiX className="mr-1" /> Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative border rounded overflow-hidden shadow-sm">
                  {file.name.endsWith('.zip') ? (
                    <div className="w-full h-28 flex flex-col items-center justify-center bg-gray-100">
                      <FiFile className="w-8 h-8 text-gray-400" />
                      <span className="text-xs text-gray-600 mt-2 px-2 truncate w-full text-center">
                        {file.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        className="w-full h-28 object-cover"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-white text-red-500 font-bold rounded-full text-sm px-2 shadow hover:bg-red-100"
                      >
                        ×
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Select Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={selectedFiles.length === 0 || !selectedCategory || uploading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              selectedFiles.length === 0 || !selectedCategory || uploading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {uploading
              ? `Uploading... (${selectedFiles.length})`
              : `Upload ${selectedFiles.length} Image(s)`}
          </button>
        </div>
      </section>

      {/* Uploaded Groups */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Uploaded Items</h2>

        {uploadedItems.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-lg border border-dashed">
            <p className="text-gray-500">No items uploaded yet</p>
          </div>
        ) : (
          uploadedItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow border">
              <div className="mb-3 flex justify-between items-center">
                <h3 className="font-medium">
                  {item.category} - {item.imageUrls.length} image(s)
                </h3>
                <span className="text-xs text-gray-500">
                  {item.createdAt?.toDate()?.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {item.imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`uploaded-${index}`}
                      className="w-full h-28 object-cover rounded border"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.tif,.tiff,.bmp,.gif,.webp"
                          className="hidden"
                          ref={(el) => (fileInputRefs.current[`${item.id}-${index}`] = el)}
                          onChange={(e) => handleImageReplace(e, item.id, index)}
                        />
                        <button
                          className="p-2 rounded-full bg-white hover:bg-yellow-100 text-yellow-600 shadow"
                          title="Replace"
                          onClick={() => fileInputRefs.current[`${item.id}-${index}`].click()}
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          className="p-2 rounded-full bg-white hover:bg-red-100 text-red-600 shadow"
                          title="Delete"
                          onClick={() => handleImageDelete(item.id, index)}
                        >
                          <FiTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center border-t pt-3">
                <div className="text-sm text-gray-700 flex items-center gap-2">
                  <span className="font-medium">Category:</span>
                  <select
                    value={item.category}
                    onChange={(e) => handleCategoryUpdate(item.id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => handleDeleteGroup(item.id)}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                >
                  <FiTrash size={16} />
                  Delete Group
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default FileUploadAndSelect;