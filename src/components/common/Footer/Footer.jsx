import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Logo from "../../../assets/images/sri-durga-logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={Logo}
            alt="Sri Durga Offset Logo"
            className="w-16 h-auto mb-1"
          />
          <h2 className="text-lg font-semibold">Sri Durga Offset</h2>
        </div>

        {/* Address */}
        <div className="text-sm leading-relaxed">
          <h3 className="font-semibold mb-1">Address</h3>
          <p>
            Spectrum Apartment, Near R.C Church Road,
            <br />
            Brahmapur, Odisha - 760001
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="font-semibold mb-1">Follow Us</h3>
          <div className="flex gap-3 text-gray-600">
            <a
              href="https://www.facebook.com/share/1CuEuiBgAN/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://www.instagram.com/sridurgaoffset?igsh=bTM3b3F5MTB6djNp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://wa.me/918249814359"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Sri Durga Offset. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
