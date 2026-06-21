import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  Bell,
  Headphones,
  Home,
  LogOut,
  Moon,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import ChatBot from "./ChatBot";
import { useAuth } from "./AuthContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = () => {
    const raw = localStorage.getItem("notifications");
    if (!raw) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const valid = Array.isArray(parsed) ? parsed : [];
      setNotifications(valid);
      setUnreadCount(valid.filter((item) => !item.read).length);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    loadNotifications();

    const refresh = () => loadNotifications();
    window.addEventListener("notificationsUpdated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("notificationsUpdated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const openNotifications = () => {
    setShowNotifModal(true);

    const updated = notifications.map((item) => ({ ...item, read: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-sky-100 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-sky-600 text-white shadow-sm">
              <Home className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                Pacific Horizon Bank
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowChatbot(true)}
              className=" items-center gap-2 rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-sky-900 dark:bg-slate-900 dark:text-sky-200 dark:hover:bg-slate-800 sm:flex"
            >
              <Headphones className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              type="button"
              onClick={openNotifications}
              className="relative flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-sky-300 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-300"
              aria-label="Open notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 ? (
                <span className="absolute right-1 top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-sky-600 px-1.5 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              ) : (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-sky-500" />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex h-10 items-center gap-2 rounded-md border-transparent bg-white px-2 text-slate-700 transition hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              aria-label="Open account profile"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-bold text-white">
                {currentUser?.initials || "PH"}
              </span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-900 text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-sky-600 dark:hover:bg-sky-500"
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>


      {showNotifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg border border-sky-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">You have {unreadCount} new alert{unreadCount === 1 ? "" : "s"}.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowNotifModal(false)}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                aria-label="Close notifications"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-4 ${item.read ? "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300" : "border-sky-200 bg-sky-50 text-slate-900 dark:border-sky-700 dark:bg-slate-950 dark:text-white"}`}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{item.message}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{item.time}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  No notifications yet. Your recent transactions will appear here.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ChatBot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
    </>
  );
}

export default Header;
