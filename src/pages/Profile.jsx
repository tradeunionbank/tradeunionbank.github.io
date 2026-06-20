import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, ShieldCheck, Phone, Mail, MapPin, Clock3, Award } from "lucide-react";
import Header from "../components/Header";

export default function Profile() {
  const navigate = useNavigate();

  const userProfile = {
    name: "Ji Chang-Wook",
    role: "Private Banking Client",
    email: "lordismyhelp@gmail.com",
    phone: "+1 (626) 553-2427",
    address: "120 Pacific Ridge Drive, Los Angeles, CA",
    memberSince: "June 2022",
    accountNumber: "**** **** **** 7265",
    accountType: "Premier Checking",
    relationshipManager: "Mia Caldwell",
    branch: "Pacific Horizon Private Bank",
    rewardsStatus: "Platinum Elite",
    passportStatus: "Verified",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-900 dark:text-white">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">Profile</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {userProfile.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Private banking dashboard with secure account, contact, and relationship insights.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-sky-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:border-sky-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </button>
            <Link
              to="/transactions"
              className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              View Activity
            </Link>
          </div>
        </div>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-6 py-8 text-white sm:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">Account summary</p>
                    <h2 className="mt-3 text-3xl font-bold">{userProfile.accountType}</h2>
                    <p className="mt-1 text-sm text-slate-300">Member since {userProfile.memberSince}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/40 px-4 py-3 text-sm font-semibold text-slate-100 ring-1 ring-white/10">
                    {userProfile.rewardsStatus}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 p-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Account number</p>
                  <p className="mt-3 text-lg font-semibold">{userProfile.accountNumber}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Relationship manager</p>
                  <p className="mt-3 text-lg font-semibold">{userProfile.relationshipManager}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-5 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Branch</p>
                  <p className="mt-3 text-lg font-semibold">{userProfile.branch}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Email</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{userProfile.email}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Phone</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{userProfile.phone}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Address</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{userProfile.address}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-200">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Security status</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{userProfile.passportStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Premium benefits</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Personal concierge</h2>
                </div>
                <Award className="h-6 w-6 text-sky-600" />
              </div>
              <ul className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">Dedicated relationship manager and 24/7 private support.</li>
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">Exclusive travel and lifestyle banking services.</li>
                <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900">Priority approvals across cards, loans, and deposits.</li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-sky-700 p-6 text-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Available balance</p>
                  <p className="mt-3 text-3xl font-bold">$2,990,800.37</p>
                </div>
                <CreditCard className="h-10 w-10 text-white/90" />
              </div>
              <div className="mt-6 grid gap-4 text-sm">
                <div className="rounded-3xl bg-white/10 p-4 text-slate-100">
                  <p className="font-semibold">Card limit</p>
                  <p className="mt-2">$150,000 monthly</p>
                </div>
                <div className="rounded-3xl bg-white/10 p-4 text-slate-100">
                  <p className="font-semibold">Travel alerts</p>
                  <p className="mt-2">Active in 18 countries</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Account actions</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">Next steps</h2>
                </div>
                <Clock3 className="h-6 w-6 text-sky-600" />
              </div>
              <div className="mt-6 space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">Review your latest statements and update beneficiaries.</div>
                <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-900">Confirm travel plans and access privileges before your next trip.</div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
