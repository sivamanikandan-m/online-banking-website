import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserTransaction.css";
import UserNavbar from "./UserNavbar";

const UserTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser?.id) {
          toast.error("User not found in local storage.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8081/transaction/getbyid/${storedUser.id}`
        );

        if (response.data && Array.isArray(response.data)) {
          setTransactions(response.data);
        } else {
          toast.warn("No transactions found for this user.");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data || "Failed to fetch transactions.");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <UserNavbar />
      <div className="transaction-container">
        <ToastContainer position="top-right" autoClose={1000} />
        <h2>Transaction History</h2>

        {transactions.length > 0 ? (
          <table className="transaction-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={txn.tId}>
                  <td>{index + 1}</td>
                  <td>{txn.tType}</td>
                  <td 
                    className={
                      txn.amount > 0 ? "amount-positive" : "amount-negative"
                    }
                  >
                    ₹{Math.abs(txn.amount).toFixed(2)}
                  </td>
                  <td>
                    {new Date(txn.date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}

        <Link to="/dashboard/user" className="back-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UserTransaction;
