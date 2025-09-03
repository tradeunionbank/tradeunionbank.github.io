// src/pages/CreateSavingsGoal.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateSavingsGoal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    currency: "USD",
    monthlyContribution: "",
    startDate: "",
    targetDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newGoal = {
      id: Date.now(),
      ...formData,
      targetAmount: Number(formData.targetAmount),
      currentAmount: Number(formData.currentAmount || 0),
      monthlyContribution: Number(formData.monthlyContribution || 0),
    };

    // Save to localStorage
    const storedGoals = JSON.parse(localStorage.getItem("savingsGoals")) || [];
    storedGoals.push(newGoal);
    localStorage.setItem("savingsGoals", JSON.stringify(storedGoals));

    navigate("/savings");
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Create New Savings Goal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Goal Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={formData.targetAmount}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
            type="number"
            name="currentAmount"
            placeholder="Current Amount (optional)"
            value={formData.currentAmount}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KRW">KRW</option>
          </select>
          <input
            type="number"
            name="monthlyContribution"
            placeholder="Monthly Contribution (optional)"
            value={formData.monthlyContribution}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
          <textarea
            name="notes"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Save Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSavingsGoal;
