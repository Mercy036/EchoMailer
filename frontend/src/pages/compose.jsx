import Sidebar from "../component/sidebar";
import "../css/compose.css";
import React, { useEffect, useState } from "react";
import emailIcon from "../assets/email.svg";
import planeIcon from "../assets/paper-airplane-svgrepo-com.svg";
import clockScheduleIcon from "../assets/clock-three-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";

function Compose() {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [emailContent, setEmailContent] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [scheduleFor, setScheduleFor] = useState('now');
    const [scheduleDate, setScheduleDate] = useState('');
    const [scheduleTime, setScheduleTime] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/signup");
    }, [navigate]);

    // Validation function
    const validateForm = () => {
        const userEmail = localStorage.getItem("email");
        if (!userEmail) {
            setErrorMessage('Sender email not found. Please log in again.');
            return false;
        }
        if (!recipients.trim()) {
            setErrorMessage('Recipients field is required');
            return false;
        }
        if (!subject.trim()) {
            setErrorMessage('Subject field is required');
            return false;
        }
        if (!emailContent.trim()) {
            setErrorMessage('Email content is required');
            return false;
        }
        
        // Validate email format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const recipientsList = recipients.split(',').map(email => email.trim());
        for (const email of recipientsList) {
            if (email && !emailPattern.test(email)) {
                setErrorMessage(`Invalid email format: ${email}`);
                return false;
            }
        }

        // If scheduling for later, validate date and time
        if (scheduleFor === 'later') {
            if (!scheduleDate) {
                setErrorMessage('Schedule date is required');
                return false;
            }
            if (!scheduleTime) {
                setErrorMessage('Schedule time is required');
                return false;
            }
            
            // Check if scheduled time is in the future
            const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
            const now = new Date();
            if (scheduledDateTime <= now) {
                setErrorMessage('Scheduled time must be in the future');
                return false;
            }
        }

        return true;
    };

    const handleSend = async () => {
        // Clear previous messages
        setErrorMessage('');
        setSuccessMessage('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        const userEmail = localStorage.getItem("email");
        const formData = {
            from: userEmail, // Add the from field
            to: recipients.trim(),
            subject: subject.trim(),
            message: emailContent.trim(),
        };

        // Only add template if one is selected
        if (selectedTemplate) {
            formData.template = selectedTemplate;
        }

        // Only add scheduled time if scheduling for later
        if (scheduleFor === "later") {
            formData.scheduledTime = `${scheduleDate}T${scheduleTime}`;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setErrorMessage('Authentication token not found. Please log in again.');
                navigate("/signup");
                return;
            }

            console.log('Sending email with data:', formData); 

            const response = await fetch("http://localhost:8000/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("Compose result:", result);

            if (response.ok) {

                setRecipients('');
                setSubject('');
                setEmailContent('');
                setSelectedTemplate('');
                setScheduleFor('now');
                setScheduleDate('');
                setScheduleTime('');
            } else {
                setErrorMessage(result.message || 'Failed to send email');
            }
        } catch (error) {
            console.error("Error sending email:", error);
            setErrorMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };


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
                        {/* Error and Success Messages */}
                        {errorMessage && (
                            <div className="message error-message">
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className="message success-message">
                                {successMessage}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Recipients *</label>
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
                            <label className="form-label">Subject *</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter email subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Content *</label>
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
                                <option value="">Choose a template (optional)</option>
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
                                        min={new Date().toISOString().split('T')[0]}
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
                        
                        <button 
                            className="send-btn" 
                            onClick={handleSend}
                            disabled={isLoading}
                        >
                            <img src={planeIcon} alt="send" className="send-icon" />
                            {isLoading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Compose;