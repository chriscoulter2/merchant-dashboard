import Link from "next/link";

export default function AlertsPage() {
  const alerts = [
    "Negative reviews increased 18% this week.",
    "Average rating dropped from 4.5 to 4.3.",
    "One product line saw a 12% decline in sales.",
    "Weekend traffic is converting better than weekday traffic.",
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 font-medium">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 mt-4">
          <h1 className="text-3xl font-bold mb-2">Alerts</h1>
          <p className="text-slate-500 mb-6">
            Important changes and warnings will appear here.
          </p>

          <div className="space-y-4">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="border-l-4 border-red-500 bg-red-50 rounded-xl p-4 text-sm"
              >
                {alert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}