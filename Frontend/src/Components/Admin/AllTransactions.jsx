// AllTransactions.jsx
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminNavbar from "./AdminNavbar";
import "./AllTransactions.css";

const AllTransactions = () => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [filters, setFilters] = useState({ userName: "", tType: "" });
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

  // Fetch transactions from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:8081/transaction/all", {
          
        });
        setTransactionsData(Array.isArray(res.data) ? res.data : []);
        // toast.success("Transactions loaded successfully");
      } catch (err) {
        console.error("Fetch transactions error:", err);
        const message = err.response?.data || err.message || "Failed to fetch transactions";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const typeOptions = useMemo(() => {
    const setTypes = new Set(transactionsData.map((t) => t.tType).filter(Boolean));
    return Array.from(setTypes);
  }, [transactionsData]);

  const parseBackendDate = (dateStr) => {
    if (!dateStr) return null;
    let d = new Date(dateStr);
    if (!isNaN(d)) return d;
    d = new Date(dateStr.replace(",", ""));
    if (!isNaN(d)) return d;
    const match = dateStr.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})\D+(\d{2}):(\d{2}):(\d{2})/);
    if (match) {
      const [, day, mon, year, hh, mm, ss] = match;
      return new Date(`${day} ${mon} ${year} ${hh}:${mm}:${ss}`);
    }
    return null;
  };

  const processed = useMemo(() => {
    const filtered = transactionsData.filter((transaction) => {
      const nameOk =
        !filters.userName ||
        (transaction.userName || "")
          .toLowerCase()
          .includes(filters.userName.toLowerCase());
      const typeOk = !filters.tType || transaction.tType === filters.tType;
      return nameOk && typeOk;
    });

    // sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortConfig.key === "amount") {
        const av = Number(a.amount ?? 0);
        const bv = Number(b.amount ?? 0);
        return sortConfig.direction === "asc" ? av - bv : bv - av;
      }
      if (sortConfig.key === "date") {
        const da = parseBackendDate(a.date);
        const db = parseBackendDate(b.date);
        const ta = da ? da.getTime() : 0;
        const tb = db ? db.getTime() : 0;
        return sortConfig.direction === "asc" ? ta - tb : tb - ta;
      }
      return 0;
    });

    return sorted;
  }, [transactionsData, filters, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <AdminNavbar />
      <div className="alltransactions-container">
        <ToastContainer position="top-right" autoClose={1000} />
        <h2 className="alltransactions-heading">All Transactions</h2>

        {/* Filters */}
        <div className="filter-container">
          <input
            type="text"
            placeholder="Filter by User Name"
            value={filters.userName}
            onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
            className="filter-input"
          />

          <select
            value={filters.tType}
            onChange={(e) => setFilters({ ...filters, tType: e.target.value })}
            className="filter-select"
          >
            <option value="">Filter by Type</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Loading / Empty / Table */}
        {loading ? (
          <p>Loading transactions...</p>
        ) : processed.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User Name</th>
                <th>Type</th>
                <th onClick={() => requestSort("amount")} style={{ cursor: "pointer" }}>
                  Amount {sortConfig.key === "amount" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => requestSort("date")} style={{ cursor: "pointer" }}>
                  Date {sortConfig.key === "date" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {processed.map((transaction) => (
                <tr key={transaction.tId}>
                  <td>{transaction.tId}</td>
                  <td>{transaction.userName}</td>
                  <td>{transaction.tType}</td>
                  <td>₹{Number(transaction.amount).toFixed(2)}</td>
                  <td>{transaction.date || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;
