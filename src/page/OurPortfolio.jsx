import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import offsetMachine from "../assets/images/offset-machine.jpg";
import offsetPrint1 from "../assets/images/Donation Receipt-1.png";
import offsetPrint2 from "../assets/images/Hotel Register-1.png";
import offsetPrint3 from "../assets/images/Leaflet Wall poster-1.png";
import offsetPrint4 from "../assets/images/Challan Book-1.png";

import flexMachine from "../assets/images/portfolio-flex-machine.png";
import flexprint1 from "../assets/images/flex-print-1.jpg";
import flexprint2 from "../assets/images/flex-print-2.jpg";
import flexprint3 from "../assets/images/flex-print-3.jpg";
import flexprint4 from "../assets/images/flex-print-4.jpg";

import digitalMachine from "../assets/images/portfolio-digital-machine.jpg";
import digitalPrint1 from "../assets/Digital Card/card-7.png";
import digitalPrint2 from "../assets/Digital Card/card-11.png";
import digitalPrint3 from "../assets/Digital Card/card-12.png";
import digitalPrint4 from "../assets/Digital Card/card-21.png";
const OurPortfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const machines = [
    {
      id: 1,
      name: "Offset Print Machine",
      image: offsetMachine,
      description:
        "Our state-of-the-art offset printing machine delivers exceptional quality for high-volume printing projects.",
      features: [
        "High-speed production capability",
        "Superior color accuracy",
        "Cost-effective for large runs",
        "Multiple paper size compatibility",
      ],
      proofWork: [offsetPrint1, offsetPrint2, offsetPrint3, offsetPrint4],
      reverse: false,
    },
    {
      id: 2,
      name: "Flex Machine",
      image: flexMachine,
      description:
        "Our advanced flex printing machine specializes in large format outdoor advertising and signage.",
      features: [
        "Large format capabilities",
        "Weather-resistant output",
        "UV-stable inks",
        "Quick turnaround time",
      ],
      proofWork: [flexprint1, flexprint2, flexprint3, flexprint4],
      reverse: true,
    },
    {
      id: 3,
      name: "Digital Print Machine",
      image: digitalMachine,
      description:
        "Our digital printing tech offers unmatched flexibility for short-run jobs and personalized printing.",
      features: [
        "Fast setup and production",
        "Variable data printing",
        "Cost-effective for short runs",
        "High-resolution output",
      ],
      proofWork: [digitalPrint1, digitalPrint2, digitalPrint3, digitalPrint4],
      reverse: false,
    },
  ];

  const MachineSection = ({ machine }) => (
    <div
      className={`flex flex-col md:flex-row items-center gap-10 mb-16 bg-white bg-opacity-95 rounded-3xl p-10 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        machine.reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1 max-w-lg">
        <img
          src={machine.image}
          alt={machine.name}
          className="w-full h-120 object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer max-[450px]:object-center "
          onClick={() => setSelectedImage(machine.image)}
        />
      </div>

      <div className="flex-1 px-5">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-5 relative">
          {machine.name}
          <div className="absolute bottom-0 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
        </h2>

        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {machine.description}
        </p>

        <div className="bg-blue-50 p-5 rounded-xl mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Key Features:
          </h3>
          <ul className="space-y-2">
            {machine.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <span className="text-blue-500 font-bold mr-3">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {machine.proofWork.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt="Proof Work"
                className="w-full h-full object-fill hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 pt-24">
      <div className="max-w-6xl mx-auto px-5 py-5">
        {/* Header */}
        <header className="text-center py-16 bg-white bg-opacity-95 rounded-3xl mb-12 shadow-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 drop-shadow-lg">
            Durga Offset
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Premium Printing Solutions & Quality Craftsmanship
          </p>
        </header>

        {/* Machine Sections */}
        {machines.map((machine) => (
          <MachineSection key={machine.id} machine={machine} />
        ))}

        {/* Animated Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                className="relative max-w-4xl max-h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
                <button
                  className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OurPortfolio;
