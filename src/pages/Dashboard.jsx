import { useState, useEffect } from "react";
import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import TransactionHistory from "../components/TransactionHistory";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Dashboard = ({ balance, transactions }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // 📌 Show only latest 5 transactions, with fallback if transactions is undefined
  const recentTransactions = (transactions || []).slice(0, 5);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      <div className="max-w-full sm:max-w-7xl mx-auto p-2 sm:p-4">
        <Header toggleTheme={toggleTheme} theme={theme} />

        {/* 💶 Balance */}
        <BalanceCard balance={balance} />

        {/* ⚡ Quick Actions */}
        <QuickActions />

        {/* 🧾 Recent Transactions (Card style) */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recent Transactions
            </h2>
            {(transactions || []).length > 5 && (
              <Link
                to="/transactions"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
              >
                View all
              </Link>
            )}
          </div>

          <TransactionHistory transactions={recentTransactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;