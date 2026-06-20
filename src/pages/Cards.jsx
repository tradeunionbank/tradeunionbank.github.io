import { ArrowLeft, Cpu, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { useState } from "react";

export default function Cards() {
  const navigate = useNavigate();
  const [showCVV, setShowCVV] = useState({});

  const [cards, setCards] = useState([
    {
      id: 1,
      type: "Visa",
      number: "4542 0024 9721 6259 ",
      expiry: "09/31",
      holder: "Ji Chang-Wook",
      cvv: "387",
      gradient: "from-sky-900 via-sky-700 to-sky-600",
      accentColor: "from-sky-500 to-sky-400",
    },
    {
      id: 2,
      type: "Mastercard",
      number: "5412 7773 9068 8091",
      expiry: "09/31",
      holder: "Ji Chang-Wook",
      cvv: "542",
      gradient: "from-gray-800 via-slate-700 to-slate-600",
      accentColor: "from-orange-500 to-red-500",
    },
  ]);

  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      type: "Visa",
      number: "4532 " + Math.random().toString().slice(2, 6) + " " + Math.random().toString().slice(2, 6) + " " + Math.floor(1000 + Math.random() * 9000),
      expiry: "12/31",
      holder: "Ji Chang-Wook",
      cvv: Math.floor(100 + Math.random() * 900).toString(),
      gradient: "from-sky-900 via-sky-700 to-sky-600",
      accentColor: "from-sky-500 to-sky-400",
    };
    setCards([...cards, newCard]);
  };

  const toggleCVV = (id) => {
    setShowCVV((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen p-6">
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="h-6 w-6 text-sky-700 dark:text-sky-300" />
        </button>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Cards</h2>
        <div className="w-6" />
      </header>

      <div className="space-y-7 max-w-2xl mx-auto">
        {cards.map((card) => (
          <div key={card.id} className="group">
            {/* Realistic Card */}
            <div
              className={`relative bg-gradient-to-br ${card.gradient} rounded-3xl p-8 shadow-2xl text-white h-72 flex flex-col justify-between overflow-hidden perspective transition-transform duration-300 hover:shadow-3xl hover:scale-[1.02]`}
            >
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 rounded-3xl" />

              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 250">
                  <rect x="20" y="20" width="80" height="60" fill="white" opacity="0.1" rx="4" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top section: Chip and brand */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 bg-gradient-to-br from-amber-300 to-amber-600 rounded-xl px-4 py-3 shadow-lg">
                    <Cpu className="w-6 h-6 text-amber-900" />
                    <span className="text-xs font-bold text-amber-900 tracking-widest"></span>
                  </div>
                  {card.type === "Visa" ? (
                    <FaCcVisa className="w-14 h-14 text-white" />
                  ) : (
                    <FaCcMastercard className="w-14 h-14 text-white" />
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <p className="text-xs font-semibold text-white/70 mb-2 tracking-widest">CARD NUMBER</p>
                  <p className="text-2xl font-mono font-bold tracking-wider">{card.number}</p>
                </div>

                {/* Bottom section: Holder, Expiry, CVV */}
                <div className="flex justify-between items-end gap-4 pt-4 border-t border-white/20">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white/70 mb-2 tracking-widest">CARDHOLDER</p>
                    <p className="text-sm font-semibold uppercase truncate">{card.holder}</p>
                  </div>

                  <div className="text-center flex-shrink-0">
                    <p className="text-xs font-semibold text-white/70 mb-2 tracking-widest">EXPIRES</p>
                    <p className="text-sm font-semibold font-mono">{card.expiry}</p>
                  </div>

                  <div className="flex items-end gap-2 flex-shrink-0">
                    <div>
                      <p className="text-xs font-semibold text-white/70 mb-2 tracking-widest">CVV</p>
                      <p className="text-sm font-semibold font-mono">
                        {showCVV[card.id] ? card.cvv : "•••"}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleCVV(card.id)}
                      className="mb-1 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      {showCVV[card.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Card Button */}
        <button
          onClick={addNewCard}
          className="w-full p-4 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-2xl transition-all shadow-lg hover:shadow-xl"
        >
          + Add New Card
        </button>
      </div>
    </div>
  );
}

