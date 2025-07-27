import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DigitalPrint = () => {
  const [digitalItems, setDigitalItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const galleryRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDigitalImages = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "uploads"));
        const items = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => item.category === "Digital Print");

        setDigitalItems(items);
        setError(null);
      } catch (err) {
        console.error("Error fetching digital prints:", err);
        setError("Failed to load designs. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchDigitalImages();
  }, []);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const allImages = digitalItems.flatMap((item) =>
    item.imageUrls.map((url, idx) => ({
      id: `${item.id}-${idx}`,
      url,
      title: item.title || "Digital Print Design",
      description: item.description || "Premium digital print design",
      category: item.category || "Digital Print"
    }))
  );

  const visibleImages = showAll ? allImages : allImages.slice(0, 8);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#0a192f] via-[#0f4a7a] to-[#1a759f] py-36 px-6 sm:px-10 lg:px-20 text-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] animate-spin-slow">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(10,25,47,0.8)_0%,_transparent_70%)]"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,_rgba(26,117,159,0.5)_0%,_rgba(15,74,122,0.5)_25%,_rgba(10,25,47,0.5)_50%,_rgba(15,74,122,0.5)_75%,_rgba(26,117,159,0.5)_100%)] opacity-70"></div>
          </div>
          
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl animate-pulse-slow animation-delay-2000"></div>
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <span className="text-sm font-medium text-white/90 tracking-wider">
              PREMIUM PRINTING SOLUTIONS
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-teal-200">
              Exceptional Digital Prints
            </span>
            <br />
            <span className="text-white">That Make An Impact</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10"
          >
            Transform your ideas into stunning, high-quality prints with our professional digital printing services. Perfect for businesses, events, and personal projects.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(34, 211, 238, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToGallery}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-lg shadow-xl relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Our Designs</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 animate-bounce"
          >
            <svg 
              className="w-8 h-8 mx-auto text-white/60 cursor-pointer" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              onClick={scrollToGallery}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Gallery Section */}
      <div 
        ref={galleryRef}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-cyan-50 to-blue-100 rounded-xl shadow-inner"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Our <span className="font-medium">Professional Collection</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            High-quality digital prints with vibrant colors and sharp details
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-md mx-auto p-8">
            <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Loading Error</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : allImages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm max-w-md mx-auto p-8">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Designs Found</h3>
            <p className="text-gray-600 mb-6">We couldn't find any digital print designs at the moment</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {visibleImages.map((img) => (
                <motion.div
                  key={img.id}
                  variants={item}
                  className="relative rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover"
                      onClick={() => {
                        setSelectedImage(img.url);
                        setSelectedTitle(img.title);
                        setSelectedDesc(img.description);
                      }}
                    />
                  </div>
                  <div className="bg-white p-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/confirmation", {
                          state: {
                            image: {
                              title: img.title,
                              url: img.url,
                              description: img.description,
                              category: img.category
                            }
                          }
                        });
                      }}
                    >
                      Select Design
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {!showAll && allImages.length > 8 && (
              <div className="text-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAll(true)}
                  className="px-8 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all shadow-sm"
                >
                  View All Designs ({allImages.length - 8} more)
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="relative">
              <button
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <img
                src={selectedImage}
                className="w-full max-h-[70vh] object-contain"
                alt="Enlarged digital print design"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-medium text-gray-900 mb-2">{selectedTitle}</h3>
              <p className="text-gray-600 mb-6">{selectedDesc}</p>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                  onClick={() => setSelectedImage(null)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-lg hover:shadow-md transition-all"
                  onClick={() => {
                    navigate("/confirmation", {
                      state: {
                        image: {
                          title: selectedTitle,
                          url: selectedImage,
                          description: selectedDesc
                        }
                      }
                    });
                  }}
                >
                  Customize This Design
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#0a192f] to-[#1a759f] py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-4">Ready for Professional Digital Prints?</h3>
          <p className="text-xl text-white/90 mb-8">
            Let us bring your designs to life with vibrant, high-quality prints
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-lg text-lg relative overflow-hidden group"
            onClick={() => navigate("/confirmation")}
          >
            <span className="relative z-10">Start Your Order Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DigitalPrint;