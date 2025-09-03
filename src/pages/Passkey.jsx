import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../components/AuthContext";

const generatedPasskey = "K9$mP!qL#v2@xJ&"; // 12-character passkey with caps and symbols

function Passkey() {
  const navigate = useNavigate();
  const { setIsPasskeyVerified } = useAuth();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passkey === generatedPasskey) {
      setError("");
      setIsPasskeyVerified(true);
      navigate("/dashboard");
    } else {
      setError("Invalid passkey");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-700 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 hover:shadow-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Enter Secret Passkey
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Enter 15-character passkey"
              maxLength="15"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}

export default Passkey;