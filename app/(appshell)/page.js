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

function formatMoney(value) {
  return `$${value.toLocaleString()}`;
}

export default function Home() {
  const { csvRows, csvHeaders, csvFileName } = useData();

  const revenueColumn = findColumnName(csvHeaders, ["revenue", "sales", "amount", "total"]);
  const ordersColumn = findColumnName(csvHeaders, ["orders", "order_count", "quantity", "qty"]);
  const ratingColumn = findColumnName(csvHeaders, ["rating", "reviewscore", "review_score", "stars"]);
  const productColumn = findColumnName(csvHeaders, ["product", "item", "product_name", "name"]);
  const dateColumn = findColumnName(csvHeaders, ["date", "day", "order_date", "created_at"]);

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
    ? csvRows.filter((row) => {
        const value = parseNumber(row[ratingColumn]);
        return value > 0 && value < 4;
      }).length
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

  let chartTitle = "Revenue Chart";
  let chartData = [];

  if (dateColumn && revenueColumn) {
    const revenueByDate = {};

    csvRows.forEach((row) => {
      const date = row[dateColumn] || "Unknown";
      const revenue = parseNumber(row[revenueColumn]);

      if (!revenueByDate[date]) {
        revenueByDate[date] = 0;
      }

      revenueByDate[date] += revenue;
    });

    chartData = Object.entries(revenueByDate)
      .map(([label, value]) => ({ label, value }))
      .slice(0, 10);

    chartTitle = `Revenue by ${dateColumn}`;
  } else if (productColumn && revenueColumn) {
    const revenueByProduct = {};

    csvRows.forEach((row) => {
      const product = row[productColumn] || "Unknown";
      const revenue = parseNumber(row[revenueColumn]);

      if (!revenueByProduct[product]) {
        revenueByProduct[product] = 0;
      }

      revenueByProduct[product] += revenue;
    });

    chartData = Object.entries(revenueByProduct)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    chartTitle = `Revenue by ${productColumn}`;
  }

  const maxChartValue = Math.max(...chartData.map((item) => item.value), 1);

  const cards = [
    {
      title: "Total Revenue",
      value: revenueColumn ? formatMoney(totalRevenue) : "No revenue column",
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
    chartData.length > 0
      ? `Chart is currently grouped using ${dateColumn ? `"${dateColumn}"` : `"${productColumn}"`}.`
      : "Upload a CSV with revenue plus date or product columns to generate a chart.",
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
            <h2 className="text-xl font-bold mb-4">{chartTitle}</h2>

            {chartData.length > 0 ? (
              <>
                <div className="h-72 flex items-end gap-4">
                  {chartData.map((item) => {
                    const heightPercent = Math.max(
                      10,
                      Math.round((item.value / maxChartValue) * 100)
                    );

                    return (
                      <div
                        key={item.label}
                        className="flex-1 flex flex-col items-center justify-end h-full"
                      >
                        <div className="text-xs text-slate-500 mb-2">
                          {formatMoney(item.value)}
                        </div>

                        <div
                          className="w-full max-w-[70px] bg-blue-500 rounded-t-xl"
                          style={{ height: `${heightPercent}%` }}
                        />

                        <div className="mt-2 text-sm text-slate-500 text-center break-words">
                          {item.label}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="text-slate-500 text-sm mt-4">
                  Showing up to 10 grouped revenue bars from the uploaded CSV.
                </p>
              </>
            ) : (
              <p className="text-slate-500">
                Upload a CSV with a revenue column plus either a date column or product column to generate the chart.
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

        <section className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
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
        </section>
      </div>
    </>
  );
}