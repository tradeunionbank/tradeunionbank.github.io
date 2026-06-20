import React, { useState } from "react";

const Savings = () => {
  // State to hold form data
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (optional - can be hooked to backend or further processing)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add logic here to save this data to a backend or local storage
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Create New Savings Goal</h2>

        <form onSubmit={handleSubmit}>
          {/* Saving Title / Goal Name */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Saving Title / Goal Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., New Car Fund"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Target Amount */}
          <div className="mb-4">
            <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Amount
            </label>
            <input
              type="number"
              id="targetAmount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Current Amount / Initial Deposit */}
          <div className="mb-4">
            <label htmlFor="currentAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Amount / Initial Deposit (Optional)
            </label>
            <input
              type="number"
              id="currentAmount"
              name="currentAmount"
              value={formData.currentAmount}
              onChange={handleChange}
              placeholder="e.g., 1000"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Currency Dropdown */}
          <div className="mb-4">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="KRW">KRW</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          {/* Monthly Contribution */}
          <div className="mb-4">
            <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Monthly Contribution (Optional)
            </label>
            <input
              type="number"
              id="monthlyContribution"
              name="monthlyContribution"
              value={formData.monthlyContribution}
              onChange={handleChange}
              placeholder="e.g., 200"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Target Date */}
          <div className="mb-4">
            <label htmlFor="targetDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Date
            </label>
            <input
              type="date"
              id="targetDate"
              name="targetDate"
              value={formData.targetDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
            />
          </div>

          {/* Notes / Description */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Notes / Description (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="e.g., This is for my summer trip flights"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md w-full sm:w-auto"
            >
              Save Savings Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Savings;
