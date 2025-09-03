// src/components/TransactionHistory.jsx
import React from "react";
import { Receipt, ArrowDownCircle } from "lucide-react"; // icons

function TransactionHistory({ transactions = [] }) {
  // default cheque transactions
  const defaultTransactions = [
    {
      id: "cheque-1",
      name: "Cheque Deposit",
      amount: "+ EUR 60,000",
      time: "2025-09-01 17:25:23",
      color: "green",
      type: "cheque",
    },
    {
      id: "cheque-2",
      name: "Cheque Deposit",
      amount: "+ EUR 40,000",
      time: "2025-09-01 17:30:48",
      color: "green",
      type: "cheque",
    },
  ];

  // merge default with passed-in transactions
  const allTransactions = [...defaultTransactions, ...transactions];

  if (!allTransactions || allTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center mt-20 space-y-4">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full shadow-lg">
          <Receipt className="w-10 h-10 text-white" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          No transactions yet
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Your recent activity will appear here.
        </p>
      </div>
    );
  }

  // color mapping since Tailwind doesn’t allow dynamic class names
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
      {allTransactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition"
        >
          {/* Left side with icon + details */}
          <div className="flex items-center space-x-3">
            {tx.type === "cheque" ? (
              <div className="p-2 bg-green-100 rounded-full">
                <ArrowDownCircle className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <Receipt className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {tx.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {tx.time}
              </p>
            </div>
          </div>

          {/* Right side with amount */}
          <span
            className={`font-semibold ${
              colorMap[tx.color] || "text-gray-600"
            }`}
          >
            {tx.amount}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TransactionHistory;
