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

function Emails() {
    const navigate = useNavigate();
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

    const emailCampaigns = [
        {
            id: 1,
            title: "Welcome to EchoMailer - Get Started Today",
            recipients: ["new-user@example.com"],
            status: "sent",
            sentDate: "2024-01-08",
            sentTime: "10:30 AM",
            opens: 145,
            clicks: 23,
            deliveryRate: "98.5%",
            subject: "Welcome! Let's get you started with EchoMailer",
            template: "welcome"
        },
        {
            id: 2,
            title: "Weekly Newsletter - Product Updates",
            recipients: ["newsletter@example.com"],
            status: "scheduled",
            scheduledDate: "2024-01-09",
            scheduledTime: "9:00 AM",
            subject: "This week's product updates and features",
            template: "newsletter"
        },
        {
            id: 3,
            title: "Special Offer - 50% Off Premium Features",
            recipients: ["marketing@example.com", "promo@example.com"],
            status: "sent",
            sentDate: "2024-01-07",
            sentTime: "2:15 PM",
            opens: 89,
            clicks: 34,
            deliveryRate: "97.2%",
            subject: "Limited time: 50% off all premium features!",
            template: "promotional"
        },
        {
            id: 4,
            title: "Account Security Update Required",
            recipients: ["security@example.com"],
            status: "failed",
            sentDate: "2024-01-07",
            sentTime: "11:45 AM",
            subject: "Important: Security update required for your account",
            template: "security"
        },
        {
            id: 5,
            title: "Monthly Report - December Analytics",
            recipients: ["reports@example.com", "analytics@example.com"],
            status: "sent",
            sentDate: "2024-01-06",
            sentTime: "5:00 AM",
            opens: 67,
            clicks: 12,
            deliveryRate: "99.1%",
            subject: "Your December analytics report is ready",
            template: "report"
        },
        {
            id: 6,
            title: "Holiday Greetings from EchoMailer Team",
            recipients: ["all-users@example.com"],
            status: "draft",
            subject: "Happy holidays from all of us at EchoMailer!",
            template: "announcement"
        },
        {
            id: 7,
            title: "Product Launch - New Dashboard Features",
            recipients: ["beta-users@example.com"],
            status: "sent",
            sentDate: "2024-01-05",
            sentTime: "3:30 PM",
            opens: 234,
            clicks: 67,
            deliveryRate: "96.8%",
            subject: "Exciting new dashboard features are here!",
            template: "announcement"
        },
        {
            id: 8,
            title: "Customer Feedback Survey",
            recipients: ["customers@example.com"],
            status: "scheduled",
            scheduledDate: "2024-01-10",
            scheduledTime: "11:00 AM",
            subject: "Help us improve - 2 minute feedback survey",
            template: "survey"
        }
    ];

    const filteredEmails = emailCampaigns.filter(email => {
        const matchesFilter = selectedFilter === 'all' || email.status === selectedFilter;
        const matchesSearch = email.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            email.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'sent': return 'status-badge sent';
            case 'scheduled': return 'status-badge scheduled';
            case 'failed': return 'status-badge failed';
            case 'draft': return 'status-badge draft';
            default: return 'status-badge';
        }
    };

    const handleCreateNew = () => {
        navigate('/compose');
    };

    return (
        <>
            <Sidebar />
            <div className="emails-page">
                {/* Header */}
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

                {/* Filters and Search */}
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
                                <option value="draft">Draft</option>
                                <option value="failed">Failed</option>
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

                {/* Campaign List */}
                <div className="campaigns-container">
                    <div className="campaigns-header-row">
                        <h2 className="campaigns-title">Recent Email Campaigns</h2>
                        <span className="campaigns-count">{filteredEmails.length} campaigns</span>
                    </div>

                    <div className="campaigns-list">
                        {filteredEmails.map((campaign) => (
                            <div key={campaign.id} className="campaign-card">
                                <div className="campaign-main">
                                    <div className="campaign-header">
                                        <h3 className="campaign-title">{campaign.title}</h3>
                                        <span className={getStatusBadgeClass(campaign.status)}>
                                            {campaign.status}
                                        </span>
                                    </div>
                                    
                                    <div className="campaign-subject">
                                        <strong>Subject:</strong> {campaign.subject}
                                    </div>
                                    
                                    <div className="campaign-recipients">
                                        <strong>To:</strong> {campaign.recipients.join(', ')}
                                    </div>
                                    
                                    <div className="campaign-meta">
                                        {campaign.status === 'sent' && (
                                            <>
                                                <span>Sent {campaign.sentDate} {campaign.sentTime}</span>
                                                <span>•</span>
                                                <span>{campaign.opens} opens</span>
                                                <span>•</span>
                                                <span>{campaign.clicks} clicks</span>
                                                <span>•</span>
                                                <span>{campaign.deliveryRate} delivered</span>
                                            </>
                                        )}
                                        {campaign.status === 'scheduled' && (
                                            <>
                                                <img src={calendarIcon} alt="calendar" className="meta-icon" />
                                                <span>Scheduled for {campaign.scheduledDate} {campaign.scheduledTime}</span>
                                            </>
                                        )}
                                        {campaign.status === 'draft' && (
                                            <span>Draft created • Not scheduled</span>
                                        )}
                                        {campaign.status === 'failed' && (
                                            <span>Failed to send on {campaign.sentDate} {campaign.sentTime}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="campaign-actions">
                                    <button className="action-btn view-btn" title="View">
                                        👁️
                                    </button>
                                    <button className="action-btn edit-btn" title="Edit">
                                        ✏️
                                    </button>
                                    <button className="action-btn duplicate-btn" title="Duplicate">
                                        📋
                                    </button>
                                    {campaign.status === 'scheduled' && (
                                        <button className="action-btn cancel-btn" title="Cancel">
                                            ❌
                                        </button>
                                    )}
                                    {campaign.status === 'draft' && (
                                        <button className="action-btn send-btn" title="Send Now">
                                            <img src={planeIcon} alt="send" className="send-icon" />
                                        </button>
                                    )}
                                    <button className="action-btn delete-btn" title="Delete">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredEmails.length === 0 && (
                        <div className="empty-state">
                            <div className="empty-icon">📧</div>
                            <h3>No campaigns found</h3>
                            <p>Try adjusting your filters or create a new campaign to get started.</p>
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