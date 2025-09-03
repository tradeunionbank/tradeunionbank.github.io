import { Link, useNavigate } from 'react-router-dom';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

function Request() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Request feature coming soon!');
  };

  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen py-8 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 w-full">
          {/* Back Button */}
          <button onClick={() => navigate(-1)} className="flex-shrink-0">
            <FaArrowAltCircleLeft className="text-2xl text-blue-600 dark:text-white" />
          </button>

          {/* Title (always centered) */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-700 dark:text-white text-center flex-1">
            Request Money
          </h2>

          {/* Placeholder for spacing (keeps title centered) */}
          <div className="w-6 sm:w-8" />
        </header>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/15 dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-10 space-y-6"
        >
          {/* Payer Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Payer Account
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter account number"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="flex-1 p-3 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-semibold transition-all duration-200"
            >
              Send Request
            </button>
            <Link
              to="/dashboard"
              className="flex-1 p-3 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-white font-semibold text-center transition-all duration-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Request;
