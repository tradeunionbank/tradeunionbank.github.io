import React from 'react'
import { transferHistory } from "../transferHistory";

const TransferHistoryPage = () => {
  return (
    <div className="tf container -mt-4 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      <h1 className="quick border-transparent mb-12 font-bold text-2xl flex justify-center rounded-full p-2 mb-4">
        Transaction History
      </h1>
      <ul className="space-y-2">
        {transferHistory.map((tx) => (
          <li key={tx.id} className="flex justify-between items-center border-b rounded-xl border-gray-400 pb-2">
            <div className="px-4 mr-4 mb-2">
              <p className="li font-bold">{tx.name}</p>
              <small className="text-gray-300">{tx.date}</small>
            </div>
            <span className={`font-semibold ${tx.amount.startsWith('+') ? 'text-green-300' : 'text-red-300'}`}>
              {tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferHistoryPage;
