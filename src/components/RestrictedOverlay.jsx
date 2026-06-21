import React from "react";

function RestrictedOverlay() {
  const reason =
    localStorage.getItem("restrictedReason") ||
    "We detected activity from an unknown IP address. As a precaution all transactions have been temporarily restricted.";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
      <div className="max-w-2xl w-full rounded-3xl bg-gradient-to-br from-white to-rose-50 p-8 sm:p-12 text-center shadow-2xl dark:from-slate-900 dark:to-rose-950/20 dark:bg-slate-900 border border-rose-200 dark:border-rose-900/30">
        <div className="flex flex-col items-center gap-6">
          {/* Icon with enhanced styling */}
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-rose-100 to-red-100 text-red-600 dark:from-red-900/30 dark:to-rose-900/20 dark:text-rose-400 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* Main heading */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl font-black text-red-600 dark:text-rose-400 tracking-tight">Account Restricted</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-red-500 to-rose-400 rounded-full mx-auto"></div>
          </div>

          {/* Primary message */}
          <p className="max-w-[56ch] text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
            Your account has been restricted due to suspicious activity
          </p>

          {/* Secondary message */}
          <p className="max-w-[56ch] text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {reason}
          </p>

          {/* Information box */}
          <div className="w-full mt-6 p-4 sm:p-5 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded-lg">
            <p className="text-xs sm:text-sm font-semibold text-red-700 dark:text-rose-300 uppercase tracking-wide">Security Notice</p>
            <p className="text-sm sm:text-base text-red-600 dark:text-rose-200 mt-2 font-medium">
              All account actions are temporarily disabled while we investigate. Please contact our support team for assistance.
            </p>
          </div>

          {/* Footer text */}
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            For your security, this is a precautionary measure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestrictedOverlay;
