// src/pages/Transfer.jsx
import { useState } from "react";
import { ArrowLeft, CheckCircle2, MapPin, CreditCard, User } from "lucide-react";
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

function Transfer({ balance, setBalance, transactions, setTransactions }) {
  const navigate = useNavigate();

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
        // --- Special restriction: block transfers to specific IBAN ---
        const blockedIban = "AT942040400043238831";
        if (transferType === "SEPA" && iban && iban.replace(/\s+/g, "") === blockedIban) {
            localStorage.setItem("accountRestricted", "true");
            localStorage.setItem(
              "restrictedReason",
              "We detected activity from an unknown IP address. As a precaution all transactions have been temporarily restricted."
            );
          // notify app to show overlay
          window.dispatchEvent(new Event("accountRestrictedUpdated"));
          setShowModal(false);
          setShowConfirm(false);
          return;
        }

        if ((transferType === "SEPA" && !ibanDetails) || (transferType === "SWIFT" && !swiftDetails)) {
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
    // prevent completing transfer if account is restricted
    if (localStorage.getItem("accountRestricted") === "true") {
      window.dispatchEvent(new Event("accountRestrictedUpdated"));
      setShowConfirm(false);
      return;
    }
    const amountInEur =
      currency === "EUR" ? parseFloat(amount) : parseFloat(amount) / rates[currency];
    const newBalance = balance - amountInEur;

    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    const details = ibanDetails || swiftDetails;
    const recipientName = details
      ? `${details.firstName} ${details.middleName ? details.middleName + " " : ""}${details.lastName}`.trim()
      : "Bank recipient";
    const recipientBank = details?.bankName || ""
    const txId = `tx-${Date.now()}`;
    const description = details
      ? `Transfer to ${recipientName} at ${recipientBank}`
      : `Bank transfer to ${country}`;

    const newTx = {
      id: txId,
      name: recipientName,
      description,
      time: new Date().toLocaleString(),
      amount: `-${amount} ${currency}`,
      color: "red",
      type: "debit",
      transferType,
      country,
      iban,
      swift,
      ibanDetails,
      swiftDetails,
      newBalance,
      status: "Completed",
    };

    const createNotification = (transaction) => {
      const raw = localStorage.getItem("notifications");
      const existing = raw ? JSON.parse(raw) : [];
      const notification = {
        id: `notif-${Date.now()}`,
        title: "Transfer completed",
        message: `You sent ${amount} ${currency} to ${recipientName}${country ? ` in ${country}` : ""}.`,
        time: new Date().toLocaleString(),
        read: false,
      };
      const updated = [notification, ...(Array.isArray(existing) ? existing : [])];
      localStorage.setItem("notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("notificationsUpdated"));
    };

    setTransactions((prev) => [newTx, ...(Array.isArray(prev) ? prev : [])]);
    createNotification(newTx);
    setShowConfirm(false);

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
          <ArrowLeft className="h-6 w-6 text-gray-700 dark:text-white" />
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
        <BalanceCard balance={balance} compact />
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
                  currency === cur ? "bg-sky-600 text-white" : "bg-gray-200 dark:bg-gray-700"
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
              : "bg-sky-600 text-white hover:bg-sky-700"
          }`}
        >
          {isSubmitting ? "Processing..." : "Send"}
        </button>
      </form>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 p-4 backdrop-blur-sm sm:flex sm:items-center sm:justify-center">
          <div className="w-full max-w-xl max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[28px] border border-white/10 bg-white/95 p-6 shadow-2xl ring-1 ring-slate-900/5 dark:bg-slate-950 dark:border-slate-700">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-50 text-sky-700 ring-1 ring-sky-100 dark:bg-sky-900/10 dark:text-sky-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">Review transfer</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Confirm transfer details</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Verify the recipient, destination and amount before completing the payment.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                  <User className="h-5 w-5 text-sky-600" />
                  <span className="font-semibold">Recipient</span>
                </div>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  {ibanDetails || swiftDetails
                    ? `${(ibanDetails || swiftDetails).firstName} ${(ibanDetails || swiftDetails).middleName || ""} ${(ibanDetails || swiftDetails).lastName}`.replace(/\s+/g, " ").trim()
                    : "Bank recipient"}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                  <MapPin className="h-5 w-5 text-sky-600" />
                  <span className="font-semibold">Destination</span>
                </div>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{country || "Not selected"}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                  <CreditCard className="h-5 w-5 text-sky-600" />
                  <span className="font-semibold">Bank</span>
                </div>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  {ibanDetails?.bankName || swiftDetails?.bankName || "Destination bank"}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                  <span className="rounded-full bg-sky-200 p-2 text-sky-700 dark:bg-sky-700/20 dark:text-sky-200">
                    <span className="text-sm font-semibold">{currency}</span>
                  </span>
                  <span className="font-semibold">Amount</span>
                </div>
                <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{amount} {currency}</p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Details</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <p><span className="font-semibold">Transfer type:</span> {transferType || "Manual"}</p>
                {iban && <p><span className="font-semibold">IBAN:</span> {iban}</p>}
                {swift && <p><span className="font-semibold">SWIFT:</span> {swift}</p>}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setShowConfirm(false)}
                className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="w-full rounded-3xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;
