// src/pages/Loans.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";

function Loans() {
  const navigate = useNavigate();

  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErrors = {};

    if (!loanAmount) formErrors.loanAmount = "Loan amount is required";
    if (!loanPurpose) formErrors.loanPurpose = "Loan purpose is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setShowModal(true); // Show "coming soon" modal
    }
  };

  return (
    <div className="bg-white min-h-screen dark:bg-gray-800 shadow-lg p-6 transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between mb-12 w-full">
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex-shrink-0">
          <FaArrowAltCircleLeft className="text-2xl text-orange-600 dark:text-white" />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-orange-600 dark:text-white text-center flex-1">
          Apply for a Loan
        </h2>

        <div className="w-6 sm:w-8" />
      </header>

      {/* Loan Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Loan Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Loan Amount
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className={`w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border ${
              errors.loanAmount
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            } focus:outline-none focus:ring-2`}
            placeholder="Enter loan amount"
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-sm mt-1">{errors.loanAmount}</p>
          )}
        </div>

        {/* Loan Purpose */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Loan Purpose
          </label>
          <input
            type="text"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            className={`w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border ${
              errors.loanPurpose
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
            } focus:outline-none focus:ring-2`}
            placeholder="Enter loan purpose"
          />
          {errors.loanPurpose && (
            <p className="text-red-500 text-sm mt-1">{errors.loanPurpose}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 rounded-lg text-white font-semibold transition-all duration-200"
          >
            Apply for Loan
          </button>
          <Link
            to="/dashboard"
            className="flex-1 p-3 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-white font-semibold text-center transition-all duration-200"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Coming Soon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative">
            <FiInfo className="text-orange-500 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              Loan Feature Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We’re working hard to bring you this feature.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow hover:opacity-90 transition"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Loans;
