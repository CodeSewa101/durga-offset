import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const image = location.state?.image;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // WhatsApp configuration
  const SHOP_OWNER_WHATSAPP = "8658354878";

  const sendWhatsAppMessage = (orderData) => {
    // Format the order items
    const orderItems = Object.entries({
      invitation: orderData.invitation,
      pamphlets: orderData.pamphlets,
      bill: orderData.bill,
      flex: orderData.flex,
      other: orderData.other
    })
      .filter(([_, val]) => val)
      .map(([key]) => 
        key === "bill" ? "Bill/Receipt Book" : 
        key.charAt(0).toUpperCase() + key.slice(1)
      )
      .join(", ");

    // Create the message
    const message = `New Order Received!%0A%0A
      *Name:* ${orderData.name}%0A
      *WhatsApp:* ${orderData.whatsapp}%0A
      *Email:* ${orderData.email || 'Not provided'}%0A
      *Order For:* ${orderItems}%0A
      *Quantity:* ${orderData.quantity}%0A
      *Design Title:* ${orderData.designTitle}%0A
      *Design Image:* ${orderData.designUrl}`;

    // Open WhatsApp with the message
    window.open(`https://wa.me/${SHOP_OWNER_WHATSAPP}?text=${message}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare order data directly from form
      const form = e.target;
      const orderData = {
        name: form.name.value,
        whatsapp: form.whatsapp.value,
        email: form.email.value,
        invitation: form.invitation.checked,
        pamphlets: form.pamphlets.checked,
        bill: form.bill.checked,
        flex: form.flex.checked,
        other: form.other.checked,
        quantity: quantity,
        designTitle: image?.title || "Untitled",
        designUrl: image?.url || "https://placehold.co/300x400"
      };

      // Send WhatsApp message
      sendWhatsAppMessage(orderData);
      
      toast.success("Order confirmed! WhatsApp message sent to shop owner.");
    } catch (error) {
      console.error("Order Submission Error:", error);
      toast.error("Failed to submit order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity(prev => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity(prev => prev - 1);
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
            Please fill in your details to complete the order
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            {image && (
              <div className="md:w-1/2 p-6 bg-gradient-to-b from-blue-50 to-gray-50 flex flex-col items-center justify-center">
                <div className="relative w-full max-w-xs mx-auto">
                  <img
                    src={image.url}
                    alt="Confirmed Design"
                    className="w-full h-auto rounded-lg shadow-lg border-4 border-white transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/300x400?text=Design+Image";
                    }}
                  />
                </div>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {image.title || "Untitled Design"}
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {image.description || "No description available"}
                  </p>
                </div>
              </div>
            )}

            <div className={`${image ? 'md:w-1/2' : 'w-full'} p-8`}>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Your WhatsApp number"
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
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("decrement")}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <div className="px-4 py-2 bg-gray-100 text-center w-full">
                        {quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleQuantityChange("increment")}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <fieldset className="border border-gray-200 rounded-lg p-4">
                    <legend className="text-sm font-medium text-gray-700 px-2">
                      Order Type <span className="text-red-500">*</span>
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["invitation", "pamphlets", "bill", "flex", "other"].map((key) => (
                        <div key={key} className="flex items-center">
                          <input
                            id={key}
                            name={key}
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={key} className="ml-3 block text-sm font-medium text-gray-700">
                            {key === "bill" ? "Bill / Receipt Book" : 
                             key.charAt(0).toUpperCase() + key.slice(1)}
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
                        Confirm Order
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