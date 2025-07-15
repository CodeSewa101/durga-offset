import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import card1 from "../../assets/Digital Card/Card1.png";
import card2 from "../../assets/Digital Card/Card2.png";
import card3 from "../../assets/Digital Card/Card3.png";
import card4 from "../../assets/Digital Card/Card4.png";
import card5 from "../../assets/Digital Card/card-24.png";
import card6 from "../../assets/Digital Card/card-13.png";
import card7 from "../../assets/Digital Card/card-25.png";
import card8 from "../../assets/Digital Card/card-10.png";
import card9 from "../../assets/Digital Card/card-6.png";
import card10 from "../../assets/Digital Card/card-11.png";
import card11 from "../../assets/Digital Card/card-16.png";

function PortfolioGrid() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const portfolioItems = [
    {
      id: 1,
      title: "Business Cards",
      category: "Professional Design",
      image: card1,
      size: "large",
      delay: "0.1s",
    },
    {
      id: 2,
      title: "Brochures",
      category: "Marketing Materials",
      image: card2,
      size: "medium",
      delay: "0.2s",
    },
    {
      id: 3,
      title: "Digital Printing",
      category: "High Resolution",
      image: card3,
      size: "medium",
      delay: "0.3s",
    },
    {
      id: 4,
      title: "Banners",
      category: "Large Format",
      image: card4,
      size: "small",
      delay: "0.4s",
    },
    {
      id: 5,
      title: "Posters",
      category: "Event Promotion",
      image: card5,
      size: "small",
      delay: "0.5s",
    },
    {
      id: 6,
      title: "Letterheads",
      category: "Corporate Identity",
      image: card6,
      size: "tall",
      delay: "0.6s",
    },
    {
      id: 7,
      title: "Flex Printing",
      category: "Outdoor Advertising",
      image: card7,
      size: "wide",
      delay: "0.7s",
    },
    {
      id: 8,
      title: "Catalogs",
      category: "Product Showcase",
      image: card8,
      size: "medium",
      delay: "0.8s",
    },
    {
      id: 9,
      title: "Screen Printing",
      category: "Custom Apparel",
      image: card9,
      size: "small",
      delay: "0.9s",
    },
    {
      id: 10,
      title: "Offset Printing",
      category: "Bulk Orders",
      image: card10,
      size: "medium",
      delay: "1s",
    },
    {
      id: 11,
      title: "Custom Designs",
      category: "Creative Solutions",
      image: card11,
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
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div className="relative z-10 bg-gradient-to-br from-gray-50 to-gray-100 py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  onContextMenu={(e) => e.preventDefault()}
                  draggable="false"
                  className="w-full h-full object-cover select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {(item.size === "large" || item.size === "wide") && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
                    Featured
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          <button
            onClick={() => navigate("/portfolio")}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-cyan-600 hover:to-teal-700 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Visit Our Portfolio
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

      <style jsx>{`
        img {
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: auto;
          transition: opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default PortfolioGrid;
