// import React from "react";

// function PortfolioGrid() {
//   const portfolioItems = [
//     {
//       id: 1,
//       title: "Business Cards",
//       category: "Professional Design",
//       image:
//         "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-cyan-100 to-teal-100",
//       delay: "0.1s",
//     },
//     {
//       id: 2,
//       title: "Brochures",
//       category: "Marketing Materials",
//       image:
//         "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-teal-100 to-cyan-100",
//       delay: "0.2s",
//     },
//     {
//       id: 3,
//       title: "Banners",
//       category: "Large Format",
//       image:
//         "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-yellow-100 to-orange-100",
//       delay: "0.3s",
//     },
//     {
//       id: 4,
//       title: "Posters",
//       category: "Event Promotion",
//       image:
//         "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-purple-100 to-pink-100",
//       delay: "0.4s",
//     },
//     {
//       id: 5,
//       title: "Letterheads",
//       category: "Corporate Identity",
//       image:
//         "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-emerald-100 to-teal-100",
//       delay: "0.5s",
//     },
//     {
//       id: 6,
//       title: "Flex Prints",
//       category: "Outdoor Advertising",
//       image:
//         "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-red-100 to-pink-100",
//       delay: "0.6s",
//     },
//     {
//       id: 7,
//       title: "Catalogs",
//       category: "Product Showcase",
//       image:
//         "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-indigo-100 to-purple-100",
//       delay: "0.7s",
//     },
//     {
//       id: 8,
//       title: "Digital Prints",
//       category: "High Resolution",
//       image:
//         "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=400&auto=format&fit=crop",
//       gradient: "from-blue-100 to-cyan-100",
//       delay: "0.8s",
//     },
//   ];

//   return (
//     <div className="relative z-10 bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-20 lg:py-24">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12 lg:mb-16">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Our Work Gallery
//           </h2>
//           <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-600 mx-auto mb-6"></div>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Explore our diverse portfolio of premium printing services and
//             creative designs
//           </p>
//         </div>

//         {/* Image Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
//           {portfolioItems.map((item) => (
//             <div
//               key={item.id}
//               className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up"
//               style={{ animationDelay: item.delay }}
//             >
//               <div
//                 className={`aspect-square bg-gradient-to-br ${item.gradient} p-4 flex items-center justify-center`}
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                 <div className="p-4 text-white">
//                   <h3 className="font-bold text-sm">{item.title}</h3>
//                   <p className="text-xs opacity-90">{item.category}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Portfolio Button */}
//         <div
//           className="text-center animate-fade-in-up"
//           style={{ animationDelay: "1s" }}
//         >
//           <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-cyan-600 hover:to-teal-700 overflow-hidden">
//             <span className="relative z-10 flex items-center">
//               Visit Our Portfolio
//               <svg
//                 className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </span>
//             <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
//           </button>
//         </div>
//       </div>

//       {/* Custom CSS for animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-up {
//           opacity: 0;
//           animation: fadeInUp 0.8s ease-out forwards;
//         }

//         /* Pulse animation for featured items */
//         .animate-pulse-slow {
//           animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         @keyframes pulse {
//           0%,
//           100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }

//         /* Floating animation for special elements */
//         .animate-float-slow {
//           animation: float 4s ease-in-out infinite;
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-10px);
//           }
//         }

//         /* Responsive adjustments */
//         @media (max-width: 640px) {
//           .animate-fade-in-up {
//             animation-duration: 0.6s;
//           }
//         }

//         /* Hover effects for better interactivity */
//         .group:hover .animate-float-slow {
//           animation-play-state: paused;
//         }

//         /* Shimmer effect for loading states */
//         .animate-shimmer {
//           background: linear-gradient(
//             90deg,
//             #f0f0f0 25%,
//             #e0e0e0 50%,
//             #f0f0f0 75%
//           );
//           background-size: 200% 100%;
//           animation: shimmer 2s infinite;
//         }

//         @keyframes shimmer {
//           0% {
//             background-position: -200% 0;
//           }
//           100% {
//             background-position: 200% 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default PortfolioGrid;

