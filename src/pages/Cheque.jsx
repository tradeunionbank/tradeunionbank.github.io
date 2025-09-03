import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Cheques() {
  const navigate = useNavigate();

  // Dummy cheque data
  const cheques = [
    { id: 1, number: "CHQ-1023", amount: "60,000", status: "Cleared" },
    { id: 2, number: "CHQ-1056", amount: "40,000", status: "Cleared" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen p-6">
      <header className="flex items-center justify-between mb-8 w-full">
        <button onClick={() => navigate(-1)} className="flex-shrink-0">
          <FaArrowAltCircleLeft className="text-2xl text-purple-600 dark:text-white" />
        </button>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-purple-600 dark:text-white flex-1 text-center">
          My Cheques
        </h2>
        <div className="w-6 sm:w-8" />
      </header>

      <div className="space-y-4">
        {cheques.map((cheque) => (
          <div
            key={cheque.id}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow"
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">{cheque.number}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">EUR {cheque.amount}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                cheque.status === "Cleared"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {cheque.status}
            </span>
          </div>
        ))}

        <button className="w-full p-3 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-lg text-white font-semibold transition">
          + Issue New Cheque
        </button>
      </div>
    </div>
  );
}
