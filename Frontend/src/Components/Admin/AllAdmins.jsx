import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AllAdmins.css";
import AdminNavbar from "./AdminNavbar";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch admin list from backend
  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8081/admin/all");
      setAdmins(res.data || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Failed to fetch admins!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Toggle status of admin
  const toggleStatus = async (aId, aStatus) => {
    try {
      const newStatus = aStatus === "Active" ? "Inactive" : "Active";
      const res = await axios.put(
        `http://localhost:8081/admin/updatestatus/${aId}?aStatus=${newStatus}`
      );
      toast.success(res.data); // backend success message

      // Update frontend state after success
      setAdmins((prev) =>
        prev.map((admin) =>
          admin.aId === aId ? { ...admin, aStatus: newStatus } : admin
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status!");
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="all-admins-container">
        <h2 className="table-title">All Admins</h2>

        {loading ? (
          <p>Loading admins...</p>
        ) : (
          <table className="admins-table">
            <thead>
              <tr>
                <th>Admin ID</th>
                <th>Username</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <tr
                    key={admin.aId}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                  >
                    <td>{admin.aId}</td>
                    <td>{admin.aUsername}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          admin.aStatus === "Active" ? "active" : "inactive"
                        }`}
                      >
                        {admin.aStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`action-btn ${admin.aStatus === "Active" ? "deactivate" : "activate"}`}
                        onClick={() => toggleStatus(admin.aId, admin.aStatus)}
                      >
                        {admin.aStatus === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No admins found.
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

export default AllAdmins;
