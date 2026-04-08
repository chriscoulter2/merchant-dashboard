import Link from "next/link";

export default function IntegrationsPage() {
  const integrations = [
    { name: "Shopify", status: "Not connected" },
    { name: "Google Reviews", status: "Not connected" },
    { name: "Yelp", status: "Not connected" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-blue-600 font-medium">← Back to Dashboard</Link>
        <div className="bg-white rounded-2xl shadow-sm p-8 mt-4">
          <h1 className="text-3xl font-bold mb-2">Integrations</h1>
          <p className="text-slate-500 mb-6">Connect your sales and review channels here.</p>

          <div className="space-y-4">
            {integrations.map((item) => (
              <div key={item.name} className="flex items-center justify-between border border-slate-200 rounded-2xl p-5">
                <div>
                  <div className="font-semibold text-lg">{item.name}</div>
                  <div className="text-slate-500 text-sm">{item.status}</div>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-semibold">
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}