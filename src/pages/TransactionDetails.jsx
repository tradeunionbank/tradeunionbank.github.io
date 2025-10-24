// src/pages/TransactionDetails.jsx
import React, { useState } from "react";
import { ArrowLeftCircle, Bot, CheckCircle, Circle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot"; // Import the ChatBot component

function TransactionDetails({ transactions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = transactions.find((tx) => tx.id === id);

  // State to control chatbot visibility
  const [showChatbot, setShowChatbot] = useState(false);

  // For this example, hardcoding details as per the specific transaction, assuming id "transfer-1"
  // If more transactions, expand logic to pull dynamic data

  return (
    <div className="p-4 min-h-screen max-w-2xl mx-auto bg-white">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <ArrowLeftCircle
          className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-800"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold text-gray-600 dark:text-gray-800">
          Transaction Details
        </h1>
        <Bot
          className="w-6 h-6 cursor-pointer text-gray-600 dark:text-gray-800"
          onClick={() => setShowChatbot(true)} // Toggle chatbot visibility
        />
      </header>

      {/* Transaction Summary */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Transfer to JESSICA CASTRONOVO
        </h2>
        <p className="text-xl font-bold text-red-600 mt-2">
          -20,000 EUR
        </p>
        <p className="text-green-600 font-medium mt-1">Successful</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[320px] sm:min-w-0">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center min-w-[90px] flex-shrink-0">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <p className="text-xs sm:text-sm mt-2">Payment Sent</p>
          </div>

          {/* Connector */}
          <div className="flex-1 h-1 bg-green-600 mx-2" />

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center min-w-[90px] flex-shrink-0">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <p className="text-xs sm:text-sm mt-2">Processing by Bank</p>
          </div>

          {/* Connector */}
          <div className="flex-1 h-1 bg-green-600 mx-2" />

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center min-w-[90px] flex-shrink-0">
            <Circle className="w-8 h-8 text-gray-400" />
            <p className="text-xs sm:text-sm mt-2">Received by Bank</p>
          </div>
        </div>

        <div className="flex justify-center p-3 rounded-lg bg-green-600 w-60 mt-12">
          <p className="text-white">Transaction in progress...</p>
        </div>
      </div>


      {/* Amount Details */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Amount</span>
          <span className="font-semibold text-gray-800 dark:text-white">20,000 EUR</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600 dark:text-gray-400">Fee</span>
          <span className="font-semibold text-gray-800 dark:text-white">250 EUR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Amount Paid</span>
          <span className="font-semibold text-gray-800 dark:text-white">20,250 EUR</span>
        </div>
      </div>

      {/* Recipient and Transaction Info */}
      {/* Recipient and Transaction Info */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
          <span className="text-gray-600 dark:text-gray-400">Recipient Full Name</span>
          <p className="font-semibold text-gray-800 dark:text-white">Jessica Castronovo</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
          <span className="text-gray-600 dark:text-gray-400">Recipient Bank</span>
          <p className="font-semibold text-gray-800 dark:text-white">BELFIUS BANK SA/NV</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
          <span className="text-gray-600 dark:text-gray-400">Transaction No</span>
          <p className="font-semibold text-gray-800 dark:text-white">2025090346533887</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
          <span className="text-gray-600 dark:text-gray-400">Transaction Date</span>
          <p className="font-semibold text-gray-800 dark:text-white">Sept 3rd, 2025 15:54:35</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-y-2">
          <span className="text-gray-600 dark:text-gray-400">Session ID</span>
          <p className="font-semibold text-gray-800 dark:text-white">
            400009435909412512403822555213
          </p>
        </div>
      </div>


      {/* ChatBot Popup */}
      {showChatbot && (
        <ChatBot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
      )}
    </div>
  );
}

export default TransactionDetails;