import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "../components/AuthContext";
import { getUser, isAccountRestricted } from "../data/users";
import RestrictedOverlay from "../components/RestrictedOverlay";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showRestrictionModal, setShowRestrictionModal] = useState(false);

  useEffect(() => {
    if (showRestrictionModal) {
      const timer = setTimeout(() => {
        setShowRestrictionModal(false);
        localStorage.removeItem("accountRestricted");
        window.dispatchEvent(new Event("accountRestrictedUpdated"));
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showRestrictionModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = getUser(username);

    // Check if account is restricted
    if (isAccountRestricted(username)) {
      setShowRestrictionModal(true);
      localStorage.setItem("accountRestricted", "true");
      window.dispatchEvent(new Event("accountRestrictedUpdated"));
      return;
    }

    if (user && user.password === password) {
      setError("");
      login(user);
      navigate("/passkey");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {showRestrictionModal && <RestrictedOverlay />}
      
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-between bg-sky-700 px-6 py-8 text-white sm:px-10 lg:px-14">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-white text-sky-700 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-100">Pacific Horizon Bank</p>
              <h1 className="text-2xl font-bold">Secure Online Banking</h1>
            </div>
          </div>

          <div className="my-12 max-w-xl lg:my-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-sky-100">Private banking access</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Manage your money with clarity and confidence.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-sky-100">
              View balances, send transfers, manage cards, and review recent activity from one protected dashboard.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-sky-50 sm:grid-cols-3">
            <div className="rounded-md bg-white/10 p-4">Passkey verification</div>
            <div className="rounded-md bg-white/10 p-4">Account monitoring</div>
            <div className="rounded-md bg-white/10 p-4">24/7 support</div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md rounded-lg border border-sky-100 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="mb-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">Welcome back</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Sign in to your account</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Use your Pacific Horizon Bank credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full rounded-md border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-md border border-slate-300 bg-white py-3 pl-11 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-md bg-sky-600 px-4 py-3 font-bold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              >
                Sign In
              </button>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <a href="#" className="font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200">
                  Forgot password?
                </a>
                <span className="text-slate-500 dark:text-slate-400">Support: support@pacifichorizonbank.com</span>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
