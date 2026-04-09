import Topbar from "../../../components/Topbar";

export default function IntegrationsPage() {
  const integrations = [
    { name: "Shopify", status: "Not connected" },
    { name: "Google Reviews", status: "Not connected" },
    { name: "Yelp", status: "Not connected" },
  ];

  return (
    <>
      <Topbar
        title="Integrations"
        subtitle="Connect your sales and review channels"
      />

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="space-y-4">
            {integrations.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border border-slate-200 rounded-2xl p-5"
              >
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
    </>
  );
}