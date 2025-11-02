import React, { useState } from "react";
import {
  FaCcVisa,
  FaCashRegister,
  FaUniversity,
  FaGooglePay,
  FaMoneyCheckAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const withdrawOptions = [
  { name: "Card", icon: <FaCcVisa className="text-blue-500 text-3xl" /> },
  { name: "CashApp", icon: <FaCashRegister className="text-green-500 text-3xl" /> },
  { name: "Zelle", icon: <FaUniversity className="text-purple-500 text-3xl" /> },
  { name: "Venmo", icon: <FaGooglePay className="text-blue-500 text-3xl" /> },
  { name: "Chime", icon: <FaMoneyCheckAlt className="text-emerald-500 text-3xl" /> },
];

export default function Withdraw() {
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const toggleExpand = (name) => setExpanded(expanded === name ? null : name);

  const openModal = (option) => {
    setSelectedOption(option);
    setShowModal(true);
  };

  const handleWithdraw = () => {
    const id = `withdraw-${Date.now()}`;
    const time = new Date().toLocaleString();
    const amount = `- ${formData.amount || "0"} USD`;

    const newTx = {
      id,
      name: selectedOption,
      amount,
      time,
      color: "red",
      type: "withdrawal",
      status: "Pending",
      details: {
        option: selectedOption,
        subOption: selectedSubOption,
        ...formData,
      },
    };

    const existing = JSON.parse(localStorage.getItem("transactions") || "[]");
    localStorage.setItem("transactions", JSON.stringify([newTx, ...existing]));

    setShowModal(false);
    setFormData({});
    navigate("/transactions");
  };

  const cardTypes = ["Visa", "Credit Card", "MasterCard", "MaestroCard", "Gift Card"];

  const handleSubOptionClick = (sub) => {
    setSelectedSubOption(sub);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        Withdraw Funds
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {withdrawOptions.map((item) => (
          <div
            key={item.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <button
              onClick={() => toggleExpand(item.name)}
              className="w-full flex justify-between items-center p-5"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="font-semibold text-lg text-gray-800 dark:text-white">
                  {item.name}
                </span>
              </div>

              <div className="opacity-0">
                <span className="text-gray-500 text-xl">›</span>
              </div>
            </button>

            <AnimatePresence>
              {expanded === item.name && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-5 border-t border-gray-200 dark:border-gray-700"
                >
                  {/* Card Section */}
                  {item.name === "Card" && (
                    <div className="space-y-3">
                      <div className="flex flex-col items-center space-y-2">
                        <FaPlusCircle className="text-4xl text-blue-500" />
                        <p className="text-gray-600 dark:text-gray-300 text-center">
                          Add a card to withdraw funds:
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {cardTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setSelectedOption("Card");
                              handleSubOptionClick(type);
                            }}
                            className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Options */}
                  {["CashApp", "Zelle", "Venmo", "Chime"].includes(item.name) && (
                    <div className="mt-3 text-center">
                      <button
                        onClick={() => openModal(item.name)}
                        className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition"
                      >
                        Enter {item.name} Details
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-md"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                {selectedOption} Withdrawal
              </h2>

              {/* Card Modal Inputs */}
              {selectedOption === "Card" && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, cardholder: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={19}
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength={4}
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Billing Address"
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, billingAddress: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
              )}

              {/* Other Withdraw Options */}
              {["CashApp", "Zelle", "Venmo", "Chime"].includes(selectedOption) && (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder={`${selectedOption} Tag / Email`}
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, handle: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition"
                >
                  Withdraw
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
