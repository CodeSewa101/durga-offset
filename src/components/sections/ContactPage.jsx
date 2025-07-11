import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "../sections/ContactForm";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 4}s`,
            }}
          >
            {i % 3 === 0 && (
              <div className="w-2 h-2 bg-cyan-300/30 rounded-full"></div>
            )}
            {i % 3 === 1 && (
              <div className="w-3 h-3 bg-teal-300/30 rounded-full"></div>
            )}
            {i % 3 === 2 && (
              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
              Get In <span className="text-cyan-300">Touch</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We'd love to hear from you. Contact us for all your printing needs
              and let's create something amazing together.
            </p>
          </div>

          {/* Contact Details Section */}
          <div className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Phone */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Phone
                  </h3>
                  <div className="space-y-2">
                    <p className="text-white/90 hover:text-cyan-300 transition-colors cursor-pointer">
                      <a href="tel:8249814359">8249814359</a>
                    </p>
                    <p className="text-white/90 hover:text-cyan-300 transition-colors cursor-pointer">
                      <a href="tel:9437176524">9437176524</a>
                    </p>
                    <p className="text-white/90 hover:text-cyan-300 transition-colors cursor-pointer">
                      <a href="tel:8984564222">8984564222</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Email
                  </h3>
                  <div className="space-y-2">
                    <p className="text-white/90 hover:text-cyan-300 transition-colors cursor-pointer">
                      <a href="mailto:sridurgaoffset1@gmail.com">
                        sridurgaoffset1@gmail.com
                      </a>
                    </p>
                    <p className="text-white/90 hover:text-cyan-300 transition-colors cursor-pointer">
                      <a href="mailto:surendra.bem@gmail.com">
                        surendra.bem@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Address
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Spectrum Apartment, Near R.C Church Road, Brahmapur, Odisha
                    760001
                  </p>
                </div>

                {/* Working Hours */}
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Working Hours
                  </h3>
                  <div className="text-white/90">
                    <p className="font-semibold">Monday to Saturday</p>
                    <p>10:00 AM to 9:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Find Us Here
              </h2>

              <div className="relative h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.123456789!2d84.123456789!3d19.123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzI0LjQiTiA4NMKwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  title="Sri Durga Offset Location"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm
            title="Send us a Message"
            whatsappNumber="918249814359"
            className="mb-16"
          />
        </div>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        input:focus,
        textarea:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .contact-info-item:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
