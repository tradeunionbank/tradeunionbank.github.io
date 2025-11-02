// src/components/TransactionHistory.jsx
import React, { useEffect, useState } from "react";
import { Receipt, ArrowDownCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TransactionHistory() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  // --- Default Cheque Transactions ---
  const defaultTransactions = [
    {
      id: "cheque-1",
      name: "Cheque Deposit",
      amount: "+ USD 60,000",
      time: "2025-10-30 17:25:23",
      color: "green",
      type: "cheque",
      status: "Completed",
    },
    {
      id: "cheque-2",
      name: "Cheque Deposit",
      amount: "+ USD 40,000",
      time: "2025-10-30 17:30:48",
      color: "green",
      type: "cheque",
      status: "Completed",
    },
  ];

  // --- Load transactions and sort by latest ---
  useEffect(() => {
    const saved = localStorage.getItem("transactions");

    let combined = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        combined = [
          ...defaultTransactions.filter(
            (d) => !parsed.some((tx) => tx.id === d.id)
          ),
          ...parsed,
        ];
      } catch {
        combined = defaultTransactions;
      }
    } else {
      combined = defaultTransactions;
    }

    // --- Sort by most recent date ---
    combined.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    setTransactions(combined);
    localStorage.setItem("transactions", JSON.stringify(combined));
  }, []);

  // --- Tailwind color map ---
  const colorMap = {
    green: "text-green-600",
    red: "text-red-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  const handleClick = (tx) => {
    navigate(`/transactions/${tx.id}`, { state: tx });
  };

  if (!transactions || transactions.length === 0) {
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

  // --- Render Transactions ---
  return (
    <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          onClick={() => handleClick(tx)}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >
          {/* Left Side: Icon + Details */}
          <div className="flex items-center space-x-3">
            {tx.type === "cheque" ? (
              <div className="p-2 bg-green-100 rounded-full">
                <ArrowDownCircle className="w-5 h-5 text-green-600" />
              </div>
            ) : (
              <div className="p-2 bg-red-100 rounded-full">
                <Receipt className="w-5 h-5 text-red-600" />
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

          {/* Right Side: Amount */}
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
