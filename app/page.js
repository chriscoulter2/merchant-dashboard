export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="bg-slate-900 text-white px-8 py-5 text-2xl font-bold">
        Merchant Insight Dashboard
      </div>

      <div className="p-8">
        <section className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Sales and Customer Feedback Overview
          </h1>
          <p className="text-slate-500 mb-5">
            Track revenue trends, customer sentiment, and product performance across channels.
          </p>

          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold">
              Upload CSV
            </button>
            <button className="bg-slate-200 text-slate-900 px-4 py-3 rounded-xl font-semibold">
              Connect Shopify
            </button>
            <button className="bg-slate-200 text-slate-900 px-4 py-3 rounded-xl font-semibold">
              Connect Reviews
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-sm text-slate-500 mb-2">Total Revenue</div>
            <div className="text-3xl font-bold mb-2">$84,320</div>
            <div className="text-green-600 text-sm">+12.4% vs last month</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-sm text-slate-500 mb-2">Orders</div>
            <div className="text-3xl font-bold mb-2">1,284</div>
            <div className="text-green-600 text-sm">+8.1% vs last month</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-sm text-slate-500 mb-2">Average Rating</div>
            <div className="text-3xl font-bold mb-2">4.3</div>
            <div className="text-red-600 text-sm">-0.2 vs last month</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-sm text-slate-500 mb-2">Negative Feedback Alerts</div>
            <div className="text-3xl font-bold mb-2">17</div>
            <div className="text-red-600 text-sm">+5 new this week</div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Monthly Sales Trend</h2>

            <div className="h-64 flex items-end gap-4">
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[60px] bg-blue-400 rounded-t-xl" style={{ height: "35%" }} />
                <div className="mt-2 text-sm text-slate-500">Jan</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[60px] bg-blue-400 rounded-t-xl" style={{ height: "48%" }} />
                <div className="mt-2 text-sm text-slate-500">Feb</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[60px] bg-blue-400 rounded-t-xl" style={{ height: "44%" }} />
                <div className="mt-2 text-sm text-slate-500">Mar</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[60px] bg-blue-500 rounded-t-xl" style={{ height: "60%" }} />
                <div className="mt-2 text-sm text-slate-500">Apr</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[60px] bg-blue-500 rounded-t-xl" style={{ height: "68%" }} />
                <div className="mt-2 text-sm text-slate-500">May</div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="w-full max-w-[60px] bg-blue-600 rounded-t-xl" style={{ height: "72%" }} />
                <div className="mt-2 text-sm text-slate-500">Jun</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Actionable Insights</h2>

            <div className="space-y-3">
              <div className="bg-slate-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm">
                Customers are mentioning slow checkout more often in recent reviews.
              </div>
              <div className="bg-slate-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm">
                Accessories showed the strongest sales growth this month.
              </div>
              <div className="bg-slate-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm">
                Negative review volume increased after the latest pricing change.
              </div>
              <div className="bg-slate-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm">
                Weekend sales outperform weekday sales by 18%.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}