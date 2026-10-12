import React from "react";

export default function Settings() {
  return (
    <>
<div className="px-0 px-md-5 employee-dashboard">
                

<div className="employee-settings-page">

    
    <div className="es-page-header">
        <div>
            <h2>My Settings</h2>
            <p>Manage your personal information, bank details, and account preferences.</p>
        </div>
        <button className="btn es-btn-light">
            <i className="bi bi-shield-check"></i> Privacy & Security
        </button>
    </div>

    
    <div className="es-profile-banner">
        <div className="es-profile-avatar">
            <span>AK</span>
            <button type="button" title="Change profile photo">
                <i className="bi bi-camera-fill"></i>
            </button>
        </div>
        <div className="es-profile-info">
            <span className="es-profile-label">EMPLOYEE PROFILE</span>
            <h3>Anil Kumar</h3>
            <p>Senior Software Engineer · Engineering / Backend</p>
            <div className="es-profile-tags">
                <span><i className="bi bi-person-badge"></i> EMP-000124</span>
                <span><i className="bi bi-geo-alt"></i> Chennai</span>
                <span className="es-active-tag"><i className="bi bi-check-circle-fill"></i> Active</span>
            </div>
        </div>
        <div className="es-profile-completion">
            <div className="es-completion-top">
                <span>Profile Completion</span>
                <strong>85%</strong>
            </div>
            <div className="progress es-progress">
                <div className="progress-bar" style={{width: "85%"}}></div>
            </div>
            <small>Complete your remaining profile details.</small>
        </div>
    </div>

    
    <div className="es-layout">

        
        <aside className="es-navigation">
            <div className="es-nav-heading">SETTINGS MENU</div>

            <a href="#esPersonal" className="es-nav-link active">
                <i className="bi bi-person"></i><span>Personal Information</span>
            </a>
            <a href="#esContact" className="es-nav-link">
                <i className="bi bi-telephone"></i><span>Contact Information</span>
            </a>
            <a href="#esEmployment" className="es-nav-link">
                <i className="bi bi-briefcase"></i><span>Employment Details</span>
            </a>
            <a href="#esBank" className="es-nav-link">
                <i className="bi bi-bank"></i><span>Bank Details</span>
                <span className="es-nav-badge">Sensitive</span>
            </a>
            <a href="#esIdentity" className="es-nav-link">
                <i className="bi bi-fingerprint"></i><span>Identity Information</span>
            </a>
            <a href="#esEmergency" className="es-nav-link">
                <i className="bi bi-person-hearts"></i><span>Emergency Contact</span>
            </a>
            <a href="#esAccount" className="es-nav-link">
                <i className="bi bi-shield-lock"></i><span>Account & Security</span>
            </a>
            <a href="#esPreferences" className="es-nav-link">
                <i className="bi bi-sliders"></i><span>Preferences</span>
            </a>
            <a href="#esShortcuts" className="es-nav-link">
                <i className="bi bi-command"></i><span>Shortcut Selection</span>
            </a>

            <div className="es-nav-help">
                <div className="es-help-icon"><i className="bi bi-headset"></i></div>
                <strong>Need help?</strong>
                <p>Contact HR if you need help updating your employee information.</p>
                <button type="button">
                    Contact HR <i className="bi bi-arrow-up-right"></i>
                </button>
            </div>
        </aside>

        
        <main className="es-main-content">

            
            <section className="es-section-card" id="esPersonal">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-purple"><i className="bi bi-person-vcard"></i></div>
                        <div>
                            <h4>Personal Information</h4>
                            <p>Your basic identity and personal details</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>First Name</span><strong>Anil</strong></div>
                    <div className="es-info-item"><span>Middle Name</span><strong>—</strong></div>
                    <div className="es-info-item"><span>Last Name</span><strong>Kumar</strong></div>
                    <div className="es-info-item"><span>Preferred Name</span><strong>Anil</strong></div>
                    <div className="es-info-item"><span>Date of Birth</span><strong>12 June 1998</strong></div>
                    <div className="es-info-item"><span>Gender</span><strong>Male</strong></div>
                    <div className="es-info-item"><span>Marital Status</span><strong>Single</strong></div>
                    <div className="es-info-item"><span>Nationality</span><strong>Indian</strong></div>
                    <div className="es-info-item"><span>Blood Group</span><strong>O+</strong></div>
                </div>
            </section>

            
            <section className="es-section-card" id="esContact">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-blue"><i className="bi bi-telephone"></i></div>
                        <div>
                            <h4>Contact Information</h4>
                            <p>Your personal contact details and addresses</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>Personal Email</span><strong>Anil.kumar@gmail.com</strong></div>
                    <div className="es-info-item"><span>Work Email</span><strong>Anil.kumar@ramel.com</strong></div>
                    <div className="es-info-item"><span>Mobile Number</span><strong>+91 98765 43210</strong></div>
                    <div className="es-info-item"><span>Alternate Phone</span><strong>—</strong></div>
                </div>

                <div className="es-address-grid">
                    <div className="es-address-box">
                        <div className="es-address-heading"><i className="bi bi-house"></i> Current Address</div>
                        <p>Flat 302, Green Residency, Anna Nagar</p>
                        <span>Chennai, Tamil Nadu – 600040, India</span>
                    </div>
                    <div className="es-address-box">
                        <div className="es-address-heading"><i className="bi bi-house-door"></i> Permanent Address</div>
                        <p>H.No. 4-12, Main Road, Hyderabad</p>
                        <span>Hyderabad, Telangana – 500001, India</span>
                    </div>
                </div>
            </section>

            
            <section className="es-section-card" id="esEmployment">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-orange"><i className="bi bi-briefcase"></i></div>
                        <div>
                            <h4>Employment Details</h4>
                            <p>Your official job and organizational information</p>
                        </div>
                    </div>
                    <span className="es-readonly-badge"><i className="bi bi-lock"></i> HR Managed</span>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>Employee ID</span><strong>EMP-000124</strong></div>
                    <div className="es-info-item"><span>Employment Type</span><strong>Permanent</strong></div>
                    <div className="es-info-item"><span>Department</span><strong>Engineering</strong></div>
                    <div className="es-info-item"><span>Team</span><strong>Backend</strong></div>
                    <div className="es-info-item"><span>Designation</span><strong>Senior Software Engineer</strong></div>
                    <div className="es-info-item"><span>Reporting Manager</span><strong>Priya Sharma</strong></div>
                    <div className="es-info-item"><span>Joining Date</span><strong>15 January 2025</strong></div>
                    <div className="es-info-item"><span>Work Mode</span><strong>Hybrid</strong></div>
                    <div className="es-info-item"><span>Office Location</span><strong>Chennai</strong></div>
                    <div className="es-info-item"><span>Employment Status</span><strong><span className="es-status-active">Active</span></strong></div>
                </div>
            </section>

            
            <section className="es-section-card es-bank-section" id="esBank">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-green"><i className="bi bi-bank"></i></div>
                        <div>
                            <h4>Bank Details</h4>
                            <p>Your salary account and payment information</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-pencil"></i> Request Update
                    </button>
                </div>

                <div className="es-bank-security">
                    <div className="es-bank-security-icon"><i className="bi bi-shield-lock-fill"></i></div>
                    <div>
                        <strong>Your bank information is protected</strong>
                        <p>Account numbers are masked. Changes may require HR verification before payroll updates.</p>
                    </div>
                    <span className="es-verified-badge"><i className="bi bi-patch-check-fill"></i> Verified</span>
                </div>

                <div className="es-bank-card">
                    <div className="es-bank-card-top">
                        <div className="es-bank-logo"><i className="bi bi-bank2"></i></div>
                        <span className="es-bank-account-type">SALARY ACCOUNT</span>
                    </div>
                    <h3>HDFC Bank</h3>
                    <p>Account Holder</p>
                    <strong className="es-account-holder">Anil Kumar</strong>
                    <div className="es-account-number-row">
                        <div>
                            <span>Account Number</span>
                            <strong id="esAccountNumber">•••• •••• 4821</strong>
                        </div>
                        <button className="es-reveal-btn" id="esRevealAccount" type="button">
                            <i className="bi bi-eye"></i> Show
                        </button>
                    </div>
                    <div className="es-bank-card-footer">
                        <div><span>IFSC Code</span><strong>HDFC0001234</strong></div>
                        <div><span>Branch</span><strong>Anna Nagar, Chennai</strong></div>
                    </div>
                </div>

                <div className="es-info-grid es-bank-extra">
                    <div className="es-info-item"><span>Account Type</span><strong>Salary / Savings</strong></div>
                    <div className="es-info-item"><span>Bank Verification</span><strong><span className="es-status-active">Verified</span></strong></div>
                    <div className="es-info-item"><span>Last Verified</span><strong>10 September 2026</strong></div>
                    <div className="es-info-item"><span>Payment Method</span><strong>Bank Transfer</strong></div>
                </div>
            </section>

            
            <section className="es-section-card" id="esIdentity">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-pink"><i className="bi bi-fingerprint"></i></div>
                        <div>
                            <h4>Identity Information</h4>
                            <p>Government-issued identity details</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-pencil"></i> Request Update
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item">
                        <span>Aadhaar Number</span>
                        <strong>XXXX XXXX 1234</strong>
                    </div>
                    <div className="es-info-item">
                        <span>PAN Number</span>
                        <strong>ABCDE••••F</strong>
                    </div>
                    <div className="es-info-item">
                        <span>Passport Number</span>
                        <strong>••••••••</strong>
                    </div>
                    <div className="es-info-item">
                        <span>Driving License</span>
                        <strong>••••••••</strong>
                    </div>
                    <div className="es-info-item">
                        <span>UAN Number</span>
                        <strong>1001 2345 6789</strong>
                    </div>
                </div>
                <div className="es-security-note">
                    <i className="bi bi-shield-lock"></i>
                    Identity numbers are masked for privacy. Contact HR for verified document updates.
                </div>
            </section>

            
            <section className="es-section-card" id="esEmergency">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-red"><i className="bi bi-person-hearts"></i></div>
                        <div>
                            <h4>Emergency Contact</h4>
                            <p>Person to contact in case of an emergency</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-pencil"></i> Edit
                    </button>
                </div>

                <div className="es-info-grid">
                    <div className="es-info-item"><span>Contact Name</span><strong>Mohammed Shaik</strong></div>
                    <div className="es-info-item"><span>Relationship</span><strong>Brother</strong></div>
                    <div className="es-info-item"><span>Phone Number</span><strong>+91 98765 12345</strong></div>
                    <div className="es-info-item"><span>Alternate Phone</span><strong>—</strong></div>
                    <div className="es-info-item"><span>Email</span><strong>—</strong></div>
                    <div className="es-info-item"><span>Address</span><strong>Hyderabad, Telangana</strong></div>
                </div>
            </section>

            
            <section className="es-section-card" id="esAccount">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-purple"><i className="bi bi-shield-lock"></i></div>
                        <div>
                            <h4>Account & Security</h4>
                            <p>Manage your login and account security</p>
                        </div>
                    </div>
                </div>

                <div className="es-security-list">
                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-envelope-check"></i></div>
                        <div className="es-security-row-content">
                            <strong>Corporate Email</strong>
                            <span>Anil.kumar@ramel.com</span>
                        </div>
                        <span className="es-verified-badge">Verified</span>
                    </div>

                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-key"></i></div>
                        <div className="es-security-row-content">
                            <strong>Password</strong>
                            <span>Last changed 30 days ago</span>
                        </div>
                        <button className="btn es-edit-btn">Change</button>
                    </div>

                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-phone"></i></div>
                        <div className="es-security-row-content">
                            <strong>Multi-Factor Authentication</strong>
                            <span>Extra protection for your account</span>
                        </div>
                        <span className="es-status-active">Enabled</span>
                    </div>

                    <div className="es-security-row">
                        <div className="es-security-row-icon"><i className="bi bi-laptop"></i></div>
                        <div className="es-security-row-content">
                            <strong>Active Sessions</strong>
                            <span>Current browser · Windows · Chennai</span>
                        </div>
                        <button className="btn es-edit-btn">Manage</button>
                    </div>
                </div>
            </section>

            
            <section className="es-section-card" id="esPreferences">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-blue"><i className="bi bi-sliders"></i></div>
                        <div>
                            <h4>Preferences</h4>
                            <p>Personalize your employee workspace</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-check2"></i> Save Preferences
                    </button>
                </div>

                <div className="es-preference-grid">
                    <div className="es-preference-field">
                        <label htmlFor="esLanguage">Language</label>
                        <select className="form-select" id="esLanguage">
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Telugu</option>
                            <option>Tamil</option>
                        </select>
                    </div>
                    <div className="es-preference-field">
                        <label htmlFor="esDateFormat">Date Format</label>
                        <select className="form-select" id="esDateFormat">
                            <option value="DD MMM YYYY">DD MMM YYYY</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                    </div>
                    <div className="es-preference-field">
                        <label htmlFor="esTheme">Appearance</label>
                        <select className="form-select" id="esTheme">
                            <option value="light">Light Mode</option>
                            <option value="dark">Dark Mode</option>
                            <option value="system">System Default</option>
                        </select>
                    </div>
                </div>

                <div className="es-preference-toggles">
                    <div className="es-preference-toggle">
                        <div>
                            <strong>Email Notifications</strong>
                            <p>Receive important updates by email.</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="esEmailNotifications" checked />
                        </div>
                    </div>
                    <div className="es-preference-toggle">
                        <div>
                            <strong>Push Notifications</strong>
                            <p>Receive updates in your employee workspace.</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="esPushNotifications" checked />
                        </div>
                    </div>
                    <div className="es-preference-toggle">
                        <div>
                            <strong>Birthday & Work Anniversary Reminders</strong>
                            <p>Get notified about your teammates' special days.</p>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="esCelebrationNotifications" checked />
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="es-section-card" id="esShortcuts">
                <div className="es-section-header">
                    <div className="es-section-title">
                        <div className="es-section-icon es-blue"><i className="bi bi-command"></i></div>
                        <div>
                            <h4>Shortcuts Selection</h4>
                            <p>Personalize your employee dashboard shortcuts</p>
                        </div>
                    </div>
                    <button className="btn es-edit-btn">
                        <i className="bi bi-check2"></i> Save Preferences
                    </button>
                </div>

                <div className="row g-3">

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-purple">
                                    <i className="bi bi-calendar-plus"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>Apply Leave</strong>
                            <small>Request time off</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-blue">
                                    <i className="bi bi-calendar-check"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>Attendance</strong>
                            <small>View attendance</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-orange">
                                    <i className="bi bi-send"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>New Request</strong>
                            <small>Contact HR / Admin</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-green">
                                    <i className="bi bi-folder2-open"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>Documents</strong>
                            <small>My documents</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-pink">
                                    <i className="bi bi-laptop"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>My Assets</strong>
                            <small>Assigned equipment</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-dark">
                                    <i className="bi bi-person"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>My Profile</strong>
                            <small>View profile</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-purple">
                                    <i className="bi bi-calendar-plus"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>Apply Leave</strong>
                            <small>Request time off</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-blue">
                                    <i className="bi bi-calendar-check"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>Attendance</strong>
                            <small>View attendance</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-orange">
                                    <i className="bi bi-send"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>New Request</strong>
                            <small>Contact HR / Admin</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-green">
                                    <i className="bi bi-folder2-open"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star"></i>
                                </span>
                            </div>
                            <strong>Documents</strong>
                            <small>My documents</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-pink">
                                    <i className="bi bi-laptop"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>My Assets</strong>
                            <small>Assigned equipment</small>
                        </button>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
                        <button className="ed-quick-card">
                            <div className="d-flex justify-content-between">
                                <span className="ed-quick-icon ed-q-dark">
                                    <i className="bi bi-person"></i>
                                </span>
                                <span>
                                    <i className="bi bi-star-fill text-warning"></i>
                                </span>
                            </div>
                            <strong>My Profile</strong>
                            <small>View profile</small>
                        </button>
                    </div>

                </div>

                <div className="mt-4">
                    <i className="bi bi-info-circle"></i>
                    <strong>Note:</strong> Select up to 6 shortcuts as favourites for quick access.
                </div>
            </section>

            
            <div className="es-bottom-note">
                <i className="bi bi-info-circle"></i>
                Some information is managed by HR. For corrections to official employment or payroll records, submit a request to HR.
            </div>
        </main>
    </div>
</div>


<div className="modal fade" id="esEditModal" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <form id="esEditForm" className="modal-content es-modal-content">
            <div className="modal-header">
                <div>
                    <h5 className="modal-title" id="esEditTitle">Update Information</h5>
                    <p className="es-modal-subtitle" id="esEditSubtitle">Submit your information for review.</p>
                </div>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <div className="row g-3" id="esEditFields"></div>
                <div className="es-security-note mt-3">
                    <i className="bi bi-shield-lock"></i>
                    Changes to sensitive information may require HR verification. Do not enter passwords or account credentials.
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn es-btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn es-btn-primary">
                    <i className="bi bi-send"></i> Submit Update Request
                </button>
            </div>
        </form>
    </div>
</div>


<div className="es-toast" id="esToast">
    <div className="es-toast-icon"><i className="bi bi-check-lg"></i></div>
    <div>
        <strong id="esToastTitle">Success</strong>
        <p id="esToastMessage">Action completed.</p>
    </div>
    <button><i className="bi bi-x-lg"></i></button>
</div>

            </div>
    </>
  );
}
