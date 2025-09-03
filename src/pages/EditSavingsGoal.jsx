import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditSavingsGoal = () => {
  const { id } = useParams(); // get goal id from the URL
  const navigate = useNavigate();

  // For now, mock saved data (later replace with API/DB call)
  const mockSavingsGoals = [
    {
      id: "1",
      title: "New Car Fund",
      targetAmount: 20000,
      currentAmount: 5000,
      currency: "USD",
      monthlyContribution: 500,
      startDate: "2024-01-01",
      targetDate: "2024-12-31",
      notes: "Saving for my dream car",
    },
    {
      id: "2",
      title: "Vacation Fund",
      targetAmount: 5000,
      currentAmount: 1000,
      currency: "EUR",
      monthlyContribution: 200,
      startDate: "2024-03-01",
      targetDate: "2025-06-01",
      notes: "Summer trip flights",
    },
  ];

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    // Find the savings goal based on id
    const goal = mockSavingsGoals.find((g) => g.id === id);
    if (goal) {
      setFormData(goal);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Save updates to backend (API/Firebase/etc.)
    console.log("Updated Savings Goal:", formData);

    // Redirect back to savings page
    navigate("/savings");
  };

  if (!formData) {
    return <p className="text-center text-gray-600 dark:text-gray-300">Loading goal...</p>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Edit Savings Goal
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Saving Title / Goal Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Target Amount */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Target Amount</label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Current Amount */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Current Amount</label>
            <input
              type="number"
              name="currentAmount"
              value={formData.currentAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="KRW">KRW</option>
              <option value="NGN">NGN</option>
            </select>
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Monthly Contribution</label>
            <input
              type="number"
              name="monthlyContribution"
              value={formData.monthlyContribution}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Target Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Target Date</label>
            <input
              type="date"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Notes / Description</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSavingsGoal;
