function BalanceCard({ balance }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="text-blue-100 text-xs sm:text-sm font-medium mb-2">Available Balance</p>
          {/* 💶 Show dynamic EUR balance */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            €{balance.toLocaleString()}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-2">IBAN: ****7265</p>
        </div>
        <div className="text-right">
          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-blue-200 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
