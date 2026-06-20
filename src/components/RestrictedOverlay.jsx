import React from "react";

function RestrictedOverlay() {
  const reason =
    localStorage.getItem("restrictedReason") ||
    "We detected activity from an unknown IP address. As a precaution all transactions have been temporarily restricted.";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
      <div className="max-w-2xl w-full rounded-2xl bg-white p-8 text-center shadow-2xl dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m0-10a3 3 0 00-3 3v2h6v-2a3 3 0 00-3-3z" />
              <rect x="3" y="11" width="18" height="10" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Account Restricted</h2>

          <p className="max-w-[56ch] mt-1 text-sm text-slate-700 dark:text-slate-300">Sorry! This account has been restricted from all activities and transactions due to an unknow IP Address access.</p>

          <p className="mt-4 text-sm text-slate-500">All account actions are temporarily disabled while we investigate.</p>
        </div>
      </div>
    </div>
  );
}

export default RestrictedOverlay;
