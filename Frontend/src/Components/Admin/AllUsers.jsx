// AllUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AllUsers.css";
import AdminNavbar from "./AdminNavbar";

const API_BASE = "http://localhost:8081"; 

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingIds, setUpdatingIds] = useState([]); // ids currently updating

  // Helper: presentable status (Active / Inactive)
  const formatStatus = (s) => {
    if (!s && s !== "") return "";
    const st = String(s);
    return st.length ? st.charAt(0).toUpperCase() + st.slice(1).toLowerCase() : st;
  };

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/user/all`);
      // res.data expected to be array of users (id, userName, balance, status)
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error(err.response?.data || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Toggle status via backend PUT /user/updatestatus/{id}?status=...
  const toggleStatus = async (id, currentStatus) => {
    const normalized = String(currentStatus ?? "").toLowerCase();
    const newStatus = normalized === "active" ? "inactive" : "active";

    // Prevent double-click while updating
    if (updatingIds.includes(id)) return;
    setUpdatingIds((prev) => [...prev, id]);

    try {
      // controller expects: @PutMapping("/updatestatus/{id}") and @RequestParam String status
      const res = await axios.put(`${API_BASE}/user/updatestatus/${id}`, null, {
        params: { status: newStatus },
      });

      // show backend message (res.data is a string per your service)
      toast.success(res.data);

      // reflect change in UI instantly
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
      );
    } catch (err) {
      console.error("Update status failed:", err);
      toast.error(err.response?.data || "Failed to update status");
    } finally {
      setUpdatingIds((prev) => prev.filter((x) => x !== id));
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="all-users-container">
        <ToastContainer position="top-right" autoClose={1000} />
        <h2 className="page-heading">All Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>User Id</th>
                <th>User Name</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => {
                  // backend status may be "active" (lowercase) — normalize when displaying
                  const displayStatus = formatStatus(user.status);
                  const isActive = String(user.status ?? "").toLowerCase() === "active";
                  const isUpdating = updatingIds.includes(user.id);

                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.userName}</td>
                      <td>₹{Number(user.balance ?? 0).toLocaleString()}</td>
                      <td>
                        <span
                          className={`status-chip ${
                            isActive ? "active" : "inactive"
                          }`}
                        >
                          {displayStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          className={`action-btn ${isActive ? "deactivate" : "activate"}`}
                          onClick={() => toggleStatus(user.id, user.status)}
                          disabled={isUpdating}
                        >
                          {isUpdating
                            ? "Updating..."
                            : isActive
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
