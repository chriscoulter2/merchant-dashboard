"use client";

import { useState } from "react";
import Papa from "papaparse";
import Topbar from "../../../components/Topbar";
import { useData } from "../../../components/DataProvider";

export default function UploadsPage() {
  const [error, setError] = useState("");

  const {
    csvRows,
    csvHeaders,
    csvFileName,
    setCsvRows,
    setCsvHeaders,
    setCsvFileName,
    clearCsvData,
  } = useData();

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please upload a CSV file.");
      clearCsvData();
      return;
    }

    setError("");

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedRows = results.data || [];
        const parsedHeaders =
          parsedRows.length > 0 ? Object.keys(parsedRows[0]) : [];

        setCsvFileName(file.name);
        setCsvHeaders(parsedHeaders);
        setCsvRows(parsedRows);
      },
      error: function () {
        setError("There was a problem reading that CSV file.");
        clearCsvData();
      },
    });
  }

  return (
    <>
      <Topbar
        title="Uploads"
        subtitle="Upload CSV sales files and preview imported data"
      />

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-slate-50">
            <p className="text-lg font-semibold mb-2">Upload a CSV file</p>
            <p className="text-slate-500 mb-4">
              Choose a real CSV file from your computer
            </p>

            <label className="inline-block bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold cursor-pointer">
              Choose CSV File
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={clearCsvData}
              className="bg-slate-200 text-slate-900 px-4 py-2 rounded-xl font-semibold"
            >
              Clear Uploaded Data
            </button>
          </div>

          {error ? (
            <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
              {error}
            </div>
          ) : null}

          {csvFileName ? (
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="font-semibold">Uploaded File</div>
              <div className="text-slate-600 text-sm mt-1">{csvFileName}</div>
              <div className="text-slate-600 text-sm mt-2">
                Rows found: {csvRows.length}
              </div>
            </div>
          ) : null}

          {csvRows.length > 0 ? (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-4">Preview</h2>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-100">
                    <tr>
                      {csvHeaders.map((header) => (
                        <th
                          key={header}
                          className="text-left px-4 py-3 font-semibold border-b border-slate-200"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {csvRows.slice(0, 10).map((row, index) => (
                      <tr key={index} className="border-b border-slate-100">
                        {csvHeaders.map((header) => (
                          <td key={header} className="px-4 py-3 text-slate-700">
                            {row[header]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-500 text-sm mt-3">
                Showing the first 10 rows from the uploaded CSV.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}