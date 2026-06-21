// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Transfer from "./pages/Transfer";
import RegionBlock from "./components/RegionBlock";
import Request from "./pages/Request";
import Loans from "./pages/Loans";
import TopUp from "./pages/TopUp";
import Dashboard from "./pages/Dashboard";
import SavingsPage from "./pages/SavingsPage";
import CreateSavingsGoal from "./pages/CreateSavingsGoal";
import EditSavingsGoal from "./pages/EditSavingsGoal";
import { SavingsProvider } from "./contexts/SavingsContext";
import Successful from "./pages/Succesful";
import TransactionsPage from "./pages/TransactionsPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import Cards from "./pages/Cards";
import Cheques from "./pages/Cheque";
import ChatBot from "./components/ChatBot";
import Login from "./pages/Login";
import Passkey from "./pages/Passkey";
import PageWrapper from "./components/PageWrapper";
import { AuthProvider, useAuth } from "./components/AuthContext";
import TransactionDetails from "./pages/TransactionDetails";
import TransactDetail from "./pages/TransactDetail";
import Withdraw from "./pages/Withdraw";
import AddCard from "./pages/AddCard";
import Profile from "./pages/Profile";
import RestrictedOverlay from "./components/RestrictedOverlay";
import { defaultTransactions } from "./data/defaultTransactions";

function AppContent() {
  const location = useLocation();
  const { isAuthenticated, isPasskeyVerified } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const [isRegionBlocked, setIsRegionBlocked] = useState(false);
  const [regionName, setRegionName] = useState(null);
  const [isRestricted, setIsRestricted] = useState(() => {
    return localStorage.getItem("accountRestricted") === "true";
  });

  const defaultBalance = 83589202.68;

  const [balance, setBalance] = useState(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedBalanceVersion = localStorage.getItem("balanceVersion");
    const parsedBalance = parseFloat(storedBalance);

    if (storedBalanceVersion !== "v3" || storedBalance === null || Number.isNaN(parsedBalance)) {
      localStorage.setItem("balance", defaultBalance.toString());
      localStorage.setItem("balanceVersion", "v3");
      return defaultBalance;
    }

    return parsedBalance;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    const storedTransactionsVersion = localStorage.getItem("transactionHistoryVersion");

    if (storedTransactionsVersion !== "v7") {
      localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
      localStorage.setItem("transactionHistoryVersion", "v7");
      return defaultTransactions;
    }

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn("Invalid transactions data, resetting...");
        localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
        return defaultTransactions;
      }
    }

    localStorage.setItem("transactions", JSON.stringify(defaultTransactions));
    return defaultTransactions;
  });

  // ✅ Persist balance
  useEffect(() => {
    if (!isNaN(balance)) {
      localStorage.setItem("balance", balance.toString());
    }
  }, [balance]);

  // ✅ Persist transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    setIsLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      timeoutRef.current = null;
    }, 300);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [location.pathname]);

  // --- Region / IP check (client-side) ---
  useEffect(() => {
    let mounted = true;
    const denyList = ["Austria", "AT"]; // unsupported regions (country name or code)

    // Best-effort IP geolocation using public endpoint
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        const country = data.country_name || data.country || data.region || null;
        setRegionName(country);
        if (country && denyList.includes(country)) {
          setIsRegionBlocked(true);
        }
      })
      .catch(() => {
        // ignore failures — default to allowed
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const onRestrictedUpdate = () => setIsRestricted(localStorage.getItem("accountRestricted") === "true");
    window.addEventListener("accountRestrictedUpdated", onRestrictedUpdate);
    window.addEventListener("storage", onRestrictedUpdate);

    return () => {
      window.removeEventListener("accountRestrictedUpdated", onRestrictedUpdate);
      window.removeEventListener("storage", onRestrictedUpdate);
    };
  }, []);

  // ✅ Auth-protected route
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!isPasskeyVerified) return <Navigate to="/passkey" replace />;
    return children;
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-transparent px-8 py-10  ring-1 ring-slate-900/5">
            <div className="h-14 w-14 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
            <p className="text-sm font-semibold text-slate-700"></p>
          </div>
        </div>
      )}

      {isRegionBlocked && <RegionBlock country={regionName} />}

      {isRestricted && <RestrictedOverlay />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/passkey" element={<Passkey />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard balance={balance} transactions={transactions} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transfer"
        element={
          <ProtectedRoute>
            <Transfer
              balance={balance}
              setBalance={setBalance}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/successful"
        element={
          <ProtectedRoute>
            <Successful setBalance={setBalance} setTransactions={setTransactions} />
          </ProtectedRoute>
        }
      />

      <Route path="/request" element={<ProtectedRoute><Request /></ProtectedRoute>} />
      <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
      <Route path="/top-up" element={<ProtectedRoute><TopUp /></ProtectedRoute>} />

      <Route path="/savings-page" element={<ProtectedRoute><SavingsPage /></ProtectedRoute>} />
      <Route path="/savings/new" element={<ProtectedRoute><CreateSavingsGoal /></ProtectedRoute>} />
      <Route path="/savings/edit/:id" element={<ProtectedRoute><EditSavingsGoal /></ProtectedRoute>} />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionsPage transactions={transactions} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <ProtectedRoute>
            <TransactionDetails transactions={transactions} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transact/:id"
        element={
          <ProtectedRoute>
            <TransactDetail transactions={transactions} />
          </ProtectedRoute>
        }
      />

      <Route path="/cards" element={<ProtectedRoute><Cards /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/cheques" element={<ProtectedRoute><Cheques /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
      <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
      <Route path="/add-card" element={<ProtectedRoute><AddCard /></ProtectedRoute>} />
    </Routes>
  </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SavingsProvider>
          <AuthProvider>
            <PageWrapper>
              <AppContent />
            </PageWrapper>
          </AuthProvider>
        </SavingsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
