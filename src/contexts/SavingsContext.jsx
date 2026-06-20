// src/context/SavingsContext.jsx
import React, { createContext, useState, useContext } from "react";

const SavingsContext = createContext();

export const useSavings = () => useContext(SavingsContext);

export const SavingsProvider = ({ children }) => {
  const [savingsGoals, setSavingsGoals] = useState([
    {
      id: 1,
      title: "New Car Fund",
      targetAmount: 20000,
      currentAmount: 5000,
      currency: "USD",
      targetDate: "2024-12-31",
    },
    {
      id: 2,
      title: "Emergency Savings",
      targetAmount: 10000,
      currentAmount: 7000,
      currency: "USD",
      targetDate: "2024-06-30",
    },
  ]);

  const addGoal = (goal) => {
    setSavingsGoals([...savingsGoals, { ...goal, id: Date.now() }]);
  };

  const updateGoal = (id, updatedGoal) => {
    setSavingsGoals(
      savingsGoals.map((goal) => (goal.id === id ? { ...goal, ...updatedGoal } : goal))
    );
  };

  const deleteGoal = (id) => {
    setSavingsGoals(savingsGoals.filter((goal) => goal.id !== id));
  };

  return (
    <SavingsContext.Provider value={{ savingsGoals, addGoal, updateGoal, deleteGoal }}>
      {children}
    </SavingsContext.Provider>
  );
};
