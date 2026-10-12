import React from "react";

export default function SkillsCertifications() {
  return (
    <>
<div className="px-0 px-md-5 employee-dashboard">

                <div id="profileSkills">

                    <div className="esc-page">

                        
                        <div className="esc-page-header">
                            <div>
                                <div className="esc-breadcrumb">
                                    <span>Employee Profile</span>
                                    <i className="bi bi-chevron-right"></i>
                                    <span>Skills & Certifications</span>
                                </div>

                                <h2 className="esc-page-title">Skills & Certifications</h2>
                                <p className="esc-page-subtitle">
                                    Manage professional skills, proficiency levels and employee certifications.
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
                                    AK
                                </div>

                                <div className="esc-employee-info">
                                    <div className="esc-name-row">
                                        <h3>Anil Kumar</h3>
                                        <span className="esc-status-badge">
                                            <span></span>
                                            Active
                                        </span>
                                    </div>

                                    <p>Senior Software Engineer</p>

                                    <div className="esc-employee-meta">
                                        <span>
                                            <i className="bi bi-diagram-3"></i>
                                            Engineering
                                        </span>

                                        <span>
                                            <i className="bi bi-code-slash"></i>
                                            Backend
                                        </span>

                                        <span>
                                            <i className="bi bi-person-badge"></i>
                                            EMP-000124
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="esc-employee-side">
                                <span className="esc-side-label">Profile Area</span>
                                <strong>Skills & Certifications</strong>
                            </div>

                        </div>


                        

                        <div className="row g-3 esc-summary-row">

                            <div className="col-xl-3 col-md-6">
                                <div className="esc-summary-card">
                                    <div className="esc-summary-icon esc-icon-purple">
                                        <i className="bi bi-lightning-charge"></i>
                                    </div>

                                    <div>
                                        <span>Total Skills</span>
                                        <strong id="escTotalSkills">8</strong>
                                        <small>Across all categories</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="esc-summary-card">
                                    <div className="esc-summary-icon esc-icon-blue">
                                        <i className="bi bi-star"></i>
                                    </div>

                                    <div>
                                        <span>Advanced Skills</span>
                                        <strong id="escAdvancedSkills">5</strong>
                                        <small>High proficiency</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="esc-summary-card">
                                    <div className="esc-summary-icon esc-icon-green">
                                        <i className="bi bi-patch-check"></i>
                                    </div>

                                    <div>
                                        <span>Expert Skills</span>
                                        <strong id="escVerifiedSkills">6</strong>
                                        <small>Verified by HR</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="esc-summary-card">
                                    <div className="esc-summary-icon esc-icon-orange">
                                        <i className="bi bi-award"></i>
                                    </div>

                                    <div>
                                        <span>Certifications</span>
                                        <strong id="escCertificationCount">3</strong>
                                        <small>Active credentials</small>
                                    </div>
                                </div>
                            </div>

                        </div>


                        

                        <div className="esc-section-card">

                            <div className="esc-section-header">

                                <div>
                                    <div className="esc-section-heading common-card-heading">
                                        <div className="esc-section-icon">
                                            <i className="bi bi-lightning-charge"></i>
                                        </div>

                                        <div>
                                            <h3>Skills</h3>
                                            <p>Professional skills and proficiency levels</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="esc-section-tools">

                                    <div className="esc-search-box">
                                        <i className="bi bi-search"></i>
                                        <input
                                            type="text"
                                            id="escSkillSearch"
                                            placeholder="Search skills..."
                                         />
                                    </div>

                                    <select className="form-select esc-filter-select" id="escSkillCategoryFilter">
                                        <option value="">All Categories</option>
                                        <option value="Programming">Programming</option>
                                        <option value="Framework">Framework</option>
                                        <option value="Database">Database</option>
                                        <option value="Cloud">Cloud</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="Testing">Testing</option>
                                        <option value="UI/UX">UI/UX</option>
                                        <option value="Project Management">Project Management</option>
                                        <option value="Soft Skills">Soft Skills</option>
                                        <option value="Domain Knowledge">Domain Knowledge</option>
                                    </select>

                                    <button type="button" className="btn esc-btn-outline" id="escAddSkillBtn">
                                        <i className="bi bi-plus-lg"></i>
                                        Add Skill
                                    </button>

                                </div>

                            </div>


                            
                            <div className="esc-skills-list" id="escSkillsList">

                                
                                <div
                                    className="esc-skill-row"
                                    data-skill="Java"
                                    data-category="Programming"
                                >

                                    <div className="esc-skill-name">
                                        <div className="esc-skill-avatar esc-java">
                                            <i className="bi bi-cup-hot"></i>
                                        </div>

                                        <div>
                                            <strong>Java</strong>
                                            <span>Programming</span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-category">
                                        <span>Programming</span>
                                    </div>

                                    <div className="esc-skill-level">
                                        <span className="esc-level-badge esc-level-advanced">
                                            Advanced
                                        </span>

                                        <div className="esc-level-progress">
                                            <span style={{width: "90%"}}></span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-experience">
                                        <strong>6 years</strong>
                                        <span>Experience</span>
                                    </div>

                                    <div className="esc-skill-verified">
                                        <i className="bi bi-patch-check-fill"></i>
                                        Verified
                                    </div>

                                    <div className="dropdown">
                                        <button
                                            className="btn esc-more-btn"
                                            data-bs-toggle="dropdown"
                                        >
                                            <i className="bi bi-three-dots"></i>
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="dropdown-item esc-edit-skill">
                                                    <i className="bi bi-pencil"></i>
                                                    Edit
                                                </button>
                                            </li>

                                            <li>
                                                <button className="dropdown-item esc-view-skill">
                                                    <i className="bi bi-eye"></i>
                                                    View Details
                                                </button>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>

                                            <li>
                                                <button className="dropdown-item text-danger esc-delete-skill">
                                                    <i className="bi bi-trash"></i>
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                
                                <div
                                    className="esc-skill-row"
                                    data-skill="Spring Boot"
                                    data-category="Framework"
                                >

                                    <div className="esc-skill-name">
                                        <div className="esc-skill-avatar esc-spring">
                                            <i className="bi bi-boxes"></i>
                                        </div>

                                        <div>
                                            <strong>Spring Boot</strong>
                                            <span>Framework</span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-category">
                                        <span>Framework</span>
                                    </div>

                                    <div className="esc-skill-level">
                                        <span className="esc-level-badge esc-level-advanced">
                                            Advanced
                                        </span>

                                        <div className="esc-level-progress">
                                            <span style={{width: "88%"}}></span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-experience">
                                        <strong>5 years</strong>
                                        <span>Experience</span>
                                    </div>

                                    <div className="esc-skill-verified">
                                        <i className="bi bi-patch-check-fill"></i>
                                        Verified
                                    </div>

                                    <div className="dropdown">
                                        <button className="btn esc-more-btn" data-bs-toggle="dropdown">
                                            <i className="bi bi-three-dots"></i>
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="dropdown-item esc-edit-skill">
                                                    <i className="bi bi-pencil"></i>
                                                    Edit
                                                </button>
                                            </li>

                                            <li>
                                                <button className="dropdown-item esc-view-skill">
                                                    <i className="bi bi-eye"></i>
                                                    View Details
                                                </button>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>

                                            <li>
                                                <button className="dropdown-item text-danger esc-delete-skill">
                                                    <i className="bi bi-trash"></i>
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                
                                <div
                                    className="esc-skill-row"
                                    data-skill="AWS"
                                    data-category="Cloud"
                                >

                                    <div className="esc-skill-name">
                                        <div className="esc-skill-avatar esc-aws">
                                            <i className="bi bi-cloud"></i>
                                        </div>

                                        <div>
                                            <strong>AWS</strong>
                                            <span>Cloud</span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-category">
                                        <span>Cloud</span>
                                    </div>

                                    <div className="esc-skill-level">
                                        <span className="esc-level-badge esc-level-intermediate">
                                            Intermediate
                                        </span>

                                        <div className="esc-level-progress">
                                            <span style={{width: "65%"}}></span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-experience">
                                        <strong>3 years</strong>
                                        <span>Experience</span>
                                    </div>

                                    <div className="esc-skill-verified">
                                        <i className="bi bi-patch-check-fill"></i>
                                        Verified
                                    </div>

                                    <div className="dropdown">
                                        <button className="btn esc-more-btn" data-bs-toggle="dropdown">
                                            <i className="bi bi-three-dots"></i>
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="dropdown-item esc-edit-skill">
                                                    <i className="bi bi-pencil"></i>
                                                    Edit
                                                </button>
                                            </li>

                                            <li>
                                                <button className="dropdown-item esc-view-skill">
                                                    <i className="bi bi-eye"></i>
                                                    View Details
                                                </button>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>

                                            <li>
                                                <button className="dropdown-item text-danger esc-delete-skill">
                                                    <i className="bi bi-trash"></i>
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>


                                
                                <div
                                    className="esc-skill-row"
                                    data-skill="PostgreSQL"
                                    data-category="Database"
                                >

                                    <div className="esc-skill-name">
                                        <div className="esc-skill-avatar esc-postgresql">
                                            <i className="bi bi-database"></i>
                                        </div>

                                        <div>
                                            <strong>PostgreSQL</strong>
                                            <span>Database</span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-category">
                                        <span>Database</span>
                                    </div>

                                    <div className="esc-skill-level">
                                        <span className="esc-level-badge esc-level-advanced">
                                            Advanced
                                        </span>

                                        <div className="esc-level-progress">
                                            <span style={{width: "85%"}}></span>
                                        </div>
                                    </div>

                                    <div className="esc-skill-experience">
                                        <strong>5 years</strong>
                                        <span>Experience</span>
                                    </div>

                                    <div className="esc-skill-verified">
                                        <i className="bi bi-patch-check-fill"></i>
                                        Verified
                                    </div>

                                    <div className="dropdown">
                                        <button className="btn esc-more-btn" data-bs-toggle="dropdown">
                                            <i className="bi bi-three-dots"></i>
                                        </button>

                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="dropdown-item esc-edit-skill">
                                                    <i className="bi bi-pencil"></i>
                                                    Edit
                                                </button>
                                            </li>

                                            <li>
                                                <button className="dropdown-item esc-view-skill">
                                                    <i className="bi bi-eye"></i>
                                                    View Details
                                                </button>
                                            </li>

                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>

                                            <li>
                                                <button className="dropdown-item text-danger esc-delete-skill">
                                                    <i className="bi bi-trash"></i>
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </div>

                        </div>


                        

                        


                        

                        <div className="esc-section-card esc-certification-section">

                            <div className="esc-section-header">

                                <div className="esc-section-heading common-card-heading">
                                    <div className="esc-section-icon esc-award-icon">
                                        <i className="bi bi-award"></i>
                                    </div>

                                    <div>
                                        <h3>Certifications</h3>
                                        <p>Professional credentials and certification records</p>
                                    </div>
                                </div>

                                <button className="btn esc-btn-primary esc-cert-add-inline" id="escAddCertificationInline">
                                    <i className="bi bi-plus-lg"></i>
                                    Add Certification
                                </button>

                            </div>


                            <div className="row g-3" id="escCertificationList">

                                
                                <div className="col-xl-4 col-lg-6">

                                    <div className="esc-cert-card">

                                        <div className="esc-cert-top">

                                            <div className="esc-cert-logo">
                                                <i className="bi bi-cloud-check"></i>
                                            </div>

                                            <div className="dropdown">
                                                <button className="btn esc-more-btn" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>

                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <button className="dropdown-item esc-preview-cert">
                                                            <i className="bi bi-eye"></i>
                                                            Preview
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-pencil"></i>
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-download"></i>
                                                            Download
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item text-danger">
                                                            <i className="bi bi-trash"></i>
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>

                                        <div className="esc-cert-content">

                                            <span className="esc-cert-category">
                                                Cloud Certification
                                            </span>

                                            <h4>AWS Certified Developer</h4>

                                            <p className="esc-cert-org">
                                                Amazon Web Services
                                            </p>

                                            <div className="esc-cert-info">

                                                <div>
                                                    <span>Certificate Number</span>
                                                    <strong>AWS-DEV-48291</strong>
                                                </div>

                                                <div>
                                                    <span>Issue Date</span>
                                                    <strong>12-Jun-2025</strong>
                                                </div>

                                                <div>
                                                    <span>Expiry Date</span>
                                                    <strong>12-Jun-2028</strong>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="esc-cert-footer">

                                            <span className="esc-cert-verified">
                                                <i className="bi bi-patch-check-fill"></i>
                                                Verified
                                            </span>

                                            <button className="btn esc-cert-view-btn">
                                                View Certificate
                                                <i className="bi bi-arrow-up-right"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>


                                
                                <div className="col-xl-4 col-lg-6">

                                    <div className="esc-cert-card">

                                        <div className="esc-cert-top">

                                            <div className="esc-cert-logo esc-cert-green">
                                                <i className="bi bi-database-check"></i>
                                            </div>

                                            <div className="dropdown">
                                                <button className="btn esc-more-btn" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>

                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-eye"></i>
                                                            Preview
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-pencil"></i>
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-download"></i>
                                                            Download
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item text-danger">
                                                            <i className="bi bi-trash"></i>
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>

                                        <div className="esc-cert-content">

                                            <span className="esc-cert-category">
                                                Database
                                            </span>

                                            <h4>PostgreSQL Professional</h4>

                                            <p className="esc-cert-org">
                                                PostgreSQL Global Development Group
                                            </p>

                                            <div className="esc-cert-info">

                                                <div>
                                                    <span>Certificate Number</span>
                                                    <strong>PG-2025-1842</strong>
                                                </div>

                                                <div>
                                                    <span>Issue Date</span>
                                                    <strong>08-Aug-2025</strong>
                                                </div>

                                                <div>
                                                    <span>Expiry Date</span>
                                                    <strong>08-Aug-2028</strong>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="esc-cert-footer">

                                            <span className="esc-cert-verified">
                                                <i className="bi bi-patch-check-fill"></i>
                                                Verified
                                            </span>

                                            <button className="btn esc-cert-view-btn">
                                                View Certificate
                                                <i className="bi bi-arrow-up-right"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>


                                
                                <div className="col-xl-4 col-lg-6">

                                    <div className="esc-cert-card">

                                        <div className="esc-cert-top">

                                            <div className="esc-cert-logo esc-cert-orange">
                                                <i className="bi bi-diagram-3"></i>
                                            </div>

                                            <div className="dropdown">
                                                <button className="btn esc-more-btn" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots"></i>
                                                </button>

                                                <ul className="dropdown-menu dropdown-menu-end">
                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-eye"></i>
                                                            Preview
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-pencil"></i>
                                                            Edit
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item">
                                                            <i className="bi bi-download"></i>
                                                            Download
                                                        </button>
                                                    </li>

                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>

                                                    <li>
                                                        <button className="dropdown-item text-danger">
                                                            <i className="bi bi-trash"></i>
                                                            Delete
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>

                                        <div className="esc-cert-content">

                                            <span className="esc-cert-category">
                                                Framework
                                            </span>

                                            <h4>Spring Professional Certification</h4>

                                            <p className="esc-cert-org">
                                                VMware / Spring
                                            </p>

                                            <div className="esc-cert-info">

                                                <div>
                                                    <span>Certificate Number</span>
                                                    <strong>SPR-2024-7218</strong>
                                                </div>

                                                <div>
                                                    <span>Issue Date</span>
                                                    <strong>20-Nov-2024</strong>
                                                </div>

                                                <div>
                                                    <span>Expiry Date</span>
                                                    <strong>20-Nov-2027</strong>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="esc-cert-footer">

                                            <span className="esc-cert-verified">
                                                <i className="bi bi-patch-check-fill"></i>
                                                Verified
                                            </span>

                                            <button className="btn esc-cert-view-btn">
                                                View Certificate
                                                <i className="bi bi-arrow-up-right"></i>
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    

                    <div className="modal fade" id="escSkillModal" tabIndex="-1" aria-hidden="true">

                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content esc-modal">

                                <div className="modal-header esc-modal-header">

                                    <div>
                                        <span className="esc-modal-label">Skills Management</span>
                                        <h5 className="modal-title" id="escSkillModalTitle">
                                            Add Skill
                                        </h5>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <label className="form-label">Skill</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="escSkillInput"
                                                placeholder="e.g. Java"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Skill Category</label>
                                            <select className="form-select" id="escSkillCategoryInput">
                                                <option value="">Select category</option>
                                                <option>Programming</option>
                                                <option>Framework</option>
                                                <option>Database</option>
                                                <option>Cloud</option>
                                                <option>DevOps</option>
                                                <option>Testing</option>
                                                <option>UI/UX</option>
                                                <option>Project Management</option>
                                                <option>Soft Skills</option>
                                                <option>Domain Knowledge</option>
                                                <option>Others</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Other Skill</label>

                                            <input className="form-control" placeholder="...." disabled />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Proficiency</label>

                                            <select className="form-select" id="escSkillProficiencyInput">
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                                <option>Expert</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Years of Experience</label>

                                            <input
                                                type="number"
                                                className="form-control"
                                                id="escSkillExperienceInput"
                                                min="0"
                                                step="0.5"
                                                placeholder="e.g. 4"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Last Used</label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                id="escSkillLastUsedInput"
                                             />
                                        </div>

                                        

                                    </div>

                                </div>

                                <div className="modal-footer esc-modal-footer">

                                    <button
                                        type="button"
                                        className="btn esc-cancel-btn"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn esc-btn-primary"
                                        id="escSaveSkillBtn"
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        Save Skill
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    

                    <div className="modal fade" id="escCertificationModal" tabIndex="-1" aria-hidden="true">

                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content esc-modal">

                                <div className="modal-header esc-modal-header">

                                    <div>
                                        <span className="esc-modal-label">Certification Management</span>
                                        <h5 className="modal-title">
                                            Add Certification
                                        </h5>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <label className="form-label">Skill Category</label>
                                            <select className="form-select" id="escSkillCategoryInput">
                                                <option value="">Select category</option>
                                                <option>Programming</option>
                                                <option>Framework</option>
                                                <option>Database</option>
                                                <option>Cloud</option>
                                                <option>DevOps</option>
                                                <option>Testing</option>
                                                <option>UI/UX</option>
                                                <option>Project Management</option>
                                                <option>Soft Skills</option>
                                                <option>Domain Knowledge</option>
                                                <option>Others</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Certification Name
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="escCertificationName"
                                                placeholder="e.g. AWS Certified Developer"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Issuing Organization
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="escCertificationOrganization"
                                                placeholder="Organization name"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Certificate Number
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                id="escCertificationNumber"
                                                placeholder="Certificate number"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Issue Date
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                id="escCertificationIssueDate"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Expiry Date
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                id="escCertificationExpiryDate"
                                             />
                                        </div>

                                        <div className="col-md-12">

                                            <label className="form-label">
                                                Certificate File
                                            </label>

                                            <label className="esc-file-upload">

                                                <i className="bi bi-cloud-arrow-up"></i>

                                                <span>
                                                    <strong>Choose certificate</strong>
                                                    <small>PDF, JPG or PNG</small>
                                                </span>

                                                <input
                                                    type="file"
                                                    id="escCertificationFile"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                 />

                                            </label>

                                        </div>

                                    </div>

                                </div>

                                <div className="modal-footer esc-modal-footer">

                                    <button
                                        type="button"
                                        className="btn esc-cancel-btn"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn esc-btn-primary"
                                        id="escSaveCertificationBtn"
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        Save Certification
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    
                    <div className="toast-container position-fixed bottom-0 end-0 p-3">
                        <div
                            id="escToast"
                            className="toast esc-toast"
                            role="alert"
                        >
                            <div className="toast-body">
                                <i className="bi bi-check-circle-fill"></i>
                                <span id="escToastMessage">
                                    Changes saved successfully.
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
    </>
  );
}
