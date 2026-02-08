import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [infos, setInfos] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await axios.get("http://localhost:8081/admin/getinfo");
        const txnResponse = await axios.get("http://localhost:8081/transaction/recent");

        const stats = statsResponse.data;

        setInfos([
          { title: "Total Users", value: stats.users.toLocaleString() },
          { title: "Total Transactions", value: stats.transactions.toLocaleString() },
          { title: "Deposits Today", value: `₹ ${stats.depositsToday.toLocaleString()}` },
          { title: "Withdrawals Today", value: `₹ ${stats.withdrawalsToday.toLocaleString()}` },
        ]);

        // Format transactions
        const formattedTxns = txnResponse.data.map(txn => ({
          user: txn.userName,
          type: txn.tType,
          amount: `₹ ${txn.amount.toLocaleString()}`,
          date: new Date(txn.date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setRecentTransactions(formattedTxns);
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-dashboard">
      <AdminNavbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* Quick Stats Cards */}
        <div className="stats-cards">
          {infos.map((info, index) => (
            <div className="card" key={index}>
              <h3>{info.title}</h3>
              <p>{info.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <div className="recent-activity">
          <h2>Recent Transactions</h2>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.user}</td>
                  <td>{txn.type}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
