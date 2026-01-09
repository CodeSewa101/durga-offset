import React, { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Invitation = () => {
  const [invitationItems, setInvitationItems] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDesc, setSelectedDesc] = useState("");
  const galleryRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvitationImages = async () => {
      try {
        setLoading(true);
        const snapshot = await getDocs(collection(db, "uploads"));
        const items = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => item.category === "Invitation");

        setInvitationItems(items);
        setError(null);
      } catch (err) {
        console.error("Error fetching invitations:", err);
        setError("Failed to load designs. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvitationImages();
  }, []);

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const allImages = invitationItems.flatMap((item) =>
    item.imageUrls.map((url, idx) => ({
      id: `${item.id}-${idx}`,
      url,
      title: item.title || "Invitation Design",
      description: item.description || "Premium invitation design",
      category: item.category || "Invitation"
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
   

      {/* Gallery Section */}
      <div
        ref={galleryRef}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-cyan-50 to-blue-100 rounded-xl shadow-inner"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Our <span className="font-medium">Premium Collection</span>
          </h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handcrafted designs that make your event unforgettable
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
            <p className="text-gray-600 mb-6">We couldn't find any invitation designs at the moment</p>
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
                alt="Enlarged invitation design"
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
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Create Beautiful Invitations?</h3>
          <p className="text-xl text-white/90 mb-8">
            Let us design the perfect invitation for your special occasion
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

export default Invitation;