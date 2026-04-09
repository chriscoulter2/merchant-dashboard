"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [csvRows, setCsvRows] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvFileName, setCsvFileName] = useState("");

  useEffect(() => {
    const savedRows = localStorage.getItem("csvRows");
    const savedHeaders = localStorage.getItem("csvHeaders");
    const savedFileName = localStorage.getItem("csvFileName");

    if (savedRows) {
      setCsvRows(JSON.parse(savedRows));
    }

    if (savedHeaders) {
      setCsvHeaders(JSON.parse(savedHeaders));
    }

    if (savedFileName) {
      setCsvFileName(savedFileName);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("csvRows", JSON.stringify(csvRows));
    localStorage.setItem("csvHeaders", JSON.stringify(csvHeaders));
    localStorage.setItem("csvFileName", csvFileName);
  }, [csvRows, csvHeaders, csvFileName]);

  const value = useMemo(() => {
    return {
      csvRows,
      csvHeaders,
      csvFileName,
      setCsvRows,
      setCsvHeaders,
      setCsvFileName,
      clearCsvData: () => {
        setCsvRows([]);
        setCsvHeaders([]);
        setCsvFileName("");
        localStorage.removeItem("csvRows");
        localStorage.removeItem("csvHeaders");
        localStorage.removeItem("csvFileName");
      },
    };
  }, [csvRows, csvHeaders, csvFileName]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used inside DataProvider");
  }

  return context;
}