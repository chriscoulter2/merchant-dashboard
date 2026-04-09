import Topbar from "../../components/Topbar";

export default function Home() {
  const cards = [
    { title: "Total Revenue", value: "$84,320", change: "+12.4% vs last month", positive: true },
    { title: "Orders", value: "1,284", change: "+8.1% vs last month", positive: true },
    { title: "Average Rating", value: "4.3", change: "-0.2 vs last month", positive: false },
    { title: "Negative Alerts", value: "17", change: "+5 new this week", positive: false },
  ];

  const insights = [
    "Customers are mentioning slow checkout more often in recent reviews.",
    "Accessories showed the strongest sales growth this month.",
    "Negative review volume increased after the latest pricing change.",
    "Weekend sales outperform weekday sales by 18%.",
  ];

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Sales and customer feedback overview"
      />

      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold">
            Upload CSV
          </button>
          <button className="bg-slate-200 text-slate-900 px-4 py-2 rounded-xl font-semibold">
            Connect Shopify
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="text-sm text-slate-500 mb-2">{card.title}</div>
              <div className="text-3xl font-bold mb-2">{card.value}</div>
              <div className={card.positive ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
                {card.change}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Monthly Sales Trend</h2>

            <div className="h-64 flex items-end gap-4">
              {[
                ["Jan", "35%"],
                ["Feb", "48%"],
                ["Mar", "44%"],
                ["Apr", "60%"],
                ["May", "68%"],
                ["Jun", "72%"],
              ].map(([month, height]) => (
                <div key={month} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full max-w-[60px] bg-blue-500 rounded-t-xl" style={{ height }} />
                  <div className="mt-2 text-sm text-slate-500">{month}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Actionable Insights</h2>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="bg-slate-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm">
                  {insight}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}