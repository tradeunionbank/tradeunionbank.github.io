import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Download, Home, ReceiptText } from "lucide-react";

function Successful() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-lg border border-sky-100 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <ReceiptText className="mx-auto h-12 w-12 text-sky-600" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">Receipt unavailable</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            No transfer details were found for this session.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full rounded-md bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const {
    amount,
    currency,
    country,
    transferType,
    iban,
    swift,
    ibanDetails,
    swiftDetails,
    newBalance,
    status,
    id,
  } = state;

  const recipientDetails = ibanDetails || swiftDetails;
  const recipient = recipientDetails
    ? `${recipientDetails.firstName || ""} ${recipientDetails.middleName || ""} ${recipientDetails.lastName || ""}`.replace(/\s+/g, " ").trim()
    : country || "Bank recipient";
  const bankName = recipientDetails?.bankName;
  const reference = id || `PHB-${Date.now()}`;
  const formattedBalance = Number.isFinite(Number(newBalance))
    ? Number(newBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })
    : "--";

  const rows = [
    ["Amount", `${amount} ${currency}`],
    ["Recipient", recipient],
    ["Destination", country],
    ["Transfer type", transferType],
    iban ? ["IBAN", iban] : null,
    swift ? ["SWIFT / Account", swift] : null,
    bankName ? ["Bank name", bankName] : null,
    ["Reference", reference],
    ["New balance", `$${formattedBalance}`],
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6">
      <main className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:border-sky-300 hover:text-sky-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-sky-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <section className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-sky-700 px-6 py-8 text-white sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-100">Pacific Horizon Bank</p>
                <h1 className="mt-3 text-3xl font-bold">Transfer completed</h1>
                <p className="mt-2 max-w-xl text-sm text-sky-100/90">Your payment has been accepted. Review the transfer details below, then head to activity to see your latest balance and transaction history.</p>
              </div>
              <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-white text-sky-700 shadow-lg shadow-sky-900/10">
                <CheckCircle2 className="h-10 w-10" />
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-300">Amount</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{amount} {currency}</p>
                  </div>
                  <div className="rounded-3xl bg-sky-100 px-4 py-3 text-sky-700 dark:bg-sky-900/10 dark:text-sky-300">
                    <span className="text-sm font-semibold">{status || "Complete"}</span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">This transfer will show in transaction history with the recipient, destination country, and bank details for your reference.</p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Destination</p>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{country}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{recipient}</p>
                {bankName && (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    Bank: <span className="font-semibold text-slate-900 dark:text-white">{bankName}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Transfer details</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Reference</span>
                  <span>{reference}</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">Transfer type</span>
                  <span>{transferType}</span>
                </div>
                {iban && (
                  <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">IBAN</span>
                    <span>{iban}</span>
                  </div>
                )}
                {swift && (
                  <div className="grid gap-2 sm:grid-cols-[140px_1fr]">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">SWIFT</span>
                    <span>{swift}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-sky-600 px-4 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-700"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-sky-200 bg-white px-4 py-3 font-semibold text-sky-800 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-950 dark:text-sky-300 dark:hover:bg-slate-800"
              >
                <ReceiptText className="h-5 w-5" />
                View Transactions
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Download className="h-5 w-5" />
                Save receipt
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Successful;
