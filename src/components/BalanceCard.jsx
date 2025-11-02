import { useEffect, useState } from "react";

function BalanceCard() {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("balance");
    return saved ? parseFloat(saved) : 100000;
  });

  useEffect(() => {
    // Listen for changes made in other tabs/components
    const handleStorage = () => {
      const updated = parseFloat(localStorage.getItem("balance")) || 0;
      setBalance(updated);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-6 md:p-8 mb-6 text-white transition-all hover:shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium mb-2">
            Available Balance
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            ${balance.toLocaleString()}
          </h2>
        </div>
        <div className="text-right opacity-80">
          <svg
            className="w-12 h-12 md:w-16 md:h-16 text-blue-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
