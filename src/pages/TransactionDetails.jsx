// src/pages/TransactionDetails.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, XCircle, DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

export default function TransactionDetails({ transactions = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: txId } = useParams();
  const tx = location.state;
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    const sourceTx = tx || stored.find((t) => t.id === txId) || transactions.find((t) => t.id === txId);

    if (sourceTx) {
      const existing = stored.find((t) => t.id === sourceTx.id);
      if (existing) {
        setTransaction(existing);
      } else {
        const newTx = { ...sourceTx, status: sourceTx.status || "Pending" };
        setTransaction(newTx);
        localStorage.setItem("transactions", JSON.stringify([...stored, newTx]));
      }
    }
  }, [tx, txId, transactions]);

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl shadow-lg text-center max-w-sm">
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">No transaction details found.</p>
          <button
            onClick={() => navigate("/transactions")}
            className="bg-sky-600 text-white px-6 py-2 rounded-xl hover:bg-sky-700 transition font-semibold"
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
    status = "Pending",
    time,
    name,
    description,
    paymentMethod = "Bank transfer",
    reference = `REF-${id?.slice(-4).toUpperCase()}`,
  } = transaction;

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return { bg: "bg-sky-100 dark:bg-sky-900/30", text: "text-sky-700 dark:text-sky-300", icon: "text-sky-500" };
      case "Pending":
        return { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300", icon: "text-yellow-500" };
      case "Failed":
        return { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-300", icon: "text-red-500" };
      default:
        return { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-700 dark:text-gray-300", icon: "text-gray-500" };
    }
  };

  const getStatusIcon = (status) => {
    const size = "w-10 h-10";
    const colors = getStatusColor(status);
    switch (status) {
      case "Completed":
        return <CheckCircle2 className={`${size} ${colors.icon}`} />;
      case "Pending":
        return <Clock className={`${size} ${colors.icon}`} />;
      case "Failed":
        return <XCircle className={`${size} ${colors.icon}`} />;
      default:
        return <Clock className={`${size} ${colors.icon}`} />;
    }
  };

  const statusColors = getStatusColor(status);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white p-6">
      <header className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold">Transaction Details</h1>
        <div className="w-10" />
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Status Card */}
        <div className={`${statusColors.bg} ${statusColors.text} rounded-3xl p-8 text-center mb-8`}>
          <div className="flex justify-center mb-4">
            {getStatusIcon(status)}
          </div>
          <h2 className="text-3xl font-bold mb-2">Transfer {status}</h2>
          <p className="text-sm opacity-80">
            {status === "Completed" && "Your transfer has been successfully completed."}
            {status === "Pending" && "Your transfer is being processed. This may take a few moments."}
            {status === "Failed" && "Your transfer could not be completed. Please contact support."}
          </p>
        </div>

        {/* Amount Card */}
        <div className="bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 rounded-2xl p-8 mb-8 border border-sky-200 dark:border-sky-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-600 text-white">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount Transferred</p>
              <p className="text-3xl font-bold">{amount} {currency}</p>
            </div>
          </div>
        </div>

        {/* Transaction Info Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-widest">Transaction ID</p>
            <p className="text-lg font-mono break-all">{id}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-widest">Date & Time</p>
            <p className="text-lg">{time || new Date().toLocaleString()}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-widest">Payment Method</p>
            <p className="text-lg font-semibold">{paymentMethod}</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-widest">Reference</p>
            <p className="text-lg font-semibold">{reference}</p>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 tracking-widest">Transaction summary</p>
            <p className="text-xl font-semibold text-slate-900 dark:text-white">{name || "Private transfer"}</p>
            {description && <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-gray-900 dark:text-white rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition font-semibold"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/transactions")}
            className="flex-1 px-6 py-3 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition font-semibold"
          >
            All Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
