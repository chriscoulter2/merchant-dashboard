import Topbar from "../../../components/Topbar";

export default function AlertsPage() {
  const alerts = [
    "Negative reviews increased 18% this week.",
    "Average rating dropped from 4.5 to 4.3.",
    "One product line saw a 12% decline in sales.",
    "Weekend traffic is converting better than weekday traffic.",
  ];

  return (
    <>
      <Topbar
        title="Alerts"
        subtitle="Monitor changes, warnings, and opportunities"
      />

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
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
    </>
  );
}