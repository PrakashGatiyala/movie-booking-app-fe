import { useState } from "react";
import "./user-dashboard.style.css";

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("book-show");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="user-dashboard-container">
      <div className="side-bar">
        <div className="side-bar-item">
          <h6>Booking</h6>
          <ul>
            <li onClick={() => handleTabChange("book-show")}>Book Show</li>
          </ul>
        </div>
        <div className="side-bar-item">
          <h6>Manage Profile</h6>
          <ul>
            <li onClick={() => handleTabChange("profile-details")}>
              Profile Details
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        {selectedTab === "profile-details" && <h1>Profile Details</h1>}
        {selectedTab === "book-show" && <h1>Book Show</h1>}
      </div>
    </div>
  );
};

export default UserDashboard;
