import Sidebar from "../component/sidebar";
import React, { useState, useEffect } from "react";
import "../css/dashboard.css";
import emailIcon from "../assets/email.svg";
import emailStatIcon from "../assets/email-1-svgrepo-com.svg";
import clockStatIcon from "../assets/clock-three-svgrepo-com.svg";
import tickStatIcon from "../assets/tick.svg";
import planeStatIcon from "../assets/paper-airplane-svgrepo-com.svg";
import rateStatIcon from "../assets/rate.svg";
import planeCardIcon from "../assets/paper-plane-svgrepo-com-pink.svg"
import peopleCardIcon from "../assets/people-svgrepo-com-pink.svg"
import upCardIcon from "../assets/up-trend-svgrepo-com-pink.svg"
import calenderIcon from "../assets/calender-svgrepo-com.svg"
import pageIcon from "../assets/page.svg"
import rateIcon from "../assets/rate.svg"
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/signup");
                return;
            }

            // Fetch emails data like the working version
            const res = await fetch("http://localhost:8000/api/scheduled", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            });

            if (!res.ok) {
                throw new Error("Unauthorized or server error");
            }

            const data = await res.json();
            setEmails(data);
        } catch (err) {
            setError(err.message);
            setEmails([]);
            setMessage("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);
    const totalSent = emails.filter(email => email.status === "sent").length;
    const scheduled = emails.filter(email => email.status === "scheduled");
    const delivered = emails.filter(email => email.status === "sent").length;
    const recentCampaigns = emails.slice(0, 5); 

    return (
        <>
            <Sidebar />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="dashboard-logo">
                            <img src={emailIcon} alt="dashboard-logo" />
                            <h2>EchoMailer</h2>
                        </div>
                    </div>
                    <button onClick={() => navigate('/compose')} className="new-email-btn">
                        <span className="btn-icon">+</span>
                        New Email
                    </button>
                </div>
                {message && <div className="api-message">✅ {message}</div>}
                {error && <div className="api-error">❌ {error}</div>}

                {loading ? (
                    <div className="loading-state">Loading dashboard...</div>
                ) : (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">
                                        <img src={emailStatIcon} alt="emailStat" />
                                    </div>
                                </div>
                                <div className="stat-number">{emails.length}</div>
                                <div className="stat-title">Total Emails</div>
                                <div className="stat-subtitle">All email campaigns</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">
                                        <img src={clockStatIcon} alt="peopleStat" />
                                    </div>
                                </div>
                                <div className="stat-number">{scheduled.length}</div>
                                <div className="stat-title">Scheduled</div>
                                <div className="stat-subtitle">Pending email campaigns</div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-header">
                                    <div className="stat-icon">
                                        <img src={tickStatIcon} alt="tickStat" />
                                    </div>
                                </div>
                                <div className="stat-number">{delivered}</div>
                                <div className="stat-title">Delivered</div>
                                <div className="stat-subtitle">Successfully delivered</div>
                            </div>

                        </div>

                        <div className="content-grid">
                            <div className="quick-actions-panel">
                                <h2 className="panel-title">
                                    <span className="panel-icon">⚡</span>
                                    Quick Actions & Insights
                                </h2>
                                <div className="insights-stats">
                                    <div className="insight-item">
                                        <div className="insight-icon">
                                            <img src={planeCardIcon} alt="planecard" />
                                        </div>
                                        <div className="insight-number">{scheduled.length}</div>
                                        <div className="insight-label">Active Campaigns</div>
                                    </div>
                                    <div className="insight-item">
                                        <div className="insight-icon">
                                            <img src={peopleCardIcon} alt="peoplecard" />
                                        </div>
                                        <div className="insight-number">8,549</div>
                                        <div className="insight-label">Total Subscribers</div>
                                    </div>
                                    <div className="insight-item">
                                        <div className="insight-icon">
                                            <img src={upCardIcon} alt="upicon" />
                                        </div>
                                        <div className="insight-number">94.2%</div>
                                        <div className="insight-label">This Month</div>
                                    </div>
                                </div>

                                <div className="actions-list">
                                    <div className="action-item">
                                        <div className="action-content">
                                            <div className="action-icon">
                                                <img src={planeStatIcon} alt="" />
                                            </div>
                                            <div className="action-text">
                                                <div className="action-title">Create New Campaign</div>
                                                <div className="action-subtitle">Start a new email marketing campaign</div>
                                            </div>
                                        </div>
                                        <button 
                                            className="action-btn primary"
                                            onClick={() => navigate('/compose')}
                                        >
                                            Start
                                        </button>
                                    </div>

                                    <div className="action-item">
                                        <div className="action-content">
                                            <div className="action-icon">
                                                <img src={calenderIcon} alt="" />
                                            </div>
                                            <div className="action-text">
                                                <div className="action-title">View Scheduled Emails</div>
                                                <div className="action-subtitle">{scheduled.length} emails scheduled</div>
                                            </div>
                                        </div>
                                        <button 
                                            className="action-btn secondary"
                                            onClick={() => navigate('/emails')}
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="campaigns-panel">
                                <div className="panel-header">
                                    <h2 className="panel-title">Recent Email Campaigns</h2>
                                    <span className="panel-count">{recentCampaigns.length} total</span>
                                </div>

                                <div className="campaigns-list">
                                    {recentCampaigns.length > 0 ? (
                                        recentCampaigns.map((campaign, index) => (
                                            <div key={campaign._id || `${campaign.to}-${index}`} className="campaign-item">
                                                <div className="campaign-header">
                                                    <h3 className="campaign-title">{campaign.subject || 'No Subject'}</h3>
                                                    <span className={`status-badge ${campaign.status}`}>{campaign.status}</span>
                                                </div>
                                                <div className="campaign-meta">
                                                    To: {campaign.to} • 
                                                    {campaign.status === 'sent' && ` Sent ${campaign.sentDate || 'Recently'}`}
                                                    {campaign.status === 'scheduled' && ` Scheduled for ${campaign.scheduledDate || 'Soon'}`}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-campaigns">
                                            <p>No campaigns found. Create your first campaign!</p>
                                            <button 
                                                onClick={() => navigate('/compose')}
                                                className="action-btn primary"
                                            >
                                                Create Campaign
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Dashboard;