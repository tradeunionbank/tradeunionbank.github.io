import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaHandHoldingUsd, FaRegMoneyBillAlt, FaPlusCircle, FaPiggyBank, FaExclamationTriangle } from "react-icons/fa";
import { useState } from "react";

function QuickActions() {
  const [showModal, setShowModal] = useState(false);
  const [isLoadingSavings, setIsLoadingSavings] = useState(false);

  const handleSavingsClick = () => {
    setIsLoadingSavings(true);
    setTimeout(() => {
      setIsLoadingSavings(false);
      setShowModal(true);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 transition-colors duration-300">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Send Action */}
        <Link to="/transfer">
          <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full h-32">
            <FaArrowCircleRight className="w-8 h-8 mb-2" />
            <span className="font-semibold text-sm sm:text-base">Send</span>
          </button>
        </Link>

        {/* Request Action */}
        <Link to="/request">
          <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full h-32">
            <FaHandHoldingUsd className="w-8 h-8 mb-2" />
            <span className="font-semibold text-sm sm:text-base">Request</span>
          </button>
        </Link>

        {/* Loan Action */}
        <Link to="/loans">
          <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full h-32">
            <FaRegMoneyBillAlt className="w-8 h-8 mb-2" />
            <span className="font-semibold text-sm sm:text-base">Loan</span>
          </button>
        </Link>

        {/* Top Up Action */}
        <Link to="/top-up">
          <button className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full h-32">
            <FaPlusCircle className="w-8 h-8 mb-2" />
            <span className="font-semibold text-sm sm:text-base">Top Up</span>
          </button>
        </Link>
      </div>

      <div className="flex justify-center mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Savings Action */}
        <button
          onClick={handleSavingsClick}
          disabled={isLoadingSavings}
          className={`flex flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 rounded-xl text-white transition-all duration-200 transform hover:scale-105 shadow-lg w-full h-32 ${
            isLoadingSavings ? "cursor-not-allowed opacity-75" : ""
          }`}
        >
          {isLoadingSavings ? (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <FaPiggyBank className="w-8 h-8 mb-2" />
              <span className="font-semibold text-sm sm:text-base">Savings</span>
            </>
          )}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md transition-all duration-300 transform scale-100">
            <div className="flex items-center justify-center mb-4">
              <FaExclamationTriangle className="w-10 h-10 text-yellow-500" />
            </div>
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">Feature Coming Soon</h2>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
              The Savings feature is not available yet. Stay tuned for updates!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default QuickActions;