"use client";

import Topbar from "../../components/Topbar";
import { useData } from "../../components/DataProvider";

function findColumnName(headers, options) {
  return headers.find((header) =>
    options.some((option) => header.toLowerCase().trim() === option)
  );
}

function parseNumber(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  const cleaned = String(value).replace(/[$,%\s,]/g, "");
  const number = Number(cleaned);

  return Number.isFinite(number) ? number : 0;
}

export default function Home() {
  const { csvRows, csvHeaders, csvFileName } = useData();

  const revenueColumn = findColumnName(csvHeaders, ["revenue", "sales", "amount", "total"]);
  const ordersColumn = findColumnName(csvHeaders, ["orders", "order_count", "quantity", "qty"]);
  const ratingColumn = findColumnName(csvHeaders, ["rating", "reviewscore", "review_score", "stars"]);
  const productColumn = findColumnName(csvHeaders, ["product", "item", "product_name", "name"]);

  const totalRevenue = revenueColumn
    ? csvRows.reduce((sum, row) => sum + parseNumber(row[revenueColumn]), 0)
    : 0;

  const totalOrders = ordersColumn
    ? csvRows.reduce((sum, row) => sum + parseNumber(row[ordersColumn]), 0)
    : csvRows.length;

  const averageRating = ratingColumn
    ? (
        csvRows.reduce((sum, row) => sum + parseNumber(row[ratingColumn]), 0) /
        (csvRows.length || 1)
      ).toFixed(1)
    : "—";

  const lowRatingCount = ratingColumn
    ? csvRows.filter((row) => parseNumber(row[ratingColumn]) > 0 && parseNumber(row[ratingColumn]) < 4).length
    : 0;

  const productTotals = {};

  if (productColumn && revenueColumn) {
    csvRows.forEach((row) => {
      const product = row[productColumn] || "Unknown";
      const revenue = parseNumber(row[revenueColumn]);

      if (!productTotals[product]) {
        productTotals[product] = 0;
      }

      productTotals[product] += revenue;
    });
  }

  const topProduct =
    Object.entries(productTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  const cards = [
    {
      title: "Total Revenue",
      value: revenueColumn ? `$${totalRevenue.toLocaleString()}` : "No revenue column",
      helper: revenueColumn ? `Using "${revenueColumn}"` : 'Add a "revenue" column',
      positive: true,
    },
    {
      title: "Orders",
      value: totalOrders.toLocaleString(),
      helper: ordersColumn ? `Using "${ordersColumn}"` : "Using row count fallback",
      positive: true,
    },
    {
      title: "Average Rating",
      value: averageRating,
      helper: ratingColumn ? `Using "${ratingColumn}"` : 'Add a "rating" column',
      positive: false,
    },
    {
      title: "Low Rating Alerts",
      value: lowRatingCount.toLocaleString(),
      helper: ratingColumn ? "Ratings below 4.0" : "No rating data found",
      positive: false,
    },
  ];

  const insights = [
    csvFileName ? `Current uploaded file: ${csvFileName}` : "No CSV uploaded yet.",
    revenueColumn
      ? `Top product by revenue: ${topProduct}`
      : "Upload a CSV with a revenue column to unlock sales insights.",
    ratingColumn
      ? `${lowRatingCount} rows are below a 4.0 rating threshold.`
      : "Upload a CSV with a rating column to unlock sentiment alerts.",
    productColumn
      ? `Detected product column: "${productColumn}".`
      : "Add a product column to compare items.",
  ];

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Sales and customer feedback overview"
      />

      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <a
            href="/uploads"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            Upload CSV
          </a>
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
                {card.helper}
              </div>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Detected CSV Columns</h2>

            {csvHeaders.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {csvHeaders.map((header) => (
                  <span
                    key={header}
                    className="bg-slate-100 border border-slate-200 rounded-full px-3 py-1 text-sm"
                  >
                    {header}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">
                Upload a CSV on the Uploads page to generate real dashboard metrics.
              </p>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Actionable Insights</h2>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border-l-4 border-blue-600 rounded-lg p-4 text-sm"
                >
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