import React from "react";

function PortfolioGrid() {
  const portfolioItems = [
    {
      id: 1,
      title: "Business Cards",
      category: "Professional Design",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop",
      size: "large", // spans 2 columns
      delay: "0.1s",
    },
    {
      id: 2,
      title: "Brochures",
      category: "Marketing Materials",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
      size: "medium",
      delay: "0.2s",
    },
    {
      id: 3,
      title: "Digital Printing",
      category: "High Resolution",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=400&auto=format&fit=crop",
      size: "medium",
      delay: "0.3s",
    },
    {
      id: 4,
      title: "Banners",
      category: "Large Format",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop",
      size: "small",
      delay: "0.4s",
    },
    {
      id: 5,
      title: "Posters",
      category: "Event Promotion",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
      size: "small",
      delay: "0.5s",
    },
    {
      id: 6,
      title: "Letterheads",
      category: "Corporate Identity",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
      size: "tall", // spans 2 rows
      delay: "0.6s",
    },
    {
      id: 7,
      title: "Flex Printing",
      category: "Outdoor Advertising",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop",
      size: "wide", // spans 2 columns
      delay: "0.7s",
    },
    {
      id: 8,
      title: "Catalogs",
      category: "Product Showcase",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=400&auto=format&fit=crop",
      size: "medium",
      delay: "0.8s",
    },
    {
      id: 9,
      title: "Screen Printing",
      category: "Custom Apparel",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=400&auto=format&fit=crop",
      size: "small",
      delay: "0.9s",
    },
    {
      id: 10,
      title: "Offset Printing",
      category: "Bulk Orders",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=400&auto=format&fit=crop",
      size: "medium",
      delay: "1s",
    },
    {
      id: 11,
      title: "Custom Designs",
      category: "Creative Solutions",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400&auto=format&fit=crop",
      size: "small",
      delay: "1.1s",
    },
  ];

  const getSizeClasses = (size) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "wide":
        return "col-span-2 row-span-1";
      case "tall":
        return "col-span-1 row-span-2";
      case "medium":
        return "col-span-1 row-span-1";
      case "small":
        return "col-span-1 row-span-1";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="relative z-10 bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Work Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse portfolio of premium printing services and
            creative designs
          </p>
        </div>

        {/* Dynamic Masonry Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-4 sm:gap-6 mb-12">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up ${getSizeClasses(
                item.size
              )}`}
              style={{ animationDelay: item.delay }}
            >
              <div className="relative w-full h-full min-h-[200px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.category}</p>

                    {/* View More Button */}
                    <button className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-sm font-medium rounded-full hover:from-cyan-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Top Right Badge for Featured Items */}
                {(item.size === "large" || item.size === "wide") && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
                    Featured
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Button */}
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-cyan-600 hover:to-teal-700 overflow-hidden">
            <span className="relative z-10 flex items-center">
              Visit Our Complete Portfolio
              <svg
                className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        /* Pulse animation for featured items */
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        /* Grid auto-sizing for dynamic layouts */
        .auto-rows-fr {
          grid-auto-rows: minmax(200px, auto);
        }

        /* Responsive grid adjustments */
        @media (max-width: 640px) {
          .animate-fade-in-up {
            animation-duration: 0.6s;
          }

          .auto-rows-fr {
            grid-auto-rows: minmax(150px, auto);
          }

          /* Simplify grid on mobile */
          .col-span-2 {
            grid-column: span 2 / span 2;
          }

          .row-span-2 {
            grid-row: span 1 / span 1;
          }
        }

        @media (max-width: 480px) {
          .col-span-2 {
            grid-column: span 2 / span 2;
          }

          .row-span-2 {
            grid-row: span 1 / span 1;
          }
        }

        /* Hover effects enhancement */
        .group:hover img {
          transform: scale(1.05);
          transition: transform 0.5s ease;
        }

        /* Smooth image loading */
        img {
          transition: opacity 0.3s ease;
        }

        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #06b6d4, #0891b2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #0891b2, #0e7490);
        }
      `}</style>
    </div>
  );
}

export default PortfolioGrid;
