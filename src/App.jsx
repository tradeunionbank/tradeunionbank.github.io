// app.jsx
import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Transfer from "./pages/Transfer";
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
import { LoadingSpinnerProvider, useLoadingSpinner } from "./components/LoadingSpinnerContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import TransactionDetails from "./pages/TransactionDetails";
import TransactDetail from "./pages/TransactDetail"

function AppContent() {
  const location = useLocation();
  const { setIsLoading } = useLoadingSpinner();
  const { isAuthenticated, isPasskeyVerified } = useAuth();
  const [balance, setBalance] = useState(() => {
    // Force one-time reset to clear old flag and set to 60000
    localStorage.removeItem('resetDone');
    const resetFlag = localStorage.getItem('resetDone');
    if (!resetFlag) {
      localStorage.removeItem('balance');
      localStorage.removeItem('transactions');
      localStorage.setItem('resetDone', 'true'); // Set flag to avoid future resets
    }
    const saved = localStorage.getItem('balance');
    // Safe parse: handle invalid data
    const parsedBalance = saved ? parseFloat(saved) : NaN;
    return !isNaN(parsedBalance) ? parsedBalance : 60000;
  });
  const [transactions, setTransactions] = useState(() => {
    // Force one-time reset to clear old flag and set to empty
    localStorage.removeItem('resetDone');
    const resetFlag = localStorage.getItem('resetDone');
    if (!resetFlag) {
      localStorage.removeItem('balance');
      localStorage.removeItem('transactions');
      localStorage.setItem('resetDone', 'true');
    }
    const saved = localStorage.getItem('transactions');
    // Safe parse: handle invalid JSON
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Invalid transactions data in localStorage, resetting to default');
        localStorage.removeItem('transactions'); // Clear invalid data
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    // Save balance after changes (only if valid)
    if (!isNaN(balance)) {
      localStorage.setItem('balance', balance.toString());
    }
  }, [balance]);

  useEffect(() => {
    // Save transactions after changes
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer); // Cleanup timer
  }, [location, setIsLoading]);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (!isPasskeyVerified) {
      return <Navigate to="/passkey" replace />;
    }
    return children;
  };

  return (
    <>
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
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loans"
          element={
            <ProtectedRoute>
              <Loans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/top-up"
          element={
            <ProtectedRoute>
              <TopUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savings-page"
          element={
            <ProtectedRoute>
              <SavingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savings/new"
          element={
            <ProtectedRoute>
              <CreateSavingsGoal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/savings/edit/:id"
          element={
            <ProtectedRoute>
              <EditSavingsGoal />
            </ProtectedRoute>
          }
        />
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
        <Route
          path="/cards"
          element={
            <ProtectedRoute>
              <Cards />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cheques"
          element={
            <ProtectedRoute>
              <Cheques />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <ChatBot />
            </ProtectedRoute>
          }
        />
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
            <LoadingSpinnerProvider>
              <PageWrapper>
                <AppContent />
              </PageWrapper>
            </LoadingSpinnerProvider>
          </AuthProvider>
        </SavingsProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;