import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserDashboard.css";
import UserNavbar from "./UserNavbar";


const UserDashboard = () => {
  const [user, setUser] = useState({
    id: "",
    userName: "",
    password: "",
    balance: 0,
    status: "",
  });

  const [modalType, setModalType] = useState(null);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // Load user data on mount
  useEffect(() => {
    const handleUser = async () => {
      try {
        const userid = JSON.parse(localStorage.getItem("user"));
        if (!userid?.id) {
          toast.error("User not found in local storage.");
          return;
        }

        const { id } = userid;
        const response = await axios.get(`http://localhost:8081/user/getuser/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch user data.");
      }
    };
    handleUser();
  }, []);

  const handleAction = (type) => {
    setModalType(type);
    setAmount("");
    setRecipient("");
  };

  const handleSubmit = async () => {
  try {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    let url = "";
    let params = {};

    if (modalType === "Deposit") {
      url = `http://localhost:8081/transaction/deposit/${user.id}`;
      params = { amount: amt };
    } else if (modalType === "Withdraw") {
      url = `http://localhost:8081/transaction/withdraw/${user.id}`;
      params = { amount: amt };
    } else if (modalType === "Transfer") {
      if (!recipient.trim()) {
        toast.error("Please enter recipient username.");
        return;
      }
      url = `http://localhost:8081/transaction/transfer/${user.id}`;
      params = { toUser: recipient, amount: amt };
    }

    const response = await axios.post(url, null, { params });

    // Show backend message based on status code
    if (response.status >= 200 && response.status < 300) {
      toast.success(response.data);
      // refresh balance
      const refreshedUser = await axios.get(`http://localhost:8081/user/getuser/${user.id}`);
      setUser(refreshedUser.data);
      setModalType(null);
    } else {
      toast.error(response.data);
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data); // backend's error message
    } else {
      toast.error("An error occurred.");
    }
  }
};

  return (
    <div>
      <UserNavbar />
      <div className="dashboard-container">
        <ToastContainer position="top-right" autoClose={1000}/>
        <h2>Welcome, {user.userName}</h2>
        <p className="balance">Current Balance: ₹{user.balance.toFixed(2)}</p>

        <div className="account-box">
          <h3>Account Details</h3>
          <p><strong>Account Number:</strong> {user.id}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Account Type:</strong> Savings</p>
        </div>

        <div className="action-buttons">
          <button onClick={() => handleAction("Deposit")}>Deposit</button>
          <button onClick={() => handleAction("Withdraw")}>Withdraw</button>
          <button onClick={() => handleAction("Transfer")}>Transfer Money</button>
        </div>

        {modalType && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={() => setModalType(null)}>×</button>
              <h4>{modalType}</h4>

              {modalType === "Transfer" && (
                <>
                  <label>Recipient Username:</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </>
              )}

              <label>Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="submit-btn" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
