import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaBars,
  FaMoon,
  FaSun,
  FaBell,
  FaUserCircle,
  FaTimes,
  FaHome,
  FaExchangeAlt,
  FaPiggyBank,
  FaCreditCard,
  FaFileInvoiceDollar,
  FaSignOutAlt,
  FaHeadset,
  FaPaperPlane,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "../components/ChatBot"; // Import the standalone ChatBot component
import { useAuth } from "../components/AuthContext";

function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // State for modals
  const [showUserModal, setShowUserModal] = useState(false);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <FaBars className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <Link to="/dashboard" className="flex items-center ml-4">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white ml-2">
                Hi, Choi
              </h1>
            </Link>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              {theme === "dark" ? (
                <FaSun className="w-6 h-6 text-yellow-400" />
              ) : (
                <FaMoon className="w-6 h-6 text-gray-700" />
              )}
            </button>

            {/* Notification */}
            <button
              onClick={() => setShowNotifModal(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 relative"
            >
              <FaBell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>

            {/* User Avatar */}
            <button
              onClick={() => setShowUserModal(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">CH</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* --- User Modal --- */}
      {showUserModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
              PROFILE
            </h2>
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <div>
                <p><strong>T.O.P</strong></p>
                <p>IBAN Number: ************7265</p>
                <p>Account Type: Private</p>
              </div>
              <div>
                <p>Full Name: <span className="font-medium">Choi Seung Hyun</span></p>
                <p>Mobile: +1 (626) 553-2427</p>
                <p>Nickname: T.O.P</p>
                <p>Gender: Male</p>
                <p>Date of Birth: 1987-11-04</p>
                <p>Email: choiseunghyun******@***.com</p>
                <p>Address: 29-4, Yangchon-gil,Nam-gu, Gwangju.</p>
              </div>
            </div>
            <button
              onClick={() => setShowUserModal(false)}
              className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Notification Modal --- */}
      {showNotifModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
              Notification
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              🎉 Congratulations T.O.P, you've successfully added a new beneficiary to your account!
            </p>
            <button
              onClick={() => setShowNotifModal(false)}
              className="mt-4 w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Chatbot Modal --- */}
      {showChatbot && (
        <ChatBot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
      )}

      {/* --- Sidebar --- */}
      <AnimatePresence>
        {showSidebar && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowSidebar(false)}
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 w-72 h-full bg-white dark:bg-gray-900 shadow-lg z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Menu</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-500"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6 space-y-4 overflow-y-auto">
                <Link to="/" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <FaHome /> Dashboard
                </Link>
                <Link to="/transactions" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <FaExchangeAlt /> Transactions
                </Link>
                <Link to="/savings-page" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <FaPiggyBank /> Savings
                </Link>
                <Link to="/cards" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <FaCreditCard /> Cards
                </Link>
                <Link to="/cheques" className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <FaFileInvoiceDollar /> Cheques
                </Link>

                {/* --- Support Chatbot Button --- */}
                <button
                  onClick={() => {
                    setShowSidebar(false);
                    setShowChatbot(true);
                  }}
                  className="flex items-center gap-3 w-full text-left text-gray-700 dark:text-gray-300 hover:text-blue-600"
                >
                  <FaHeadset /> Support Chatbot
                </button>
              </nav>

              {/* Logout */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;