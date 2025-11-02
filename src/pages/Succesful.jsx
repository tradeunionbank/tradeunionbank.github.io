// src/pages/Successful.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function Successful() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-6">
        <p>No transfer details found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 rounded-lg bg-blue-500 text-white"
        >
          Go Home
        </button>
      </div>
    );
  }

  const {
    amount,
    currency,
    country,
    transferType,
    iban,
    swift,
    ibanDetails,
    newBalance,
  } = state;

  return (
    <div className="flex items-center justify-center">
      <div className="min-h-screen bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)}>
            <FaArrowAltCircleLeft className="text-2xl text-green-500" />
          </button>
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Transfer Successful
          </p>
          <div />
        </header>

        {/* Pulsating Success Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <CheckCircle className="text-green-500 w-20 h-20" />
          </motion.div>
        </div>

        {/* Transfer Summary */}
        <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-700">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            Transfer to {ibanDetails ? `${ibanDetails.firstName} ${ibanDetails.lastName}` : country}
          </h2>
          <p><strong>Amount:</strong> {amount} {currency}</p>
          <p><strong>Country:</strong> {country}</p>
          <p><strong>Type:</strong> {transferType}</p>
          <p><strong>IBAN:</strong> {iban}</p>
          <p><strong>SWIFT:</strong> {swift}</p>
          {ibanDetails && (
            <>
              <p><strong>Bank Name:</strong> {ibanDetails.bankName}</p>
            </>
          )}
          <p><strong>New Balance:</strong> €{newBalance.toFixed(2)}</p>

          <p className="mt-4 text-yellow-600 font-semibold">
            Status: Pending (1–3 business days)
          </p>
          <p className="mt-2 text-red-600">
            ⚠ You are meant to pay <strong>$680</strong> as the SEPA tax. Contact our customer support if you have any questions on how to resolve this taxed imposed fee @tradeunionbank.online@gmail.com.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center"
          >
            <FaHome className="w-5 h-5 text-gray-700 dark:text-white" />
          </button>
          <button
            onClick={() => navigate("/transactions")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          >
            View History
          </button>
        </div>
      </div>
    </div>
  );
}

export default Successful;