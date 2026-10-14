import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5002";

const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

export default function EmployeeProfile({ currentUser, employeeProfile }) {
    const [personalInfo, setPersonalInfo] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);
    const [profile, setProfile] = useState(null);
    const [employmentInfo, setEmploymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!currentUser?.id) {
            setLoading(false);
            return;
        }

        const load = async (path) => {
            const response = await fetch(`${API_BASE}/api/employee/${path}/${currentUser.id}`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to load data");
            return data;
        };

        (async () => {
            try {
                setLoading(true);
                setError("");
                const [personal, contact, prof, employment] = await Promise.all([
                    load("personal-info"),
                    load("contact-info"),
                    load("profile"),
                    load("employment-info"),
                ]);
                setPersonalInfo(personal);
                setContactInfo(contact);
                setProfile(prof);
                setEmploymentInfo(employment);
            } catch (err) {
                setError(err.message || "Unable to load personal information");
            } finally {
                setLoading(false);
            }
        })();
    }, [currentUser?.id]);

    const fullName = personalInfo
        ? [personalInfo.first_name, personalInfo.middle_name, personalInfo.last_name].filter(Boolean).join(" ")
        : [employeeProfile?.first_name, employeeProfile?.middle_name, employeeProfile?.last_name].filter(Boolean).join(" ");
    const displayName = personalInfo?.preferred_name || fullName || employeeProfile?.preferred_name || employeeProfile?.first_name || currentUser?.email?.split("@")[0] || "Employee";
    const bannerInitials = (displayName.split(" ").map(w => w[0]).join("").slice(0, 2) || "EM").toUpperCase();
    const location = (contactInfo
        ? [contactInfo.current_city, contactInfo.current_state, contactInfo.current_country].filter(Boolean).join(", ")
        : (employeeProfile?.city || employeeProfile?.location || "")) || "Nagpur";
    const personalItems = [
        { label: "Full Name", value: fullName || "Devashish Ahire" },
        { label: "Employee ID", value: profile?.employee_code || employeeProfile?.employee_code || "EMP-1360" },
        { label: "Email", value: contactInfo?.work_email || profile?.email || currentUser?.email || "dev@ramel.co.in" },
        { label: "Phone", value: contactInfo?.phone_number || "+91 98765 43210" },
        { label: "Date of Birth", value: personalInfo?.date_of_birth ? formatDate(personalInfo.date_of_birth) : "15 August 1993" },
        { label: "Location", value: location },
    ];

    const employmentItems = [
        { label: "Department", value: employmentInfo?.department || employeeProfile?.department || "Engineering" },
        { label: "Team", value: employmentInfo?.team || employeeProfile?.team || "Backend" },
        { label: "Designation", value: employmentInfo?.designation || employeeProfile?.designation || "Senior Software Engineer" },
        { label: "Manager", value: employmentInfo?.reporting_manager || "Maruthi Vara Prasad" },
        { label: "Joining Date", value: (employmentInfo?.joining_date || employeeProfile?.joining_date) ? formatDate(employmentInfo?.joining_date || employeeProfile?.joining_date) : "5 August 2025" },
        { label: "Employment Type", value: employmentInfo?.employment_type || employeeProfile?.employment_type || "Permanent" },
        { label: "Work Mode", value: employmentInfo?.work_mode || employeeProfile?.work_mode || "Hybrid" },
        { label: "Location", value: employmentInfo?.office_location || employeeProfile?.city || employeeProfile?.location || "Nagpur" },
    ];

  return (
    <>
<div className="px-0 px-md-5 employee-dashboard">

                <div className="employee-profile-page">

                    
                    <div className="esc-page-header">
                        <div>
                            <h2 className="esc-page-title">Employee Profile</h2>
                            <p className="esc-page-subtitle">
                                Manage employee details, records and essential information from one place.
                            </p>
                        </div>

                        <div>
                            <button type="button" className="epd-upload-btn" id="epdHeaderUploadBtn">
                                <i className="bi bi-cloud-arrow-up"></i>
                                Export
                            </button>
                        </div>
                    </div>

                    
                    <div className="esc-employee-bar">

                        <div className="esc-employee-main">

                            <div className="esc-avatar">
                                {bannerInitials}
                            </div>

                            <div className="esc-employee-info">
                                <div className="esc-name-row">
                                    <h3>{displayName}</h3>
                                    <span className="esc-status-badge">
                                        <span></span>
                                        Active
                                    </span>
                                </div>

                                <p>{employmentInfo?.designation || profile?.designation || employeeProfile?.designation || "Employee"}</p>

                                <div className="esc-employee-meta">
                                    <span>
                                        <i className="bi bi-diagram-3"></i>
                                        {employmentInfo?.department || profile?.department || employeeProfile?.department || "Engineering"}
                                    </span>

                                    <span>
                                        <i className="bi bi-code-slash"></i>
                                        {employmentInfo?.team || profile?.team || employeeProfile?.team || "Backend"}
                                    </span>

                                    <span>
                                        <i className="bi bi-person-badge"></i>
                                        {profile?.employee_code || employeeProfile?.employee_code || "—"}
                                    </span>
                                </div>
                            </div>

                        </div>

                        <div className="esc-employee-side">
                            <span className="esc-side-label">Profile Area</span>
                            <strong>Employee Profile</strong>
                        </div>

                    </div>


                    
                    <section className="ep-profile-tabs-wrapper">

                        <div className="ep-profile-tabs">

                            <button type="button" className="ep-profile-tab active" data-profile-tab="overview">
                                <i className="bi bi-grid-1x2"></i>
                                Overview
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="employment">
                                <i className="bi bi-briefcase"></i>
                                Employment
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="documents">
                                <i className="bi bi-folder2"></i>
                                Documents
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="skills">
                                <i className="bi bi-stars"></i>
                                Skills
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="attendance">
                                <i className="bi bi-calendar-check"></i>
                                Attendance
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="leave">
                                <i className="bi bi-calendar2-minus"></i>
                                Leave
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="assets">
                                <i className="bi bi-laptop"></i>
                                Assets
                            </button>

                            <button type="button" className="ep-profile-tab" data-profile-tab="access">
                                <i className="bi bi-shield-lock"></i>
                                Access
                            </button>

                        </div>

                    </section>


                    
                    <section className="ep-profile-content" id="profileOverview">

                        <div className="row g-4">

                            
                            <div className="col-xl-8">

                                
                                <div className="ep-info-card">

                                    <div className="ep-card-heading common-card-heading">

                                        <div className="ep-card-heading-left">

                                            <div className="ep-card-icon ep-icon-purple">
                                                <i className="bi bi-person"></i>
                                            </div>

                                            <div>
                                                <h3>Personal Information</h3>
                                                <p>Basic personal details of the employee.</p>
                                            </div>

                                        </div>

                                    </div>


                                    {error && <p className="text-danger px-3">{error}</p>}

                                    <div className="row g-0 ep-information-grid">

                                        {personalItems.map((item) => (
                                            <div className="col-md-6 ep-information-item" key={item.label}>
                                                <span>{item.label}</span>
                                                <strong>{loading ? "Loading..." : item.value || "-"}</strong>
                                            </div>
                                        ))}

                                    </div>

                                </div>


                                
                                <div className="ep-info-card">

                                    <div className="ep-card-heading common-card-heading">

                                        <div className="ep-card-heading-left">

                                            <div className="ep-card-icon ep-icon-blue">
                                                <i className="bi bi-briefcase"></i>
                                            </div>

                                            <div>
                                                <h3>Employment</h3>
                                                <p>Current organizational and employment details.</p>
                                            </div>

                                        </div>
                                    </div>


                                    <div className="row g-0 ep-information-grid">

                                        {employmentItems.map((item) => (
                                            <div className="col-md-6 ep-information-item" key={item.label}>
                                                <span>{item.label}</span>
                                                <strong>{loading ? "Loading..." : item.value || "-"}</strong>
                                            </div>
                                        ))}

                                    </div>

                                </div>


                                
                                <div className="ep-info-card">

                                    <div className="ep-card-heading common-card-heading">

                                        <div className="ep-card-heading-left">

                                            <div className="ep-card-icon ep-icon-orange">
                                                <i className="bi bi-lightning"></i>
                                            </div>

                                            <div>
                                                <h3>Quick Information</h3>
                                                <p>Important information at a glance.</p>
                                            </div>

                                        </div>

                                    </div>


                                    <div className="row g-3">

                                        
                                        <div className="col-md-6">

                                            <div className="ep-quick-card">

                                                <div className="ep-quick-icon ep-quick-purple">
                                                    <i className="bi bi-kanban"></i>
                                                </div>

                                                <div>
                                                    <span>Current Project</span>
                                                    <strong>HRM Portal</strong>
                                                </div>

                                                <i className="bi bi-chevron-right ep-quick-arrow"></i>

                                            </div>

                                        </div>


                                        
                                        <div className="col-md-6">

                                            <div className="ep-quick-card">

                                                <div className="ep-quick-icon ep-quick-blue">
                                                    <i className="bi bi-stars"></i>
                                                </div>

                                                <div>
                                                    <span>Skills</span>

                                                    <strong className="ep-skill-preview">
                                                        React ┬╖ Laravel ┬╖ MySQL
                                                    </strong>
                                                </div>

                                                <i className="bi bi-chevron-right ep-quick-arrow"></i>

                                            </div>

                                        </div>


                                        
                                        <div className="col-md-6">

                                            <div className="ep-quick-card">

                                                <div className="ep-quick-icon ep-quick-orange">
                                                    <i className="bi bi-hourglass-split"></i>
                                                </div>

                                                <div>
                                                    <span>Probation Status</span>
                                                    <strong className="ep-success-text">
                                                        Confirmed
                                                    </strong>
                                                </div>

                                                <i className="bi bi-chevron-right ep-quick-arrow"></i>

                                            </div>

                                        </div>


                                        
                                        <div className="col-md-6">

                                            <div className="ep-quick-card">

                                                <div className="ep-quick-icon ep-quick-pink">
                                                    <i className="bi bi-calendar2-check"></i>
                                                </div>

                                                <div>
                                                    <span>Leave Balance</span>
                                                    <strong>14 Days</strong>
                                                </div>

                                                <i className="bi bi-chevron-right ep-quick-arrow"></i>

                                            </div>

                                        </div>


                                        
                                        <div className="col-md-6">

                                            <div className="ep-quick-card">

                                                <div className="ep-quick-icon ep-quick-green">
                                                    <i className="bi bi-laptop"></i>
                                                </div>

                                                <div>
                                                    <span>Assigned Assets</span>
                                                    <strong>4 Assets</strong>
                                                </div>

                                                <i className="bi bi-chevron-right ep-quick-arrow"></i>

                                            </div>

                                        </div>


                                        
                                        <div className="col-md-6">

                                            <div className="ep-quick-card">

                                                <div className="ep-quick-icon ep-quick-red">
                                                    <i className="bi bi-person-badge"></i>
                                                </div>

                                                <div>
                                                    <span>HR Manager</span>
                                                    <strong>Anita Rao</strong>
                                                </div>

                                                <i className="bi bi-chevron-right ep-quick-arrow"></i>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            
                            <div className="col-xl-4">

                                
                                <div className="ep-side-card ep-completion-card">

                                    <div className="ep-side-heading common-card-heading">

                                        <div>
                                            <span>PROFILE STATUS</span>
                                            <h3>Profile Completion</h3>
                                        </div>

                                        <div className="ep-completion-percentage">
                                            92%
                                        </div>

                                    </div>


                                    <div className="ep-completion-bar">
                                        <span style={{width: "92%"}}></span>
                                    </div>


                                    <p>
                                        Your employee profile is almost complete.
                                        Add the remaining information to reach 100%.
                                    </p>


                                    <div className="ep-completion-list">

                                        <div className="ep-completion-item completed">
                                            <i className="bi bi-check-circle-fill"></i>
                                            Personal information
                                        </div>

                                        <div className="ep-completion-item completed">
                                            <i className="bi bi-check-circle-fill"></i>
                                            Employment details
                                        </div>

                                        <div className="ep-completion-item completed">
                                            <i className="bi bi-check-circle-fill"></i>
                                            Contact information
                                        </div>

                                        <div className="ep-completion-item completed">
                                            <i className="bi bi-check-circle-fill"></i>
                                            Emergency contact
                                        </div>

                                        <div className="ep-completion-item pending">
                                            <i className="bi bi-clock-fill text-danger"></i>
                                            Documents
                                        </div>

                                    </div>

                                    <button type="button" className="btn ep-complete-profile-btn">
                                        Complete Profile
                                        <i className="bi bi-arrow-right"></i>
                                    </button>

                                </div>


                                
                                <div className="ep-side-card">

                                    <div className="ep-side-heading common-card-heading">

                                        <div>
                                            <span>REPORTING STRUCTURE</span>
                                            <h3>People</h3>
                                        </div>

                                        <i className="bi bi-diagram-3 ep-side-heading-icon"></i>

                                    </div>


                                    
                                    <div className="ep-person-card">

                                        <div className="ep-person-avatar ep-avatar-blue">
                                            MVP
                                        </div>

                                        <div className="ep-person-info">
                                            <span>Reporting Manager</span>
                                            <strong>Maruthi Vara Prasad</strong>
                                            <small>Engineering Manager</small>
                                        </div>

                                        <button type="button">
                                            <i className="bi bi-chevron-right"></i>
                                        </button>

                                    </div>


                                    
                                    {/* <div className="ep-person-card">

                                        <div className="ep-person-avatar ep-avatar-pink">
                                            AR
                                        </div>

                                        <div className="ep-person-info">
                                            <span>HR Manager</span>
                                            <strong>Anita Rao</strong>
                                            <small>Human Resources</small>
                                        </div>

                                        <button type="button">
                                            <i className="bi bi-chevron-right"></i>
                                        </button>

                                    </div> */}

                                </div>


                                
                                <div className="ep-side-card">

                                    <div className="ep-side-heading common-card-heading">

                                        <div>
                                            <span>RECENT ACTIVITY</span>
                                            <h3>Latest Updates</h3>
                                        </div>

                                        <i className="bi bi-clock-history ep-side-heading-icon"></i>

                                    </div>


                                    <div className="ep-activity-list">

                                        <div className="ep-activity-item">

                                            <div className="ep-activity-icon ep-activity-purple">
                                                <i className="bi bi-pencil"></i>
                                            </div>

                                            <div>
                                                <strong>Profile updated</strong>
                                                <span>Today, 10:42 AM</span>
                                            </div>

                                        </div>


                                        <div className="ep-activity-item">

                                            <div className="ep-activity-icon ep-activity-blue">
                                                <i className="bi bi-laptop"></i>
                                            </div>

                                            <div>
                                                <strong>Laptop assigned</strong>
                                                <span>Yesterday, 04:15 PM</span>
                                            </div>

                                        </div>


                                        <div className="ep-activity-item">

                                            <div className="ep-activity-icon ep-activity-green">
                                                <i className="bi bi-check2-circle"></i>
                                            </div>

                                            <div>
                                                <strong>Profile verified</strong>
                                                <span>12 Sep 2026</span>
                                            </div>

                                        </div>


                                        <div className="ep-activity-item">

                                            <div className="ep-activity-icon ep-activity-orange">
                                                <i className="bi bi-arrow-up-right"></i>
                                            </div>

                                            <div>
                                                <strong>Designation updated</strong>
                                                <span>05 Sep 2026</span>
                                            </div>

                                        </div>

                                    </div>


                                    <button type="button" className="ep-view-activity">
                                        View all activity
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    
                    <section className="ep-profile-tab-content d-none" id="profileTabPlaceholder">
                        <div className="ep-placeholder-card">
                            <div className="ep-placeholder-icon">
                                <i className="bi bi-window-stack"></i>
                            </div>
                            <h3 id="profilePlaceholderTitle">
                                Employment
                            </h3>
                            <p>
                                This section will contain the employee's detailed
                                information and related records.
                            </p>
                        </div>
                    </section>
                </div>

            </div>
    </>
  );
}
