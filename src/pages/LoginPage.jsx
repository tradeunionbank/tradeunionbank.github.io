import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LoginPage = () => {
  const [username, setUsername] = useState(localStorage.getItem("rememberedUsername") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const correctUsername = "leeJungJae147";
    const correctPassword = "33waveaway%$_";

    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("isLoggedIn", "true");
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    ScrollReveal().reveal(".sr", {
      delay: 100,
      distance: "30px",
      duration: 1000,
      easing: "ease-out",
      origin: "bottom",
      interval: 300,
      reset: false,
    });
  }, []);

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <div className="w-full sm:max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg sr">
        <p className="text-center text-white mb-6 font-bold text-2xl">Login to your Account</p>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username or email address"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-6 h-14 text-black py-2 rounded-full w-full"
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border text-black px-6 py-2 h-14 rounded-full w-full pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-white text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-blue-600"
            />
            Remember Me
          </label>
          <button onClick={() => navigate("/forgot-password")} className="hover:underline">
            Forgot Password?
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogin}
            className="log text-white bg-blue-600 hover:bg-blue-700 transition px-6 py-3 font-bold rounded-full"
          >
            Log In
          </button>
        </div>

        {error && (
          <p className="text-red-500 font-bold text-lg mt-4 text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
