// src/pages/TransactionsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import TransactionHistory from "../components/TransactionHistory";

const TransactionsPage = ({ transactions = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <ArrowLeftCircle className="w-7 h-7 text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Transfers
        </h1>
      </div>

      {/* Transactions */}
      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default TransactionsPage;
