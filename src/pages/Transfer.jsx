import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const rates = {
  USD: 1.0870, // 1 EUR = 1.0870 USD (approximate rate as of Sep 02, 2025)
  EUR: 1,      // Base currency
  GBP: 1.2821, // 1 EUR = 1.2821 GBP (approximate rate)
};

const sepaCountries = [
  "Austria", "Belgium", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia",
  "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy",
  "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway", "Poland",
  "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
];

const getTransferType = (country) => {
  if (sepaCountries.includes(country)) return "SEPA";
  if (country) return "SWIFT";
  return "";
};

// Mock IBAN lookup (Belgium example)
const ibanLookup = {
  BE76063894559495: {
    firstName: "Jessica",
    lastName: "Castronovo",
    bankName: "BELFIUS BANK SA/NV",
  },
};

function Transfer({ balance, setBalance, transactions, setTransactions }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR"); // Default to EUR
  const [country, setCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [iban, setIban] = useState("");
  const [swift, setSwift] = useState("");
  const [ibanDetails, setIbanDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoadingIban, setIsLoadingIban] = useState(false);

  const transferType = getTransferType(country);

  const handleIbanChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "");
    setIban(value);
    setIsLoadingIban(true);
    setIbanDetails(null);

    setTimeout(() => {
      if (country === "Belgium" && ibanLookup[value]) {
        setIbanDetails(ibanLookup[value]);
      } else {
        setIbanDetails(null);
      }
      setIsLoadingIban(false);
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = "Enter a valid amount.";
    }
    if (!currency) newErrors.currency = "Currency is required.";
    if (!country) newErrors.country = "Destination country is required.";
    if (transferType === "SEPA" && !iban) {
      newErrors.iban = "IBAN is required for SEPA transfers.";
    }
    if (transferType === "SWIFT" && !swift) {
      newErrors.swift = "SWIFT Code is required for SWIFT transfers.";
    }
    const amountInEur = currency === "EUR" ? parseFloat(amount) : parseFloat(amount) / rates[currency];
    if (amount && amountInEur > balance) {
      newErrors.amount = "Insufficient balance.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    // Calculate the amount to deduct in EUR
    const amountInEur = currency === "EUR" ? parseFloat(amount) : parseFloat(amount) / rates[currency];
    console.log("Amount in EUR to deduct:", amountInEur); // Debug log

    // Deduct the amount from balance here
    setBalance((prev) => {
      const newBalance = prev - amountInEur;
      console.log("New balance after deduction:", newBalance); // Debug log
      return newBalance;
    });

    // Save transaction
    const newTx = {
      id: Date.now(),
      name: ibanDetails
        ? `${ibanDetails.firstName} ${ibanDetails.lastName}`
        : transferType === "SEPA"
        ? "SEPA Transfer"
        : "SWIFT Transfer",
      time: new Date().toLocaleString(),
      amount: `-${amount} ${currency}`,
      color: "red",
    };
    setTransactions((prev) => {
      if (prev.find((tx) => tx.id === newTx.id)) return prev;
      return [newTx, ...prev];
    });

    // Navigate to Successful page with the updated state
    navigate("/successful", {
      state: {
        amount,
        currency,
        country,
        transferType,
        iban,
        swift,
        ibanDetails,
        newBalance: balance - amountInEur, // Pass the new balance
      },
    });
  };

  const filteredCountries = [
    ...sepaCountries,
    "United States",
    "Canada",
    "Nigeria",
    "Japan",
    "India",
  ].filter((c) => c.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-white min-h-screen dark:text-white dark:bg-gray-900 shadow-lg p-6">
      <header className="flex items-center justify-between mb-10">
        <button onClick={() => navigate(-1)}>
          <FaArrowAltCircleLeft className="text-2xl text-gray-700 dark:text-white" />
        </button>
        <p className="font-semibold text-lg">Transfer to Bank</p>
        <p
          className="text-gray-700 dark:text-white cursor-pointer"
          onClick={() => navigate("/transactions")}
        >
          History
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block mb-2">Currency</label>
          <div className="flex gap-4">
            {["USD", "EUR", "GBP"].map((cur) => (
              <button
                type="button"
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`flex-1 p-3 rounded-lg font-semibold transition ${
                  currency === cur ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
          {errors.currency && <p className="text-red-500 text-sm mt-1">{errors.currency}</p>}
        </div>

        <div>
          <label className="block mb-2">Destination Country</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 mb-2"
            placeholder="Search country..."
          />
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          {searchTerm && (
            <ul className="border rounded-lg max-h-40 overflow-y-auto dark:bg-gray-800 dark:border-gray-600">
              {filteredCountries.map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setCountry(c);
                    setSearchTerm(c);
                  }}
                  className={`p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    country === c ? "bg-gray-200 dark:bg-gray-700" : ""
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>

        {transferType === "SEPA" && (
          <div>
            <label className="block mb-2">IBAN</label>
            <input
              type="text"
              value={iban}
              onChange={handleIbanChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              placeholder="Enter IBAN"
            />
            {errors.iban && <p className="text-red-500 text-sm mt-1">{errors.iban}</p>}
            {isLoadingIban && (
              <div className="mt-2 flex justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            {ibanDetails && !isLoadingIban && (
              <div className="mt-3 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700">
                <p><strong>First Name:</strong> {ibanDetails.firstName}</p>
                <p><strong>Last Name:</strong> {ibanDetails.lastName}</p>
                <p><strong>Bank Name:</strong> {ibanDetails.bankName}</p>
              </div>
            )}
          </div>
        )}
        {transferType === "SWIFT" && (
          <div>
            <label className="block mb-2">SWIFT Code</label>
            <input
              type="text"
              value={swift}
              onChange={(e) => setSwift(e.target.value)}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              placeholder="Enter SWIFT/BIC Code"
            />
            {errors.swift && <p className="text-red-500 text-sm mt-1">{errors.swift}</p>}
          </div>
        )}
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Send Transfer
        </button>
      </form>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Transfer</h2>
            <p><strong>Amount:</strong> {amount} {currency}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>Type:</strong> {transferType}</p>
            {iban && <p><strong>IBAN:</strong> {iban}</p>}
            {swift && <p><strong>SWIFT:</strong> {swift}</p>}
            {ibanDetails && (
              <>
                <p><strong>First Name:</strong> {ibanDetails.firstName}</p>
                <p><strong>Last Name:</strong> {ibanDetails.lastName}</p>
                <p><strong>Bank Name:</strong> {ibanDetails.bankName}</p>
              </>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;