import Sidebar from "../component/sidebar";
import "../css/emails.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailIcon from "../assets/email.svg";
import planeIcon from "../assets/paper-airplane-svgrepo-com.svg";
import filterIcon from "../assets/filter.svg";
import searchIcon from "../assets/search.svg";
import calendarIcon from "../assets/calender-svgrepo-com.svg";
import sortIcon from "../assets/sort.svg";
import deleteIcon from "../assets/delete-2-svgrepo-com.svg";
import pinkTickIcon from "../assets/pink-tick.svg";
import yellowClockIcon from "../assets/yellow-clock.svg";

function Emails() {
    const navigate = useNavigate();
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/signup");
                    return;
                }
                const res = await fetch("http://localhost:8000/api/scheduled", {
                    method: "GET",
                    headers: {
                        Authorization: token,
                    },
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setEmails(data);
                setError("");
            } catch (err) {
                console.error("Error fetching emails:", err);
                setError("Failed to fetch emails. Please check if the server is running.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmails();
    }, [navigate]);

    // 🔥 Frontend-only delete
    const handleDelete = (index) => {
        setEmails((prev) => prev.filter((_, i) => i !== index));
    };

    const filteredEmails = emails.filter((email) => {
        const matchesFilter = selectedFilter === "all" || email.status === selectedFilter;
        const matchesSearch =
            (email.subject && email.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (email.to && email.to.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "sent":
                return "status-badge sent";
            case "scheduled":
                return "status-badge scheduled";
            case "failed":
                return "status-badge failed";
            case "draft":
                return "status-badge draft";
            default:
                return "status-badge";
        }
    };

    const handleCreateNew = () => {
        navigate("/compose");
    };

    return (
        <>
            <Sidebar />
            <div className="emails-page">
                <div className="emails-header">
                    <div className="header-content">
                        <div className="emails-logo">
                            <img src={emailIcon} alt="email-icon" />
                            <h1>Email Campaigns</h1>
                        </div>
                    </div>
                    <button onClick={handleCreateNew} className="new-campaign-btn">
                        <span className="btn-icon">+</span>
                        New Campaign
                    </button>
                </div>

                <div className="emails-controls">
                    <div className="filters-section">
                        <div className="filter-group">
                            <img src={filterIcon} alt="filter" className="filter-icon" />
                            <select
                                className="filter-select"
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                            >
                                <option value="all">All Campaigns</option>
                                <option value="sent">Sent</option>
                                <option value="scheduled">Scheduled</option>
                            </select>
                        </div>

                        <div className="sort-group">
                            <img src={sortIcon} alt="sort" className="sort-icon" />
                            <select
                                className="sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                                <option value="status">Sort by Status</option>
                            </select>
                        </div>
                    </div>

                    <div className="search-section">
                        <div className="search-container">
                            <img src={searchIcon} alt="search" className="search-icon" />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search campaigns..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="campaigns-container">
                    <div className="campaigns-header-row">
                        <h2 className="campaigns-title">Recent Email Campaigns</h2>
                        <span className="campaigns-count">{filteredEmails.length} campaigns</span>
                    </div>

                    {error && (
                        <div
                            className="error-message"
                            style={{
                                background: "#fee",
                                color: "#c33",
                                border: "1px solid #fcc",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                marginBottom: "15px",
                            }}
                        >
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="loading-state">
                            <p>Loading campaigns...</p>
                        </div>
                    ) : (
                        <div className="campaigns-list">
                            {filteredEmails.map((campaign, index) => (
                                <div
                                    key={campaign.to + campaign.subject + index}
                                    className="campaign-card"
                                >
                                    <div className="campaign-main">
                                        <div className="campaign-header">
                                            <h3 className="campaign-title">
                                                {campaign.subject || "No Subject"}
                                            </h3>
                                            <span className={getStatusBadgeClass(campaign.status)}>
                                                {campaign.status === "sent" && (
                                                    <>
                                                        <img
                                                            src={pinkTickIcon}
                                                            alt="sent"
                                                            className="status-icon"
                                                        />
                                                        Sent
                                                    </>
                                                )}
                                                {campaign.status === "scheduled" && (
                                                    <>
                                                        <img
                                                            src={yellowClockIcon}
                                                            alt="scheduled"
                                                            className="status-icon"
                                                        />
                                                        Scheduled
                                                    </>
                                                )}
                                                {campaign.status !== "sent" &&
                                                    campaign.status !== "scheduled" &&
                                                    campaign.status}
                                            </span>
                                        </div>

                                        <div className="campaign-subject">
                                            <strong>Subject:</strong>{" "}
                                            {campaign.subject || "No Subject"}
                                        </div>

                                        <div className="campaign-recipients">
                                            <strong>To:</strong> {campaign.to || "No recipient"}
                                        </div>

                                        <div className="campaign-meta">
                                            {campaign.status === "sent" && (
                                                <>
                                                    <span>
                                                        Sent {campaign.sentDate || "Unknown date"}{" "}
                                                        {campaign.sentTime || ""}
                                                    </span>
                                                    {campaign.opens && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{campaign.opens} opens</span>
                                                        </>
                                                    )}
                                                    {campaign.clicks && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{campaign.clicks} clicks</span>
                                                        </>
                                                    )}
                                                    {campaign.deliveryRate && (
                                                        <>
                                                            <span>•</span>
                                                            <span>
                                                                {campaign.deliveryRate} delivered
                                                            </span>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                            {campaign.status === "scheduled" && (
                                                <>
                                                    <img
                                                        src={calendarIcon}
                                                        alt="calendar"
                                                        className="meta-icon"
                                                    />
                                                    <span>
                                                        Scheduled for{" "}
                                                        {campaign.scheduledDate || "Unknown date"}{" "}
                                                        {campaign.scheduledTime || ""}
                                                    </span>
                                                </>
                                            )}
                                            {campaign.status === "draft" && (
                                                <span>Draft created • Not scheduled</span>
                                            )}
                                            {campaign.status === "failed" && (
                                                <span>
                                                    Failed to send on{" "}
                                                    {campaign.sentDate || "Unknown date"}{" "}
                                                    {campaign.sentTime || ""}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="campaign-actions">
                                        <button
                                            className="action-btn delete-btn"
                                            title="Delete"
                                            onClick={() => handleDelete(index)}
                                        >
                                            <img src={deleteIcon} alt="delete" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !error && filteredEmails.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">📧</div>
                            <h3>No campaigns found</h3>
                            <p>
                                Try adjusting your filters or create a new campaign to get
                                started.
                            </p>
                            <button onClick={handleCreateNew} className="empty-cta-btn">
                                <img src={planeIcon} alt="create" className="btn-icon" />
                                Create New Campaign
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Emails;
