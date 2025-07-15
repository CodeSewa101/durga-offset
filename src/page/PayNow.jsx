import React, { useState } from "react";
import bankLogo from "../assets/images/bob.png";
import QRCodeImg from "../assets/images/pay-now.jpeg";
const PayNowPage = () => {
  const [notification, setNotification] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotification("Copied to clipboard!");
      setTimeout(() => setNotification(""), 2000);
    });
  };

  const openUPIApp = () => {
    const upiApps = ["phonepe://pay", "paytm://pay", "gpay://pay", "upi://pay"];
    upiApps.forEach((app, index) => {
      setTimeout(() => {
        window.location.href = app;
      }, index * 100);
    });
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = "https://i.ibb.co/S4tm0tHk/pay-now.jpg";
    link.download = "sri-durga-offset-payment-qr.jpeg";
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 relative overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-600 max-[450px]:mt-12 ">
      {/* Horizontal Bounce Keyframes */}
      <style>
        {`
          @keyframes bounceX {
            0%, 100% { transform: translateX(0); }
            50%      { transform: translateX(20px); }
          }
        `}
      </style>

      {/* Notification */}
      {notification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg z-50 font-medium text-sm shadow-lg">
          {notification}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-[1000px] w-full relative">
        {/* Header */}
        <div
          className="text-white p-6 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent animate-pulse" />
          <img
            src={bankLogo}
            alt="Bank of Baroda"
            className="w-40 h-auto mb-3 mx-auto relative z-10"
          />
          <h1 className="text-2xl font-bold mb-2 relative z-10">
            Payment Portal
          </h1>
          <p className="text-base opacity-90 relative z-10">
            Secure & Fast Digital Payments
          </p>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Bank Details */}
            <div className="flex-1 bg-gray-50 rounded-xl p-5 border-l-4 border-orange-500">
              <h3 className="text-lg font-bold text-gray-700 mb-3">
                Bank Details
              </h3>
              <div className="space-y-3">
                {/* Account Name */}
                <div className="flex justify-between items-center py-1 border-b border-gray-200 px-3 rounded">
                  <span className="font-semibold text-gray-600 text-sm">
                    Account Name:
                  </span>
                  <span className="font-medium text-gray-800 text-sm">
                    Sri Durga Offset
                  </span>
                </div>
                {/* Account No */}
                <div className="flex justify-between items-center py-1 border-b border-gray-200 px-3 rounded">
                  <span className="font-semibold text-gray-600 text-sm">
                    Account No:
                  </span>
                  <div className="flex items-center">
                    <span className="bg-white px-3 py-1 rounded border font-mono text-sm">
                      85650200000060
                    </span>
                    <button
                      onClick={() => copyToClipboard("85650200000060")}
                      className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                {/* Bank Name */}
                <div className="flex justify-between items-center py-1 border-b border-gray-200 px-3 rounded">
                  <span className="font-semibold text-gray-600 text-sm">
                    Bank:
                  </span>
                  <span className="font-medium text-gray-800 text-sm">
                    Bank of Baroda, BEHRAMPUR
                  </span>
                </div>
                {/* IFSC */}
                <div className="flex justify-between items-center py-1 border-b border-gray-200 px-3 rounded">
                  <span className="font-semibold text-gray-600 text-sm">
                    IFSC Code:
                  </span>
                  <div className="flex items-center">
                    <span className="bg-white px-3 py-1 rounded border font-mono text-sm">
                      BARB0DBBERH
                    </span>
                    <button
                      onClick={() => copyToClipboard("BARB0DBBERH")}
                      className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                {/* UPI ID */}
                <div className="flex justify-between items-center py-1 px-3 rounded">
                  <span className="font-semibold text-gray-600 text-sm">
                    UPI ID:
                  </span>
                  <div className="flex items-center">
                    <span className="bg-white px-3 py-1 rounded border font-mono text-sm">
                      sridu94371@barodampay
                    </span>
                    <button
                      onClick={() => copyToClipboard("sridu94371@barodampay")}
                      className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex-shrink-0 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 w-full md:w-72">
              <h3 className="text-lg font-bold text-gray-700 mb-3">
                🔥 Quick Pay with QR
              </h3>
              <img
                src={QRCodeImg}
                alt="Payment QR Code"
                className="w-40 h-40 mx-auto mb-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                Scan with any UPI App like PhonePe, GooglePay, or PayTM to pay{" "}
                <strong>Sri Durga Offset</strong>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={openUPIApp}
              className="flex-1 py-3 px-6 text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-base"
              style={{
                background: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
              }}
            >
              📱 Open UPI App
            </button>
            <button
              onClick={downloadQR}
              className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-300 hover:-translate-y-1 text-base"
            >
              💾 Save QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayNowPage;
