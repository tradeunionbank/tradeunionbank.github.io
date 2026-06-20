import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CalendarDays, PiggyBank, Plus, Target, TrendingUp } from "lucide-react";

const fallbackGoals = [
  {
    id: "starter-emergency",
    title: "Emergency Savings",
    targetAmount: 10000,
    currentAmount: 7000,
    currency: "USD",
    targetDate: "2026-12-31",
  },
  {
    id: "starter-travel",
    title: "Travel Reserve",
    targetAmount: 5000,
    currentAmount: 1800,
    currency: "USD",
    targetDate: "2026-09-30",
  },
];

function getGoals() {
  try {
    const saved = JSON.parse(localStorage.getItem("savingsGoals"));
    return Array.isArray(saved) && saved.length > 0 ? saved : fallbackGoals;
  } catch {
    return fallbackGoals;
  }
}

function SavingsPage() {
  const navigate = useNavigate();
  const goals = getGoals();
  const totalSaved = goals.reduce((sum, goal) => sum + Number(goal.currentAmount || 0), 0);
  const totalTarget = goals.reduce((sum, goal) => sum + Number(goal.targetAmount || 0), 0);
  const overallProgress = totalTarget > 0 ? Math.min((totalSaved / totalTarget) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6">
      <main className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-300 hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </button>
          <Link
            to="/savings/new"
            className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-bold text-white hover:bg-sky-700"
          >
            <Plus className="h-4 w-4" />
            New Goal
          </Link>
        </div>

        <section className="rounded-lg border border-sky-100 bg-sky-700 p-6 text-white shadow-sm dark:border-sky-900 dark:bg-slate-900 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-100">Pacific Horizon savings</p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Savings goals</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-sky-100">
                Track dedicated goals, planned reserves, and upcoming milestones from one secure place.
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              <p className="text-sm text-sky-100">Total saved</p>
              <p className="mt-1 text-3xl font-bold">${totalSaved.toLocaleString()}</p>
              <div className="mt-4 h-2 rounded-full bg-white/20">
                <div className="h-2 rounded-full bg-white" style={{ width: `${overallProgress}%` }} />
              </div>
              <p className="mt-2 text-xs text-sky-100">{overallProgress.toFixed(0)}% of ${totalTarget.toLocaleString()} target</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <PiggyBank className="h-6 w-6 text-sky-600" />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Open goals</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{goals.length}</p>
          </div>
          <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Target className="h-6 w-6 text-sky-600" />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Target total</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">${totalTarget.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <TrendingUp className="h-6 w-6 text-sky-600" />
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Overall progress</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{overallProgress.toFixed(0)}%</p>
          </div>
        </section>

        <section className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Goal list</p>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Current plans</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {goals.map((goal) => {
              const progress = Number(goal.targetAmount) > 0
                ? Math.min((Number(goal.currentAmount || 0) / Number(goal.targetAmount)) * 100, 100)
                : 0;

              return (
                <article key={goal.id} className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{goal.title}</h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <CalendarDays className="h-4 w-4" />
                        Target date: {goal.targetDate || "Not set"}
                      </p>
                    </div>
                    <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 dark:bg-slate-800 dark:text-sky-300">
                      {goal.currency || "USD"}
                    </span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-2 rounded-full bg-sky-600" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      ${Number(goal.currentAmount || 0).toLocaleString()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      of ${Number(goal.targetAmount || 0).toLocaleString()}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default SavingsPage;
