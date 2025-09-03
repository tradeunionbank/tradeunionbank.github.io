import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa"; // For Visa and Mastercard logos
import { useState } from "react"; // For dynamic card data

export default function Cards() {
  const navigate = useNavigate();

  // State for dynamic card data
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "**** **** **** 6259",
      expiry: "09/29",
      holder: "Choi Seung-Hyun",
      cvv: "***", // Hidden CVV for security
      balance: "€**,***.**",
      gradient: "from-blue-700 via-blue-600 to-blue-500", // Visa-like blue gradient
    },
    {
      id: 2,
      type: "Mastercard",
      number: "**** **** **** 8491",
      expiry: "09/29",
      holder: "Choi Seung-Hyun",
      cvv: "***",
      balance: "€**,***.**",
      gradient: "from-yellow-500 via-orange-500 to-red-600", // Mastercard-like gradient
    },
  ]);

  // Function to add a new card dynamically
  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      type: "Visa", // Default type; can be customized
      number: "**** **** **** " + Math.floor(1000 + Math.random() * 9000), // Random last 4 digits
      expiry: "12/30",
      holder: "Choi Seung-Hyun",
      cvv: "***",
      balance: "€0.00",
      gradient: "from-blue-700 via-blue-600 to-blue-500",
    };
    setCards([...cards, newCard]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 w-full">
        <button onClick={() => navigate(-1)} className="flex-shrink-0">
          <FaArrowAltCircleLeft className="text-2xl text-purple-600 dark:text-white" />
        </button>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-purple-600 dark:text-white flex-1 text-center">
          My Cards
        </h2>
        <div className="w-6 sm:w-8" />
      </header>

      {/* Card List */}
      <div className="space-y-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`relative bg-gradient-to-r ${card.gradient} rounded-2xl p-6 shadow-xl text-white h-52 flex flex-col justify-between overflow-hidden`}
          >
            {/* Holographic Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 animate-hologram"></div>

            {/* Chip (simulated) */}
            <div className="w-12 h-8 bg-yellow-200 rounded-sm mb-4"></div>

            {/* Top Row: Logo */}
            <div className="flex justify-between items-center">
              {card.type === "Visa" ? (
                <FaCcVisa className="w-10 h-10 text-white" />
              ) : (
                <FaCcMastercard className="w-10 h-10 text-white" />
              )}
              <span className="text-sm font-bold tracking-widest uppercase">{card.type}</span>
            </div>

            {/* Card Number + Balance */}
            <div className="mb-4">
              <p className="text-xl font-mono tracking-widest">{card.number}</p>
              <p className="mt-2 text-lg font-bold">{card.balance}</p>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end text-sm">
              <div>
                <p className="uppercase text-xs">Cardholder</p>
                <p className="font-semibold">{card.holder}</p>
              </div>
              <div className="text-right">
                <p className="uppercase text-xs">Expires</p>
                <p className="font-semibold">{card.expiry}</p>
              </div>
              <div className="text-right">
                <p className="uppercase text-xs">CVV</p>
                <p className="font-semibold">{card.cvv}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card Button */}
        <button
          onClick={addNewCard}
          className="w-full p-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white font-semibold transition"
        >
          + Add New Card
        </button>
      </div>
    </div>
  );
}