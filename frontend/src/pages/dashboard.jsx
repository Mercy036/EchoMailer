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
function Dashboard() {
    return (
        <>            <Sidebar />
            <div className="dashboard-page">
                <div className="dashboard-header">
                    <div className="header-content">
                        <div className="dashboard-logo">
                            <img src={emailIcon} alt="dashboard-logo" />
                            <h2>EchoMailer</h2>
                        </div>
                        
                    </div>
                    <button className="new-email-btn">
                        <span className="btn-icon">+</span>
                        New Email
                    </button>
                </div>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon">
                                <img src={emailStatIcon} alt="emailStat" />
                            </div>
                            <span className="stat-change positive">+12%</span>
                        </div>
                        <div className="stat-number">2,847</div>
                        <div className="stat-title">Total Emails</div>
                        <div className="stat-subtitle">Emails sent this month</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon">
                                <img src={clockStatIcon} alt="peopleStat" />
                            </div>
                            <span className="stat-change positive">+6%</span>
                        </div>
                        <div className="stat-number">156</div>
                        <div className="stat-title">Scheduled</div>
                        <div className="stat-subtitle">Pending email campaigns</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon">
                                <img src={tickStatIcon} alt="tickStat" />
                            </div>
                            <span className="stat-change positive">+15%</span>
                        </div>
                        <div className="stat-number">2,691</div>
                        <div className="stat-title">Delivered</div>
                        <div className="stat-subtitle">Successfully delivered</div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-header">
                            <div className="stat-icon">
                                <img src={rateStatIcon} alt="rateStat" />
                            </div>
                            <span className="stat-change positive">+2.4%</span>
                        </div>
                        <div className="stat-number">68.2%</div>
                        <div className="stat-title">Open Rate</div>
                        <div className="stat-subtitle">Average open rate</div>
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
                                <div className="insight-number">12</div>
                                <div className="insight-label">Active Campaigns</div>
                            </div>
                            <div className="insight-item">
                                <div className="insight-icon">
                                    <img src={peopleCardIcon} alt="peoplecard" /></div>
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
                                <button className="action-btn primary">Start</button>
                            </div>

                            <div className="action-item">
                                <div className="action-content">
                                    <div className="action-icon">
                                        <img src={calenderIcon} alt="" />
                                    </div>
                                    <div className="action-text">
                                        <div className="action-title">Schedule Newsletter</div>
                                        <div className="action-subtitle">Weekly newsletter ready to send</div>
                                    </div>
                                </div>
                                <div className="action-buttons">
                                    <span className="urgent-badge">Urgent</span>
                                    <button className="action-btn secondary">View</button>
                                </div>
                            </div>

                            <div className="action-item">
                                <div className="action-content">
                                    <div className="action-icon">
                                        <img src={pageIcon} alt="" />
                                    </div>
                                    <div className="action-text">
                                        <div className="action-title">Review Templates</div>
                                        <div className="action-subtitle">3 new templates available</div>
                                    </div>
                                </div>
                                <button className="action-btn secondary">View</button>
                            </div>

                            <div className="action-item">
                                <div className="action-content">
                                    <div className="action-icon">
                                        <img src={rateIcon} alt="" />
                                    </div>
                                    <div className="action-text">
                                        <div className="action-title">Check Analytics</div>
                                        <div className="action-subtitle">View detailed performance metrics</div>
                                    </div>
                                </div>
                                <button className="action-btn secondary">View</button>
                            </div>
                        </div>
                    </div>
                    <div className="campaigns-panel">
                        <div className="panel-header">
                            <h2 className="panel-title">Recent Email Campaigns</h2>
                            <span className="panel-count">5 total</span>
                        </div>

                        <div className="campaigns-list">
                            <div className="campaign-item">
                                <div className="campaign-header">
                                    <h3 className="campaign-title">Welcome to EchoMailer - Get Started Today</h3>
                                    <span className="status-badge sent">Sent</span>
                                </div>
                                <div className="campaign-meta">
                                    To: new-user@example.com • Sent 2024-01-08 10:30 AM • 145 opens • 23 clicks
                                </div>
                                <div className="campaign-actions">
                                    <button className="action-icon-btn">👁️</button>
                                    <button className="action-icon-btn">✏️</button>
                                    <button className="action-icon-btn">🗑️</button>
                                </div>
                            </div>
                            <div className="campaign-item">
                                <div className="campaign-header">
                                    <h3 className="campaign-title">Weekly Newsletter - Product Updates</h3>
                                    <span className="status-badge scheduled">Scheduled</span>
                                </div>
                                <div className="campaign-meta">
                                    To: newsletter@example.com • Scheduled for 2024-01-09 9:00 AM
                                </div>
                                <div className="campaign-actions">
                                    <button className="action-icon-btn">👁️</button>
                                    <button className="action-icon-btn">✏️</button>
                                    <button className="action-icon-btn">🗑️</button>
                                </div>
                            </div>

                            <div className="campaign-item">
                                <div className="campaign-header">
                                    <h3 className="campaign-title">Special Offer - 50% Off Premium Features</h3>
                                    <span className="status-badge sent">Sent</span>
                                </div>
                                <div className="campaign-meta">
                                    To: marketing@example.com • Sent 2024-01-07 2:15 PM • 89 opens • 34 clicks
                                </div>
                                <div className="campaign-actions">
                                    <button className="action-icon-btn">👁️</button>
                                    <button className="action-icon-btn">✏️</button>
                                    <button className="action-icon-btn">🗑️</button>
                                </div>
                            </div>

                            <div className="campaign-item">
                                <div className="campaign-header">
                                    <h3 className="campaign-title">Account Security Update Required</h3>
                                    <span className="status-badge failed">Failed</span>
                                </div>
                                <div className="campaign-meta">
                                    To: security@example.com • Sent 2024-01-07 11:45 AM
                                </div>
                                <div className="campaign-actions">
                                    <button className="action-icon-btn">👁️</button>
                                    <button className="action-icon-btn">✏️</button>
                                    <button className="action-icon-btn">🗑️</button>
                                </div>
                            </div>

                            <div className="campaign-item">
                                <div className="campaign-header">
                                    <h3 className="campaign-title">Monthly Report - December Analytics</h3>
                                    <span className="status-badge sent">Sent</span>
                                </div>
                                <div className="campaign-meta">
                                    To: reports@example.com • Sent 2024-01-06 5:00 AM • 67 opens • 12 clicks
                                </div>
                                <div className="campaign-actions">
                                    <button className="action-icon-btn">👁️</button>
                                    <button className="action-icon-btn">✏️</button>
                                    <button className="action-icon-btn">🗑️</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;