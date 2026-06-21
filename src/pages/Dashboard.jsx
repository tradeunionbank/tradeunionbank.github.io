import BalanceCard from "../components/BalanceCard";
import QuickActions from "../components/QuickActions";
import TransactionHistory from "../components/TransactionHistory";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { AlertCircle, ChevronRight, CreditCard, Landmark } from "lucide-react";

const Dashboard = ({ balance, transactions = [] }) => {
  const latestTransaction = transactions[0] || null;
  const totalCredits = transactions
    .filter((tx) => tx.amount && tx.amount.startsWith("+"))
    .reduce((sum, tx) => sum + Number(tx.amount.replace(/[^0-9.-]/g, "")), 0);
  const totalDebits = transactions
    .filter((tx) => tx.amount && tx.amount.startsWith("-"))
    .reduce((sum, tx) => sum + Number(tx.amount.replace(/[^0-9.-]/g, "")), 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-white">
      <Header />
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.35fr_1.15fr]">
          <div className="space-y-6">
            <BalanceCard balance={balance} />

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Snapshot</p>
                  </div>
                  <Landmark className="h-6 w-6 text-sky-600" />
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-sky-50 p-4 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Recent credit</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">+ ${totalCredits.toLocaleString()}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Recent debit</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">- ${Math.abs(totalDebits).toLocaleString()}</p>
                  </div>
                  {latestTransaction && (
                    <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-950">
                      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Latest activity</p>
                      <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{latestTransaction.name}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{latestTransaction.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <aside className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Account status</p>
                  </div>
                  <Landmark className="h-6 w-6 text-sky-600" />
                </div>
                <div className="mt-5 space-y-4">
                  <div className="rounded-md bg-sky-50 p-4 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-700 dark:text-sky-300" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white"></p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Your account is active and ready for transactions.</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/cards"
                    className="flex items-center justify-between rounded-md border border-slate-200 p-4 transition hover:border-sky-300 hover:bg-sky-50 dark:border-slate-800 dark:hover:border-sky-700 dark:hover:bg-slate-900"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
                      <CreditCard className="h-5 w-5 text-sky-600" />
                      Card services
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>

          <QuickActions />
        </section>

        <section className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Recent activity</p>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Transactions</h2>
            </div>
            <Link to="/transactions" className="text-sm font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200">
              View all
            </Link>
          </div>
          <TransactionHistory transactions={transactions} limit={5} compact />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
