import React from "react";
import { ArrowDownCircle, Receipt } from "lucide-react";
import { useNavigate } from "react-router-dom";

const defaultTransactions = [
  {
    id: "ambassador-1",
    name: "Ambassador Deal",
    description: "Brand partnership payout for global campaign.",
    amount: "+ USD 520,000",
    time: "2026-06-18 10:15:24",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "sponsor-1",
    name: "Sponsorship Revenue",
    description: "Exclusive sponsorship payment from premium partner.",
    amount: "+ USD 230,000",
    time: "2026-06-17 14:42:08",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "realestate-1",
    name: "Real Estate Distribution",
    description: "Quarterly return from private property holdings.",
    amount: "+ USD 480,000",
    time: "2026-06-16 18:05:12",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "launch-1",
    name: "Launch Sponsorship",
    description: "Premium launch event revenue from brand partners.",
    amount: "+ USD 145,000",
    time: "2026-06-15 11:24:40",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "studio-2",
    name: "Studio rental credit",
    description: "Refund for last week’s creative studio booking.",
    amount: "+ USD 12,000",
    time: "2026-06-15 08:03:14",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "art-collection-1",
    name: "Art Acquisition",
    description: "Investment in a modern gallery collection.",
    amount: "- USD 94,200",
    time: "2026-06-14 09:12:07",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "jet-1",
    name: "Private Jet Charter",
    description: "Roundtrip luxury travel for the Cannes event.",
    amount: "- USD 42,400",
    time: "2026-06-13 18:22:39",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "boutique-1",
    name: "Fashion Atelier",
    description: "High-end wardrobe purchase from an atelier.",
    amount: "- USD 18,250",
    time: "2026-06-12 12:08:05",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "dining-1",
    name: "Private Dining",
    description: "Executive dinner with international guests.",
    amount: "- USD 4,980",
    time: "2026-06-11 20:50:17",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "boutique-2",
    name: "Luxury Watch Purchase",
    description: "New timepiece from Geneva boutique.",
    amount: "- USD 29,400",
    time: "2026-06-11 10:40:11",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "philanthropy-1",
    name: "Philanthropy Fund",
    description: "Donation to global education initiatives.",
    amount: "- USD 105,000",
    time: "2026-06-10 14:30:56",
    color: "red",
    type: "debit",
    status: "Completed",
  },
  {
    id: "investment-1",
    name: "Private Equity Sale",
    description: "Partial exit from high-growth fund.",
    amount: "+ USD 320,000",
    time: "2026-06-10 09:22:07",
    color: "blue",
    type: "credit",
    status: "Completed",
  },
  {
    id: "studio-1",
    name: "Creative Studio Booking",
    description: "Premium production studio rental for a launch event.",
    amount: "- USD 27,500",
    time: "2026-06-09 16:11:22",
    color: "red",
    type: "debit",
    status: "Completed",
  },
];

function TransactionHistory({ transactions = [], limit, compact = false }) {
  const navigate = useNavigate();

  const displayTransactions = (transactions.length ? transactions : defaultTransactions)
    .slice()
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  const debitTransactions = displayTransactions.filter((tx) => tx.type === "debit");
  const creditTransactions = displayTransactions.filter((tx) => tx.type === "credit");

  const mixedTransactions = (() => {
    if (!debitTransactions.length || !creditTransactions.length) return displayTransactions;

    const mixed = [];
    const maxLength = Math.max(debitTransactions.length, creditTransactions.length);

    for (let index = 0; index < maxLength; index += 1) {
      if (index < debitTransactions.length) mixed.push(debitTransactions[index]);
      if (index < creditTransactions.length) mixed.push(creditTransactions[index]);
    }

    return mixed;
  })();

  const visibleTransactions = typeof limit === "number" ? mixedTransactions.slice(0, limit) : mixedTransactions;

  const colorMap = {
    green: "text-emerald-600 dark:text-emerald-400",
    red: "text-rose-600 dark:text-rose-400",
    blue: "text-sky-600 dark:text-sky-400",
  };

  const handleClick = (tx) => {
    navigate(`/transactions/${tx.id}`, { state: tx });
  };

  if (!visibleTransactions || visibleTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-sky-200 bg-sky-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="rounded-full bg-sky-600 p-4 text-white shadow-sm">
          <Receipt className="h-8 w-8" />
        </div>
        <p className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">No transactions yet</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your recent activity will appear here.</p>
      </div>
    );
  }

  return (
    <div className={compact ? "grid grid-cols-1 gap-3" : "mx-auto grid max-w-3xl grid-cols-1 gap-4"}>
      {visibleTransactions.map((tx) => (
        <button
          type="button"
          key={tx.id}
          onClick={() => handleClick(tx)}
          className="flex w-full items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-sky-300 hover:bg-sky-50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700 dark:hover:bg-slate-800"
        >
          <span className="flex min-w-0 items-center gap-3">
            {tx.type === "debit" ? (
              <span className="rounded-full bg-rose-50 p-2 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                <Receipt className="h-5 w-5" />
              </span>
            ) : (
              <span className="rounded-full bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300">
                <ArrowDownCircle className="h-5 w-5" />
              </span>
            )}
            <span className="min-w-0">
              <span className="block truncate font-semibold text-slate-900 dark:text-white">{tx.name}</span>
              <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{tx.description || tx.time}</span>
              <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">{tx.time}</span>
            </span>
          </span>

          <span className={`flex-shrink-0 text-sm font-bold ${colorMap[tx.color] || "text-slate-700 dark:text-slate-200"}`}>
            {tx.amount}
          </span>
        </button>
      ))}
    </div>
  );
}

export default TransactionHistory;

