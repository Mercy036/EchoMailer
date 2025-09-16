import Sidebar from "../component/sidebar";
import "../css/compose.css";
import React, { useEffect, useState } from "react";
import emailIcon from "../assets/email.svg";
import planeIcon from "../assets/paper-airplane-svgrepo-com.svg";
import clockScheduleIcon from "../assets/clock-three-svgrepo-com.svg";

function Compose() {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [scheduleFor, setScheduleFor] = useState('now');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');

    const handleSend = () => {
        console.log('Sending email...', {
            recipients,
            subject,
            emailContent,
            selectedTemplate,
            scheduleFor,
            scheduleDate,
            scheduleTime
        });
    };

    const recipientCount = recipients.split(',').filter(email => email.trim()).length || 0;
    const characterCount = emailContent.length;
    const wordCount = emailContent.trim() ? emailContent.trim().split(/\s+/).length : 0;

    return (
        <>
            <Sidebar />
            <div className="compose-page">
                <div className="compose-header">
                    <div className="header-content">
                        <div className="compose-logo">
                            <img src={planeIcon} alt="compose-icon" />
                            <h1>Compose New Email</h1>
                        </div>
                    </div>
                </div>

                <div className="compose-content">
                    <div className="compose-main">
                        <div className="form-group">
                            <label className="form-label">Recipients</label>
                            <div className="input-container">
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter email addresses separated by commas"
                                    value={recipients}
                                    onChange={(e) => setRecipients(e.target.value)}
                                />
                                <button className="add-recipient-btn">+</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter email subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Content</label>
                            <textarea
                                className="form-textarea"
                                placeholder="Write your email content here..."
                                value={emailContent}
                                onChange={(e) => setEmailContent(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="compose-sidebar">
                        <div className="sidebar-panel TEMPLATE">
                            <h3 className="panel-title TEMPLATE">Template</h3>
                            <select
                                className="template-select"
                                value={selectedTemplate}
                                onChange={(e) => setSelectedTemplate(e.target.value)}
                            >
                                <option value="">Choose a template</option>
                                <option value="welcome">Welcome Email</option>
                                <option value="newsletter">Newsletter</option>
                                <option value="promotional">Promotional</option>
                                <option value="announcement">Announcement</option>
                            </select>
                        </div>
                        <div className={`sidebar-panel SCHEDULE ${scheduleFor === 'now' ? 'collapsed' : ''}`}>
                            <div className="panel-header">
                                <div className="schedule-icon">
                                    <img src={clockScheduleIcon} alt="" />
                                </div>
                                <h3 className="panel-title SCHEDULE">Schedule</h3>
                            </div>
                            
                            <div className={`schedule-options ${scheduleFor === 'now' ? 'small' : ''}`}>
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="now"
                                        checked={scheduleFor === 'now'}
                                        onChange={(e) => setScheduleFor(e.target.value)}
                                        onClick={()=>{}}
                                    />
                                    <span className="radio-text">Send now</span>
                                </label>
                                
                                <label className="radio-option">
                                    <input
                                        type="radio"
                                        name="schedule"
                                        value="later"
                                        checked={scheduleFor === 'later'}
                                        onChange={(e) => setScheduleFor(e.target.value)}
                                    />
                                    <span className="radio-text">Schedule for later</span>
                                </label>
                            </div>

                            {scheduleFor === 'later' && (
                                <div className="schedule-inputs">
                                    <input
                                        type="date"
                                        className="schedule-input"
                                        value={scheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                    />
                                    <input
                                        type="time"
                                        className="schedule-input"
                                        value={scheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                        <button className="send-btn" onClick={handleSend}>
                            <img src={planeIcon} alt="send" className="send-icon" />
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Compose;