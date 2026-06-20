import { ShieldCheck, TrendingUp } from "lucide-react";

function BalanceCard({ balance, compact = false }) {
  const displayBalance = Number.isFinite(Number(balance)) ? Number(balance) : 3000000;

  return (
    <section className="overflow-hidden rounded-lg border border-sky-100 bg-sky-700 text-white shadow-sm dark:border-sky-900 dark:bg-slate-950">
      <div className={`grid gap-0 ${compact ? "" : "lg:grid-cols-[1.4fr_0.8fr] lg:items-stretch"}`}>
        <div className="p-5 sm:p-7">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-100">Premier checking</p>
              <h2 className="mt-1 text-lg font-bold">Pacific Horizon Private Account</h2>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">Active</span>
          </div>

          <p className="text-sm font-medium text-sky-100">Available balance</p>
          <p className="mt-2 text-4xl font-bold tracking-normal sm:text-5xl lg:text-6xl">
            ${displayBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="mt-3 text-sm text-sky-100">Account ending in 7265</p>
        </div>
        {!compact && (
          <div className="border-t border-white/15 bg-white/10 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:min-h-[260px] lg:pb-8 lg:pt-7">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="rounded-md bg-white/15 p-2">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Protected banking</p>
                  <p className="mt-1 text-sm text-sky-100">Account monitoring and secure passkey verification are enabled.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="rounded-md bg-white/15 p-2">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">Cash flow</p>
                  <p className="mt-1 text-sm text-sky-100">Recent deposits and transfers are available in activity.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default BalanceCard;
