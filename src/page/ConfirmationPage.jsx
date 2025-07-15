import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState("1");
  
  // Debug the received state
  useEffect(() => {
    console.log("Location state:", location.state);
  }, [location.state]);

  // Safely get image data with defaults
  const image = location.state?.image || {
    url: null,
    title: "Untitled Design",
    description: "No description available"
  };

  // WhatsApp configuration
  const SHOP_OWNER_WHATSAPP = "8249814359"; 
  const COUNTRY_CODE = "91"; // India

  const sendWhatsAppMessage = (orderData) => {
    const orderTypes = [
      { key: "invitation", label: "Invitation Card" },
      { key: "pamphlets", label: "Pamphlets" },
      { key: "bill", label: "Bill/Receipt Book" },
      { key: "flex", label: "Flex/Banner" },
      { key: "other", label: "Other" }
    ].filter(type => orderData[type.key]).map(type => type.label);

    const messageLines = [
      "🌟 *NEW ORDER CONFIRMATION* 🌟",
      "",
      `👤 *Customer:* ${orderData.name}`,
      `📞 *WhatsApp:* ${orderData.whatsapp}`,
      `📧 *Email:* ${orderData.email || "Not provided"}`,
      "",
      "🛍️ *Order Details:*",
      `- Type: ${orderTypes.join(", ") || "Not specified"}`,
      `- Quantity: ${orderData.quantity}`,
      "",
      "🎨 *Design Info:*",
      `- Title: ${orderData.designTitle}`,
      orderData.designUrl 
        ? `- Reference: ${orderData.designUrl}`
        : "- Reference: No image provided"
    ];

    const encodedMessage = encodeURIComponent(messageLines.join("\n"));
    const whatsappUrl = `https://wa.me/${COUNTRY_CODE}${SHOP_OWNER_WHATSAPP}?text=${encodedMessage}`;
    
    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=800"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target;
      const orderData = {
        name: form.name.value.trim(),
        whatsapp: form.whatsapp.value.trim(),
        email: form.email.value.trim(),
        invitation: form.invitation.checked,
        pamphlets: form.pamphlets.checked,
        bill: form.bill.checked,
        flex: form.flex.checked,
        other: form.other.checked,
        quantity: Math.max(1, parseInt(quantity) || 1),
        designTitle: image.title,
        designUrl: image.url || null
      };

      if (!orderData.name || !orderData.whatsapp) {
        throw new Error("Name and WhatsApp are required");
      }

      sendWhatsAppMessage(orderData);
      
      toast.success("✅ Order confirmed! Opening WhatsApp...", {
        autoClose: 3000
      });

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`❌ ${error.message || "Order failed. Please try again."}`, {
        autoClose: 5000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setQuantity(value || "1");
  };

  const handleQuantityBlur = () => {
    if (!quantity || parseInt(quantity) < 1) {
      setQuantity("1");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Order Confirmation
          </h1>
          <p className="mt-3 text-xl text-gray-600">
            Complete your order details
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Section - Only shows if URL exists */}
            {image?.url ? (
              <div className="md:w-1/2 p-6 bg-gradient-to-b from-blue-50 to-gray-50 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-xs mx-auto">
                  <img
                    src={image.url}
                    alt="Selected Design"
                    className="w-full h-auto rounded-lg shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x400?text=Design+Image";
                    }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {image.title}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {image.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="md:w-1/2 p-6 bg-gradient-to-b from-blue-50 to-gray-50 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-xs mx-auto">
                  <img
                    src="https://placehold.co/300x400?text=No+Design+Selected"
                    alt="No Design Selected"
                    className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {image.title}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {image.description}
                  </p>
                </div>
              </div>
            )}

            {/* Form Section */}
            <div className={`${image?.url ? 'md:w-1/2' : 'w-full'} p-8`}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      minLength={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      pattern="[0-9]{10,}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="10-digit WhatsApp number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="block w-full pl-10 px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onBlur={handleQuantityBlur}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Minimum quantity: 1
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <fieldset className="border border-gray-200 rounded-lg p-4">
                    <legend className="text-sm font-medium text-gray-700 px-2">
                      Order Type <span className="text-red-500">*</span>
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "invitation", label: "Invitation Card" },
                        { id: "pamphlets", label: "Pamphlets" },
                        { id: "bill", label: "Bill/Receipt Book" },
                        { id: "flex", label: "Flex/Banner" },
                        { id: "other", label: "Other" }
                      ].map((item) => (
                        <div key={item.id} className="flex items-center">
                          <input
                            id={item.id}
                            name={item.id}
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={item.id} className="ml-3 block text-sm font-medium text-gray-700">
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    } transition-colors duration-300`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="-ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Confirm Order via WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="rounded-lg shadow-lg"
        progressClassName="bg-gradient-to-r from-blue-500 to-blue-600"
      />
    </div>
  );
};

export default ConfirmationPage;