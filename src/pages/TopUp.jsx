// src/pages/TopUp.jsx
import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft, FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TopUp() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "Credit Card") {
      if (!cardNumber || !expiry || !cvv) {
        alert("Please fill in all card details.");
        return;
      }
      setShowModal(true);
    } else {
      alert("Top-up feature coming soon!");
    }
  };

  return (
    <div className="bg-white min-h-screen dark:bg-gray-800 shadow-lg p-6 transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 w-full">
        <button onClick={() => navigate(-1)} className="flex-shrink-0">
          <FaArrowAltCircleLeft className="text-2xl text-purple-600 dark:text-white" />
        </button>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-purple-600 dark:text-white text-center flex-1">
          Top Up
        </h2>
        <div className="w-6 sm:w-8" />
      </header>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Top-up Amount
          </label>
          <input
            type="number"
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Method
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Method</option>
            <option>Credit Card</option>
            <option>Bank Transfer</option>
            <option>Mobile Payment</option>
          </select>
        </div>

        {/* Conditional Fields */}
        {paymentMethod === "Credit Card" && (
          <div className="space-y-3 animate-fadeIn">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Card Number"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            <div className="flex gap-3">
              <input
                type="text"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              />
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="CVV"
                className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        )}

        {paymentMethod === "Bank Transfer" && (
          <p className="p-3 bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-gray-200 rounded-lg">
            Please contact TradeUnion Bank customer service to complete this top-up via bank transfer.
          </p>
        )}

        {paymentMethod === "Mobile Payment" && (
          <p className="p-3 bg-purple-100 dark:bg-gray-700 text-purple-700 dark:text-gray-200 rounded-lg">
            Please contact TradeUnion Bank customer service to complete this top-up via mobile payment.
          </p>
        )}

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 p-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white font-semibold transition-all duration-200"
          >
            Top Up
          </button>
          <Link
            to="/dashboard"
            className="flex-1 p-3 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-white font-semibold text-center transition-all duration-200"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 text-center animate-fadeIn">
            <FaCreditCard className="text-4xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Card Authentication Failed
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We couldn’t authenticate your card. Please check your details or try another payment method.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopUp;
