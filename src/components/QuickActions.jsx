import { Link } from "react-router-dom";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Banknote,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  FileCheck2,
  HandCoins,
  Headphones,
  Landmark,
  PiggyBank,
  ReceiptText,
  WalletCards,
} from "lucide-react";

const actions = [
  { label: "Transfer", description: "Send money", to: "/transfer", icon: ArrowUpRight },
  { label: "Transactions", description: "Review activity", to: "/transactions", icon: ReceiptText },
  { label: "Savings", description: "Track goals", to: "/savings-page", icon: PiggyBank },
  { label: "Cards", description: "Manage cards", to: "/cards", icon: CreditCard },
  { label: "Support", description: "Get help", to: "/support", icon: Headphones },
  { label: "Account", description: "Private banking", to: "/dashboard", icon: Banknote },
];

function QuickActions() {
  return (
    <section className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            Banking services
          </p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
        </div>
        <span className="hidden rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-slate-900 dark:text-sky-300 sm:inline-flex">
          24/7 access
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map(({ label, description, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            className="group flex min-h-[12rem] flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-50 text-sky-700 group-hover:bg-sky-600 group-hover:text-white dark:bg-slate-800 dark:text-sky-300 dark:group-hover:bg-sky-500 dark:group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-sky-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base break-words">{label}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
