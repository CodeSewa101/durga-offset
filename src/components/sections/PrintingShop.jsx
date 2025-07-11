import React, { useState, useEffect } from "react";

const PrintingShop = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Premium Invitation Cards",
      subtitle: "Wedding & Event Printing",
      description:
        "Beautiful custom invitation cards with premium paper quality and stunning designs for your special occasions.",
      buttons: ["VIEW DESIGNS"],
      printingType: "invitation-cards",
      images: [
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516627145497-ae4099d6d529?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=1000&auto=format&fit=crop",
      ],
    },
    {
      id: 2,
      title: "Offset Printing Services",
      subtitle: "High Quality Bulk Printing",
      description:
        "Professional offset printing for books, brochures, catalogs, and business materials with precise color matching.",
      buttons: ["OFFSET SERVICES"],
      printingType: "offset-printing",
      images: [
        "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581079289196-67865ea83118?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1693031630177-b897fb9d7154?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516627145497-ae4099d6d529?q=80&w=1000&auto=format&fit=crop",
      ],
    },
    {
      id: 3,
      title: "Flex Banner Printing",
      subtitle: "Large Format Solutions",
      description:
        "Eye-catching flex banners for advertising, events, and promotions with weather-resistant materials.",
      buttons: ["FLEX PRINTING"],
      printingType: "flex-banner",
      images: [
        "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516627145497-ae4099d6d529?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=1000&auto=format&fit=crop",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlideData = slides[currentSlide];

  // Image gallery component
  const ImageGallery = ({ images, slideIndex }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [imageCache, setImageCache] = useState(new Map());

    // Preload images silently in background
    useEffect(() => {
      images.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, index]));
          setImageCache((prev) => new Map([...prev, [index, src]]));
        };
        img.onerror = () => {
          const fallbackSrc = `https://via.placeholder.com/300x400/005F73/ffffff?text=Sample+${
            index + 1
          }`;
          setImageCache((prev) => new Map([...prev, [index, fallbackSrc]]));
          setLoadedImages((prev) => new Set([...prev, index]));
        };
        img.src = src;
      });
    }, [images]);

    // Start cycling images immediately
    useEffect(() => {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(imageInterval);
    }, [images.length]);

    const getImageSrc = (index) => {
      return (
        imageCache.get(index) ||
        `https://via.placeholder.com/300x400/005F73/ffffff?text=Sample+${
          index + 1
        }`
      );
    };

    const isImageLoaded = (index) => {
      return loadedImages.has(index);
    };

    return (
      <div className="relative w-full max-w-sm mx-auto lg:max-w-none lg:mx-0">
        <div className="animate-float">
          {/* Main Image Container */}
          <div className="relative w-full max-w-xs mx-auto sm:max-w-sm lg:w-80 h-72 sm:h-80 lg:h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl overflow-hidden border-4 border-white/10">
            {/* Primary Image */}
            <div className="relative h-full">
              <img
                src={getImageSrc(currentImageIndex)}
                alt={`Printing sample ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-all duration-1000 ease-out ${
                  isImageLoaded(currentImageIndex)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />

              {/* Elegant placeholder overlay that fades out */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 backdrop-blur-sm transition-opacity duration-1000 ${
                  isImageLoaded(currentImageIndex) ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/60 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-white/30 rounded-lg mb-2 mx-auto flex items-center justify-center">
                      <svg
                        className="w-6 h-6 sm:w-8 sm:h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    </div>
                    <div className="text-xs font-medium">
                      Sample {currentImageIndex + 1}
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay with printing info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                <div className="text-white p-3 sm:p-4 w-full">
                  <div className="text-sm font-medium mb-1">
                    Sample {currentImageIndex + 1}
                  </div>
                  <div className="text-xs opacity-75">
                    Premium Quality Print
                  </div>
                </div>
              </div>
            </div>

            {/* Image indicators */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating thumbnail images - Only show on larger screens */}
          <div className="hidden lg:block">
            <div className="absolute -top-6 -right-6 w-12 h-12 xl:w-16 xl:h-16 rounded-lg overflow-hidden shadow-lg animate-bounce bg-gradient-to-br from-teal-500 to-cyan-500">
              <img
                src={getImageSrc((currentImageIndex + 1) % images.length)}
                alt="Thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoaded((currentImageIndex + 1) % images.length)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </div>

            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 xl:w-20 xl:h-20 rounded-lg overflow-hidden shadow-lg animate-bounce bg-gradient-to-br from-cyan-500 to-blue-500"
              style={{ animationDelay: "0.5s" }}
            >
              <img
                src={getImageSrc((currentImageIndex + 2) % images.length)}
                alt="Thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoaded((currentImageIndex + 2) % images.length)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </div>

            <div
              className="absolute -top-4 -left-8 w-10 h-10 xl:w-12 xl:h-12 rounded-full overflow-hidden shadow-lg animate-pulse bg-gradient-to-br from-emerald-500 to-teal-500"
              style={{ animationDelay: "1s" }}
            >
              <img
                src={getImageSrc((currentImageIndex + 3) % images.length)}
                alt="Thumbnail"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isImageLoaded((currentImageIndex + 3) % images.length)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 text-yellow-400 animate-twinkle">
              <svg
                className="w-5 h-5 xl:w-6 xl:h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <div
              className="absolute -bottom-3 -right-3 text-pink-400 animate-twinkle"
              style={{ animationDelay: "1s" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            {/* Floating ink drops */}
            <div className="absolute -top-4 -left-4 animate-bounce">
              <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
            </div>
            <div
              className="absolute -top-2 -right-6 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
            </div>
            <div
              className="absolute -bottom-6 -left-2 animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
            </div>
            <div
              className="absolute -bottom-4 -right-4 animate-bounce"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 relative overflow-hidden">
      {/* Printing-themed background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mobile particles - fewer and smaller */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`mobile-${i}`}
            className="absolute animate-float block sm:hidden"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            {i % 4 === 0 && (
              <div className="w-1 h-1 bg-cyan-300/50 rounded-full"></div>
            )}
            {i % 4 === 1 && (
              <div className="w-1.5 h-1.5 bg-teal-300/50 rounded-full"></div>
            )}
            {i % 4 === 2 && (
              <div className="w-1 h-1 bg-yellow-300/50 rounded-full"></div>
            )}
            {i % 4 === 3 && (
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            )}
          </div>
        ))}

        {/* Desktop particles - more and larger */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`desktop-${i}`}
            className="absolute animate-float hidden sm:block"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            {i % 4 === 0 && (
              <div className="w-2 h-2 bg-cyan-300/40 rounded-full"></div>
            )}
            {i % 4 === 1 && (
              <div className="w-3 h-3 bg-teal-300/40 rounded-full"></div>
            )}
            {i % 4 === 2 && (
              <div className="w-2 h-2 bg-yellow-300/40 rounded-full"></div>
            )}
            {i % 4 === 3 && (
              <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 lg:p-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-0">
        <div className="w-full max-w-7xl mx-auto">
          {/* Mobile Layout (Stack vertically) */}
          <div className="flex flex-col lg:hidden items-center justify-center space-y-8 sm:space-y-12 py-16 sm:py-20 mt-8 sm:mt-12">
            <div className="w-full max-w-sm">
              <ImageGallery
                images={currentSlideData.images}
                slideIndex={currentSlide}
              />
            </div>

            <div className="text-center w-full">
              <div
                className="transition-all duration-1000 ease-in-out"
                key={`content-mobile-${currentSlide}`}
              >
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-cyan-300 font-semibold text-lg sm:text-xl mb-6">
                  {currentSlideData.subtitle}
                </h2>

                <p className="text-base sm:text-lg text-white/90 mb-8 font-light leading-relaxed px-4">
                  {currentSlideData.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                  {currentSlideData.buttons.map((buttonText, index) => (
                    <button
                      key={index}
                      className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {buttonText}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout (Side by side) */}
          <div className="hidden lg:flex items-center justify-between min-h-screen">
            <div className="flex-1 flex justify-center xl:justify-start">
              <ImageGallery
                images={currentSlideData.images}
                slideIndex={currentSlide}
              />
            </div>

            <div className="flex-1 text-center xl:text-left xl:ml-16">
              <div
                className="transition-all duration-1000 ease-in-out"
                key={`content-desktop-${currentSlide}`}
              >
                <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white mb-6 leading-tight">
                  {currentSlideData.title}
                </h1>
                <h2 className="text-cyan-300 font-semibold text-2xl xl:text-3xl 2xl:text-4xl mb-8">
                  {currentSlideData.subtitle}
                </h2>

                <p className="text-lg xl:text-xl text-white/90 mb-12 font-light leading-relaxed">
                  {currentSlideData.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
                  {currentSlideData.buttons.map((buttonText, index) => (
                    <button
                      key={index}
                      className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      {buttonText}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        /* Ensure proper responsive behavior */
        @media (max-width: 640px) {
          .animate-float {
            animation-duration: 4s;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintingShop;
