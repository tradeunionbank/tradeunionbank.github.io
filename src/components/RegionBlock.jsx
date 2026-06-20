import React from "react";

function RegionBlock({ country }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-center p-6">
      <div className="max-w-lg rounded-2xl border border-slate-200 p-8 shadow-2xl">
        <h2 className="text-2xl font-semibold mb-2">Service unavailable in your area</h2>
        <p className="text-sm text-slate-700 mb-4">
          Our services are not available in {country || "your region"}. For security and compliance reasons access is restricted.
        </p>
        <p className="text-xs text-slate-500">If you believe this is an error, please contact support.</p>
      </div>
    </div>
  );
}

export default RegionBlock;
