import { useState } from "react";
import "./admin-dashboard.style.css";
// Tabs
import CreateTheatre from "./components/admin/create-theatre";
import CreateMovie from "./components/admin/create-movie";
import CreateTheatreHall from "./components/admin/create-theatre-hall";
import CreateShow from "./components/admin/create-show";
/* Admin can create theatre/movies/ mapping */
const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("create-theatre");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <div className="admin-dashboard-container">
      <div className="side-bar">
        <div className="side-bar-item">
          <h6>Create</h6>
          <ul>
            <li onClick={() => handleTabChange("create-theatre")}>Theatre</li>
            <li onClick={() => handleTabChange("create-theatre-halls")}>
              Theatre Halls
            </li>
            <li onClick={() => handleTabChange("create-movies")}>Movies</li>
          </ul>
        </div>
        <div className="side-bar-item">
          <h6>Manage</h6>
          <ul>
            <li onClick={() => handleTabChange("create-show")}>Create Show</li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        {selectedTab === "create-theatre" && <CreateTheatre />}
        {selectedTab === "create-theatre-halls" && <CreateTheatreHall />}
        {selectedTab === "create-movies" && <CreateMovie />}
        {selectedTab === "create-show" && <CreateShow />}
      </div>
    </div>
  );
};

export default AdminDashboard;
