import Sidebar from "../component/sidebar";
import React, { useState, useEffect } from "react"; // Imports can be combined
import "../css/dashboard.css";
function Dashboard() {

    return (
        <>
                <Sidebar />
            <div className="dashboard-page">
                <h2 className="page-title">DashBoard</h2>
                <h3 className="page-subtitle">Welcome back! Here's what's happening with your emails.</h3>
            </div>


        </>

    );
}

export default Dashboard;