import React, { useState } from "react";
import {
  Phone,
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = ({ title = "Send us a Message", className = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "email":
        return !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
          ? "Invalid email"
          : "";
      case "subject":
        return value.trim() === "" ? "Subject is required" : "";
      case "message":
        return value.trim() === "" ? "Message is required" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (["name", "email", "subject", "message"].includes(key)) {
        const error = validate(key, value);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch("https://formspree.io/f/your_form_id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div
      className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 ${className}`}
    >
      <ToastContainer position="top-center" autoClose={3000} />

      {isSuccess && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white rounded-2xl z-50 animate-fade-in">
          <CheckCircle className="w-16 h-16 text-green-400 mb-4 animate-pop-in" />
          <p className="text-xl font-semibold">Message sent!</p>
        </div>
      )}

      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        {title}
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="flex items-center gap-3">
              <User className="text-white" />
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-white/20 text-white placeholder-white/80 outline-none"
              />
            </label>
            {errors.name && (
              <span className="text-red-400 text-sm mt-1">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-3">
              <Mail className="text-white" />
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-white/20 text-white placeholder-white/80 outline-none"
              />
            </label>
            {errors.email && (
              <span className="text-red-400 text-sm mt-1">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-3">
              <Phone className="text-white" />
              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-white/20 text-white placeholder-white/80 outline-none"
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label className="flex items-center gap-3">
              <Send className="text-white" />
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-white/20 text-white placeholder-white/80 outline-none"
              />
            </label>
            {errors.subject && (
              <span className="text-red-400 text-sm mt-1">
                {errors.subject}
              </span>
            )}
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="flex items-start gap-3">
              <MessageSquare className="text-white mt-3" />
              <textarea
                name="message"
                placeholder="Your Message *"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 rounded bg-white/20 text-white placeholder-white/80 outline-none"
              />
            </label>
            {errors.message && (
              <span className="text-red-400 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            disabled={isSending}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold transition disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }

        @keyframes pop-in {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop-in {
          animation: pop-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
