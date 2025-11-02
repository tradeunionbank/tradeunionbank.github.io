import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";

// Example target passphrase. (⚠️ Don’t hardcode in production)
const GENERATED_PASSPHRASE =
  "node";

export default function Passkey() {
  const navigate = useNavigate();
  const { setIsPasskeyVerified } = useAuth();

  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalize = (str) => str.trim().replace(/\s+/g, " ");

  const handleSubmit = (e) => {
    e.preventDefault();
    const attempt = normalize(passkey);
    if (attempt === GENERATED_PASSPHRASE) {
      setError("");
      setSuccess(true);
      setIsPasskeyVerified(true);
      setTimeout(() => navigate("/dashboard"), 600);
    } else {
      setSuccess(false);
      setError("Invalid passkey — double check and try again.");
    }
  };

  const clearAll = () => {
    setPasskey("");
    setError("");
    setSuccess(false);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-700 p-4">
      <div className="bg-white dark:bg-gray-900/30 p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600 text-white rounded-md">
            <FaLock />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Enter your secure passkey
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            ref={inputRef}
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            placeholder="Enter your full passkey here"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            autoComplete="off"
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && (
            <div className="flex items-center justify-center text-green-600 gap-2">
              <FaCheckCircle /> <span>Passkey accepted — redirecting...</span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 font-semibold"
            >
              Verify
            </button>
            <button
              type="button"
              onClick={clearAll}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:shadow-sm"
            >
              Clear
            </button>
          </div>

          <div className="text-xs text-gray-400 text-center">
            Tip: You can paste the entire passkey string at once.
          </div>
        </form>
      </div>
    </div>
  );
}
