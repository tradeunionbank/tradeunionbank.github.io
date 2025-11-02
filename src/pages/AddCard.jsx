import { useState, useEffect } from "react";
import {
  FaPlusCircle,
  FaCreditCard,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaTrash,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AddCard() {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [cardType, setCardType] = useState("");
  const [showCvv, setShowCvv] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cvv: "",
    expiry: "",
  });
  const [cards, setCards] = useState([]);

  // Load saved cards
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("userCards") || "[]");
    setCards(saved);
  }, []);

  // Save cards persistently
  useEffect(() => {
    localStorage.setItem("userCards", JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = () => {
    const { cardName, cardNumber, cvv, expiry } = formData;
    if (!cardType || !cardName || !cardNumber || !cvv || !expiry) {
      alert("Please complete all fields.");
      return;
    }

    const newCard = {
      id: Date.now(),
      type: cardType,
      ...formData,
    };

    setCards([newCard, ...cards]);
    setShowModal(false);
    setCardType("");
    setFormData({ cardName: "", cardNumber: "", cvv: "", expiry: "" });
  };

  const handleDeleteCard = (id) => {
    const updated = cards.filter((c) => c.id !== id);
    setCards(updated);
    setShowDetails(null);
  };

  const getCardLogo = (type) => {
    switch (type.toLowerCase()) {
      case "credit card":
        return <FaCreditCard className="text-white text-3xl" />;
      case "debit card":
        return <FaCcVisa className="text-white text-3xl" />;
      case "mastercard":
        return <FaCcMastercard className="text-white text-3xl" />;
      case "american express":
        return <FaCcAmex className="text-white text-3xl" />;
      default:
        return <FaCreditCard className="text-white text-3xl" />;
    }
  };

  const cardBackground = (type) => {
    switch (type.toLowerCase()) {
      case "credit card":
        return "from-blue-500 to-blue-700";
      case "debit card":
        return "from-green-500 to-emerald-600";
      case "mastercard":
        return "from-orange-500 to-red-600";
      case "american express":
        return "from-cyan-500 to-teal-600";
      default:
        return "from-gray-500 to-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex flex-col items-center">
      {/* Add Card Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => setShowModal(true)}
        className="cursor-pointer text-center flex flex-col items-center justify-center mb-10"
      >
        <FaPlusCircle className="text-7xl sm:text-8xl text-blue-500 hover:text-blue-600 transition-all duration-200" />
        <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">
          Add a New Card
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Tap to link your preferred payment card
        </p>
      </motion.div>

      {/* Display Saved Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center w-full">
            No cards added yet.
          </p>
        ) : (
          cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.03 }}
              className={`bg-gradient-to-br ${cardBackground(
                card.type
              )} text-white p-5 rounded-2xl shadow-lg cursor-pointer`}
              onClick={() => setShowDetails(card)}
            >
              <div className="flex justify-between items-center mb-6">
                {getCardLogo(card.type)}
                <span className="text-sm font-medium uppercase tracking-wider">
                  {card.type}
                </span>
              </div>
              <div className="text-lg tracking-widest font-semibold mb-2">
                {card.cardNumber.replace(/\d(?=\d{4})/g, "•")}
              </div>
              <div className="flex justify-between text-sm">
                <span>{card.cardName}</span>
                <span>{card.expiry}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Card Modal */}
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
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <FaCreditCard className="text-blue-500" /> Add Card Details
              </h2>

              {/* Card Type */}
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                Select Card Type
              </label>
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 mb-4"
              >
                <option value="">-- Choose Card Type --</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Mastercard">Mastercard</option>
                <option value="American Express">American Express</option>
              </select>

              {/* Input Fields */}
              {cardType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 mb-4"
                >
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={(e) =>
                      setFormData({ ...formData, cardName: e.target.value })
                    }
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                    maxLength={16}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value })
                      }
                      maxLength={4}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="MM/YYYY"
                      value={formData.expiry}
                      onChange={(e) =>
                        setFormData({ ...formData, expiry: e.target.value })
                      }
                      maxLength={7}
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCard}
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                >
                  Add Card
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-xl"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                {getCardLogo(showDetails.type)} {showDetails.type} Details
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Cardholder:</strong> {showDetails.cardName}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Card Number:</strong> {showDetails.cardNumber}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <strong>CVV:</strong>{" "}
                {showCvv ? showDetails.cvv : "•••"}
                <button
                  onClick={() => setShowCvv(!showCvv)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {showCvv ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                <strong>Expiry:</strong> {showDetails.expiry}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteCard(showDetails.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={() => setShowDetails(null)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
