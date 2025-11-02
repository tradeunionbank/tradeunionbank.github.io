// src/pages/TransactionDetails.jsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowAltCircleLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function TransactionDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const tx = location.state;
  const [transaction, setTransaction] = useState(null);

  // ✅ Always default new transactions to "Pending"
  useEffect(() => {
    if (tx) {
      const stored = JSON.parse(localStorage.getItem("transactions")) || [];
      const existing = stored.find((t) => t.id === tx.id);
      if (existing) {
        setTransaction(existing);
      } else {
        const newTx = { ...tx, status: "Pending" };
        setTransaction(newTx);
        localStorage.setItem("transactions", JSON.stringify([...stored, newTx]));
      }
    }
  }, [tx]);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg mb-4">No transaction details found.</p>
          <button
            onClick={() => navigate("/transactions")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  const {
    id,
    amount,
    currency,
    country,
    transferType,
    swift,
    iban,
    swiftDetails,
    ibanDetails,
    newBalance,
    status = "Pending",
    time,
  } = transaction;

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300";
      case "Failed":
        return "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="text-green-500 text-3xl" />;
      case "Pending":
        return <FaClock className="text-yellow-500 text-3xl" />;
      case "Failed":
        return <FaTimesCircle className="text-red-500 text-3xl" />;
      default:
        return <FaClock className="text-gray-500 text-3xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => navigate(-1)}>
          <FaArrowAltCircleLeft className="text-2xl text-gray-700 dark:text-white" />
        </button>
        <p className="font-semibold text-lg">Transaction Details</p>
        <div></div>
      </header>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-lg mx-auto transition-all hover:shadow-xl">
        <div className="flex flex-col items-center text-center mb-6">
          {getStatusIcon(status)}
          <h2 className="text-2xl font-bold mt-3">Transfer {status}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Transaction summary below
          </p>
        </div>

        <div
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${getStatusColor(
            status
          )}`}
        >
          {status}
        </div>

        <div className="space-y-3 border-t border-gray-300 dark:border-gray-700 pt-4">
          <p>
            <strong>Transaction ID:</strong> {id}
          </p>
          <p>
            <strong>Amount:</strong> {amount} {currency}
          </p>
          <p>
            <strong>Destination Country:</strong> {country}
          </p>
          <p>
            <strong>Transfer Type:</strong> {transferType}
          </p>

          {transferType === "SWIFT" && swiftDetails && (
            <>
              <p>
                <strong>SWIFT / Account Number:</strong> {swift}
              </p>
              <p>
                <strong>First Name:</strong> {swiftDetails.firstName}
              </p>
              {swiftDetails.middleName && (
                <p>
                  <strong>Middle Name:</strong> {swiftDetails.middleName}
                </p>
              )}
              <p>
                <strong>Last Name:</strong> {swiftDetails.lastName}
              </p>
              <p>
                <strong>Bank Name:</strong> {swiftDetails.bankName}
              </p>
            </>
          )}

          {transferType === "SEPA" && ibanDetails && (
            <>
              <p>
                <strong>IBAN:</strong> {iban}
              </p>
              <p>
                <strong>First Name:</strong> {ibanDetails.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {ibanDetails.lastName}
              </p>
              <p>
                <strong>Bank Name:</strong> {ibanDetails.bankName}
              </p>
            </>
          )}

          <p className="border-t border-gray-300 dark:border-gray-700 pt-3">
            <strong>New Balance:</strong>{" "}
            {newBalance ? newBalance.toFixed(2) : "—"} EUR
          </p>
          <p>
            <strong>Date & Time:</strong> {time || new Date().toLocaleString()}
          </p>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/transactions")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
