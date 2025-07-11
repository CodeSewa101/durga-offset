import React from "react";

function AboutPage() {
  return (
    <div>
      {/* About Section */}
      <div className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Side - Text Content */}
            <div className="flex-1 order-1 lg:order-1">
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    About Us
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-teal-600 mx-auto lg:mx-0 mb-8"></div>
                </div>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    <span className="font-bold text-teal-600">
                      Sri Durga Offset – Berhampur
                    </span>{" "}
                    is your one-stop destination for all things design and
                    print. With a commitment to quality and creativity, we offer
                    a comprehensive range of printing solutions under one roof,
                    including{" "}
                    <span className="font-semibold text-cyan-600">
                      Digital Printing, Offset Printing, Screen Printing
                    </span>
                    , and{" "}
                    <span className="font-semibold text-cyan-600">
                      Flex Printing
                    </span>
                    .
                  </p>

                  <p className="text-base">
                    From eye-catching designs to high-precision print outputs,
                    we cater to businesses, institutions, and individuals with
                    tailored printing services that meet your branding and
                    promotional needs. Backed by advanced technology and a
                    dedicated team, Sri Durga Offset stands for reliability,
                    speed, and excellence in print.
                  </p>

                  <p className="text-base italic text-teal-600 font-medium">
                    Let us bring your ideas to life – beautifully and
                    professionally.
                  </p>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border-l-4 border-teal-500">
                    <h3 className="font-bold text-xl text-gray-900 mb-4">
                      Sri Durga Offset – The First Choice for Design and Print
                      in Berhampur
                    </h3>
                    <p className="text-base mb-4">
                      Looking for the{" "}
                      <span className="font-semibold text-teal-600">
                        best printing services in Berhampur
                      </span>
                      ? Welcome to{" "}
                      <span className="font-bold text-cyan-600">
                        Sri Durga Offset
                      </span>
                      , Berhampur's most trusted and complete printing unit
                      offering top-quality{" "}
                      <span className="font-semibold">
                        Digital Printing, Offset Printing, Screen Printing
                      </span>
                      , and <span className="font-semibold">Flex Printing</span>{" "}
                      services.
                    </p>
                    <p className="text-base mb-4">
                      With{" "}
                      <span className="font-bold text-teal-600">
                        17 years of experience
                      </span>{" "}
                      and cutting-edge technology, Sri Durga Offset has become
                      the{" "}
                      <span className="font-semibold text-cyan-600">
                        first choice for design and print in Berhampur
                      </span>
                      . Whether you need professional business cards, brochures,
                      banners, posters, or custom prints, we deliver fast,
                      reliable, and high-resolution results every time.
                    </p>
                    <p className="text-base mb-4">
                      Our skilled design team and high-performance machines
                      ensure that your printing needs are handled with precision
                      and care. From small-scale jobs to bulk orders, we offer
                      customized solutions at competitive prices.
                    </p>
                    <p className="text-base mb-4">
                      If you're searching for{" "}
                      <span className="font-semibold text-teal-600">
                        digital printing in Berhampur
                      </span>
                      ,{" "}
                      <span className="font-semibold text-teal-600">
                        offset printing in Berhampur
                      </span>
                      , or{" "}
                      <span className="font-semibold text-teal-600">
                        flex and screen printing services near you
                      </span>
                      , Sri Durga Offset is your go-to partner.
                    </p>
                    <p className="text-center lg:text-left font-bold text-lg text-gray-900 mt-6">
                      <span className="text-teal-600">
                        Sri Durga Offset Berhampur
                      </span>{" "}
                      – Where Design Meets Quality Print.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-1 order-2 lg:order-2">
              <div className="relative">
                <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
                  {/* Main Image */}
                  <div className="relative bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://www.sridurgaoffset.com/wp-content/uploads/2025/05/sri-durga-offset.jpg"
                      alt="Sri Durga Offset Printing Services"
                      className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        17 Years of Excellence
                      </h3>
                      <p className="text-sm opacity-90">
                        Trusted by thousands of customers in Berhampur
                      </p>
                    </div>
                  </div>

                  {/* Floating Elements - Made more mobile-friendly */}
                  <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 bg-gradient-to-br from-cyan-500 to-teal-600 text-white p-3 sm:p-4 rounded-lg shadow-lg animate-bounce">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold">17+</div>
                      <div className="text-xs">Years Experience</div>
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gradient-to-br from-teal-500 to-cyan-600 text-white p-3 sm:p-4 rounded-lg shadow-lg animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold">4</div>
                      <div className="text-xs">Print Services</div>
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-2 sm:p-3 rounded-full shadow-lg animate-pulse">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>

                  <div
                    className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-gradient-to-br from-emerald-400 to-teal-500 text-white p-2 sm:p-3 rounded-full shadow-lg animate-pulse"
                    style={{ animationDelay: "1s" }}
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
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
}

export default AboutPage;
