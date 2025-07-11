import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/images/sri-durga-logo.png";

const NavHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Portfolio", path: "/portfolio" },
    { name: "Services", path: null }, // No direct path for dropdown parent
    { name: "Contact Us", path: "/contact" },
    { name: "Pay Now", path: "/pay" },
  ];

  const dropdownItems = [
    { name: "Offset Print", path: "/offset" },
    { name: "Invitation", path: "/invitation" },
    { name: "Flex", path: "/flex" },
    { name: "Digital Print", path: "/digital" },
  ];

  const isActivePath = (path) => {
    if (!path) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isServicesActive = () => {
    return dropdownItems.some((item) => location.pathname === item.path);
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 py-2 w-[100%] fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="text-white font-bold text-xl px-3 py-2 rounded-lg">
                <img src={Logo} alt="" className="w-[150px]" />
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.name === "Services" ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer relative ${
                        isServicesActive()
                          ? "text-[#2D98EA]"
                          : "text-gray-700 hover:text-[#2D98EA]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                      {isServicesActive() && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2D98EA]"></span>
                      )}
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                                isActivePath(item.path)
                                  ? "bg-blue-50 text-[#2D98EA] border-r-2 border-[#2D98EA]"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-[#2D98EA]"
                              }`}
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                      isActivePath(link.path)
                        ? "text-[#2D98EA]"
                        : "text-gray-700 hover:text-[#2D98EA]"
                    }`}
                  >
                    {link.name}
                    {isActivePath(link.path) && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2D98EA]"></span>
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#2D98EA] p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.name === "Services" ? (
                    <div>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                          isServicesActive()
                            ? "text-[#2D98EA] bg-blue-50"
                            : "text-gray-700 hover:text-[#2D98EA] hover:bg-gray-50"
                        }`}
                      >
                        {link.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown Items */}
                      {isDropdownOpen && (
                        <div className="pl-4 mt-1 space-y-1">
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                isActivePath(item.path)
                                  ? "text-[#2D98EA] bg-blue-50"
                                  : "text-gray-600 hover:text-[#2D98EA] hover:bg-gray-50"
                              }`}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setIsDropdownOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                        isActivePath(link.path)
                          ? "text-[#2D98EA] bg-blue-50"
                          : "text-gray-700 hover:text-[#2D98EA] hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavHeader;
