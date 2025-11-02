// src/pages/Transfer.jsx
import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ibanLookup, swiftLookup } from "../data/lookupDatabase";
import BalanceCard from "../components/BalanceCard";

const rates = {
  USD: 1.0870,
  EUR: 1,
  GBP: 1.2821,
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

function Transfer() {
  const navigate = useNavigate();

  // --- Persistent balance state ---
  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem("balance");
    return storedBalance ? parseFloat(storedBalance) : 100000; // default EUR balance
  });

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [country, setCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [iban, setIban] = useState("");
  const [swift, setSwift] = useState("");
  const [ibanDetails, setIbanDetails] = useState(null);
  const [swiftDetails, setSwiftDetails] = useState(null);
  const [errors, setErrors] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoadingIban, setIsLoadingIban] = useState(false);
  const [isLoadingSwift, setIsLoadingSwift] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const transferType = getTransferType(country);

  // --- Save balance persistently whenever it changes ---
  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  // --- IBAN Lookup (SEPA) ---
  const handleIbanChange = (e) => {
    const value = e.target.value.replace(/\s+/g, "");
    setIban(value);
    setIbanDetails(null);
    setShowModal(false);

    if (value) {
      setIsLoadingIban(true);
      setTimeout(() => {
        setIbanDetails(ibanLookup[value] || null);
        setIsLoadingIban(false);
      }, 2500);
    }
  };

  // --- SWIFT Lookup (SWIFT) ---
  const handleSwiftChange = (e) => {
    const value = e.target.value.trim();
    setSwift(value);
    setSwiftDetails(null);
    setShowModal(false);

    if (value) {
      setIsLoadingSwift(true);
      setTimeout(() => {
        setSwiftDetails(swiftLookup[value] || null);
        setIsLoadingSwift(false);
      }, 2500);
    }
  };

  // --- Validate before confirm ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors = {};

    if (!amount || parseFloat(amount) <= 0) newErrors.amount = "Enter a valid amount.";
    if (!currency) newErrors.currency = "Currency is required.";
    if (!country) newErrors.country = "Destination country is required.";

    if (transferType === "SEPA" && !iban) newErrors.iban = "IBAN is required for SEPA transfers.";
    if (transferType === "SWIFT" && !swift) newErrors.swift = "SWIFT/Account number is required.";

    const amountInEur =
      currency === "EUR" ? parseFloat(amount) : parseFloat(amount) / rates[currency];
    if (amount && amountInEur > balance) newErrors.amount = "Insufficient balance.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setTimeout(() => {
        setIsSubmitting(false);
        if (
          (transferType === "SEPA" && !ibanDetails) ||
          (transferType === "SWIFT" && !swiftDetails)
        ) {
          setShowModal(true);
        } else {
          setShowConfirm(true);
        }
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  // --- Confirm Transfer ---
  const handleConfirm = () => {
    const amountInEur =
      currency === "EUR" ? parseFloat(amount) : parseFloat(amount) / rates[currency];
    const newBalance = balance - amountInEur;

    // ✅ Update balance and persist
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    // ✅ Create transaction
    const details = ibanDetails || swiftDetails;
    const txId = `tx-${Date.now()}`;

    const newTx = {
      id: txId,
      name: details
        ? `${details.firstName} ${details.middleName ? details.middleName + " " : ""}${details.lastName}`
        : "Bank Transfer",
      time: new Date().toLocaleString(),
      amount: `-${amount} ${currency}`,
      color: "red",
      type: "debit",
      transferType,
      iban,
      swift,
      ibanDetails,
      swiftDetails,
      newBalance,
      status: "Completed",
    };

    // ✅ Save transaction persistently
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([newTx, ...stored]));

    navigate("/successful", { state: newTx });
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

      <div>
        {/* ✅ Display current balance */}
        <BalanceCard balance={balance} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Amount */}
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

        {/* Currency */}
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
        </div>

        {/* Country */}
        <div>
          <label className="block mb-2">Destination Country</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600 mb-2"
            placeholder="Search country..."
          />
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

        {/* SEPA IBAN */}
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

        {/* SWIFT */}
        {transferType === "SWIFT" && (
          <div>
            <label className="block mb-2">SWIFT / Account Number</label>
            <input
              type="text"
              value={swift}
              onChange={handleSwiftChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
              placeholder="Enter SWIFT / Account Number"
            />
            {isLoadingSwift && (
              <div className="mt-2 flex justify-center">
                <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            {swiftDetails && !isLoadingSwift && (
              <div className="mt-3 p-3 border rounded-lg bg-gray-100 dark:bg-gray-700">
                <p><strong>First Name:</strong> {swiftDetails.firstName}</p>
                <p><strong>Middle Name:</strong> {swiftDetails.middleName}</p>
                <p><strong>Last Name:</strong> {swiftDetails.lastName}</p>
                <p><strong>Bank Name:</strong> {swiftDetails.bankName}</p>
              </div>
            )}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded-lg font-semibold transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {isSubmitting ? "Processing..." : "Send Transfer"}
        </button>
      </form>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Transfer</h2>
            <p><strong>Amount:</strong> {amount} {currency}</p>
            <p><strong>Country:</strong> {country}</p>
            <p><strong>Type:</strong> {transferType}</p>
            {iban && <p><strong>IBAN:</strong> {iban}</p>}
            {swift && <p><strong>SWIFT:</strong> {swift}</p>}
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
