import React from "react";

export default function Documents() {
  return (
    <>
<div className="px-0 px-md-5 employee-dashboard">

                <div id="profileDocuments">

                    <div className="epd-page">

                        
                        <div className="epd-header">

                            <div>
                                <h3>Documents</h3>

                                <p>
                                    Manage employee documents, verification and document status.
                                </p>
                            </div>

                            <button type="button" className="epd-upload-btn" id="epdHeaderUploadBtn">

                                <i className="bi bi-cloud-arrow-up"></i>

                                Upload Document

                            </button>

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
                                <span className="esc-side-label">8</span>
                                <strong>Total Documents</strong>
                            </div>

                        </div>

                       

                        

                        <div className="row g-3 esc-summary-row">

                            <div className="col-xl-3 col-md-6">
                                <div className="esc-summary-card">
                                    <div className="esc-summary-icon esc-icon-purple">
                                        <i className="bi bi-lightning-charge"></i>
                                    </div>

                                    <div>
                                        <span>Total Documents</span>
                                        <strong id="escTotalSkills">8</strong>
                                        <small>Across all categories</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="esc-summary-card">
                                    <div className="esc-summary-icon esc-icon-blue">
                                        <i className="bi bi-clock"></i>
                                    </div>

                                    <div>
                                        <span>Pending Documents</span>
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
                                        <span>Verified Documents</span>
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
                                        <span>Expiring Documents</span>
                                        <strong id="escCertificationCount">3</strong>
                                        <small>Active credentials</small>
                                    </div>
                                </div>
                            </div>

                        </div>


                        
                        <div className="epd-section">

                            <div className="epd-section-header common-card-heading">

                                <div>
                                    <h5>Document List</h5>

                                    <p>
                                        All documents uploaded for this employee.
                                    </p>
                                </div>

                                <span className="epd-list-count">
                                    8 Documents
                                </span>

                            </div>


                            
                            <div className="epd-toolbar">

                                <div className="epd-search">

                                    <i className="bi bi-search"></i>

                                    <input type="text" id="epdSearch" placeholder="Search documents..." />

                                </div>


                                <select id="epdTypeFilter" className="epd-filter">
                                    <option value="">All Types</option>
                                    <option value="Employment">Employment</option>
                                    <option value="Legal">Legal</option>
                                    <option value="Identity">Identity</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Education">Education</option>
                                    <option value="Experience">Experience</option>
                                </select>

                                <select id="epdStatusFilter" className="epd-filter">
                                    <option value="">All Status</option>
                                    <option value="Verified">Verified</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Re-upload">Re-upload Required</option>
                                </select>
                            </div>


                            
                            <div className="epd-table-wrapper">

                                <table className="epd-document-table">

                                    <thead>

                                        <tr>

                                            <th>Document</th>

                                            <th>Type</th>

                                            <th>Uploaded</th>

                                            <th>Status</th>

                                            <th>Expiry</th>

                                            <th className="epd-action-column">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody id="epdDocumentTableBody">


                                        
                                        <tr data-document="Offer Letter" data-type="Employment" data-status="Verified">

                                            <td>

                                                <div className="epd-document-name">

                                                    <div className="epd-file-icon epd-pdf">
                                                        <i className="bi bi-file-earmark-pdf"></i>
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            Offer Letter
                                                        </strong>

                                                        <span>
                                                            PDF Document
                                                        </span>
                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-type-badge">
                                                    Employment
                                                </span>

                                            </td>


                                            <td>

                                                <div className="epd-date">

                                                    <strong>10-Jan-2026</strong>

                                                    <span>Uploaded</span>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-status verified">

                                                    <i className="bi bi-check-circle-fill"></i>

                                                    Verified

                                                </span>

                                            </td>


                                            <td>

                                                <span className="epd-expiry">
                                                    —
                                                </span>

                                            </td>


                                            <td>

                                                <button type="button" className="epd-view-btn">

                                                    <i className="bi bi-eye"></i>

                                                </button>

                                            </td>

                                        </tr>


                                        
                                        <tr data-document="NDA" data-type="Legal" data-status="Verified">

                                            <td>

                                                <div className="epd-document-name">

                                                    <div className="epd-file-icon epd-doc">
                                                        <i className="bi bi-file-earmark-text"></i>
                                                    </div>

                                                    <div>
                                                        <strong>NDA</strong>

                                                        <span>
                                                            Legal Document
                                                        </span>
                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-type-badge">
                                                    Legal
                                                </span>

                                            </td>


                                            <td>

                                                <div className="epd-date">

                                                    <strong>10-Jan-2026</strong>

                                                    <span>Uploaded</span>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-status verified">

                                                    <i className="bi bi-check-circle-fill"></i>

                                                    Verified

                                                </span>

                                            </td>


                                            <td>

                                                <span className="epd-expiry">
                                                    —
                                                </span>

                                            </td>


                                            <td>

                                                <button type="button" className="epd-view-btn">

                                                    <i className="bi bi-eye"></i>

                                                </button>

                                            </td>

                                        </tr>


                                        
                                        <tr data-document="ID Proof" data-type="Identity" data-status="Pending">

                                            <td>

                                                <div className="epd-document-name">

                                                    <div className="epd-file-icon epd-image">
                                                        <i className="bi bi-card-image"></i>
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            ID Proof
                                                        </strong>

                                                        <span>
                                                            Identity Document
                                                        </span>
                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-type-badge">
                                                    Identity
                                                </span>

                                            </td>


                                            <td>

                                                <div className="epd-date">

                                                    <strong>11-Jan-2026</strong>

                                                    <span>Uploaded</span>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-status pending">

                                                    <i className="bi bi-clock-fill"></i>

                                                    Pending

                                                </span>

                                            </td>


                                            <td>

                                                <span className="epd-expiry">
                                                    —
                                                </span>

                                            </td>


                                            <td>

                                                <button type="button" className="epd-review-btn">

                                                    <i className="bi bi-shield-check"></i>

                                                </button>

                                            </td>

                                        </tr>


                                        
                                        <tr data-document="Certification" data-type="Technical" data-status="Verified">

                                            <td>

                                                <div className="epd-document-name">

                                                    <div className="epd-file-icon epd-cert">
                                                        <i className="bi bi-award"></i>
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            Certification
                                                        </strong>

                                                        <span>
                                                            Technical Document
                                                        </span>
                                                    </div>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-type-badge">
                                                    Technical
                                                </span>

                                            </td>


                                            <td>

                                                <div className="epd-date">

                                                    <strong>12-Jan-2026</strong>

                                                    <span>Uploaded</span>

                                                </div>

                                            </td>


                                            <td>

                                                <span className="epd-status verified">

                                                    <i className="bi bi-check-circle-fill"></i>

                                                    Verified

                                                </span>

                                            </td>


                                            <td>

                                                <span className="epd-expiry epd-expiry-warning">
                                                    2027
                                                </span>

                                            </td>


                                            <td>

                                                <button type="button" className="epd-view-btn">

                                                    <i className="bi bi-eye"></i>

                                                </button>

                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>


                            
                            <div id="epdNoResults" className="epd-no-results d-none">

                                <div>
                                    <i className="bi bi-file-earmark-x"></i>
                                </div>

                                <h6>No documents found</h6>

                                <p>
                                    Try changing your search or filter.
                                </p>

                            </div>


                            
                            <div className="epd-table-footer">

                                <span>
                                    Showing <strong>1–4</strong> of
                                    <strong>8</strong> documents
                                </span>

                                <div className="epd-pagination">

                                    <button disabled>
                                        <i className="bi bi-chevron-left"></i>
                                    </button>

                                    <button className="active">
                                        1
                                    </button>

                                    <button>
                                        2
                                    </button>

                                    <button>
                                        <i className="bi bi-chevron-right"></i>
                                    </button>

                                </div>

                            </div>

                        </div>


                        
                        


                        
                        


                        
                        <div className="epd-document-note">

                            <div className="epd-note-icon">
                                <i className="bi bi-info-circle"></i>
                            </div>

                            <div>

                                <strong>Document verification history</strong>

                                <p>
                                    Verification actions should be recorded with the
                                    verifier, verification date and remarks for
                                    future reference.
                                </p>

                            </div>

                        </div>

                    </div>


                    
                    <div className="modal fade" id="epdUploadModal" tabIndex="-1" aria-hidden="true">

                        <div className="modal-dialog modal-dialog-centered modal-lg">

                            <div className="modal-content epd-modal">

                                <div className="modal-header">

                                    <div>

                                        <span className="epd-modal-label">
                                            Employee Documents
                                        </span>

                                        <h5 className="modal-title">
                                            Upload Document
                                        </h5>

                                    </div>

                                    <button type="button" className="btn-close" data-bs-dismiss="modal">
                                    </button>

                                </div>


                                <div className="modal-body">

                                    <div className="epd-upload-zone" id="epdUploadZone">

                                        <input type="file" id="epdFileInput" hidden />

                                        <div className="epd-upload-icon">

                                            <i className="bi bi-cloud-arrow-up"></i>

                                        </div>

                                        <strong>
                                            Upload your document
                                        </strong>

                                        <span>
                                            Click to browse or drag and drop
                                        </span>

                                        <small>
                                            PDF, JPG, PNG, DOC, DOCX · Maximum 10 MB
                                        </small>

                                    </div>

                                    <div id="epdSelectedFile" className="epd-selected-file d-none">

                                        <i className="bi bi-file-earmark-text"></i>

                                        <div>

                                            <strong id="epdFileName">
                                                Document.pdf
                                            </strong>

                                            <span id="epdFileSize">
                                                0 KB
                                            </span>

                                        </div>

                                        <button type="button" id="epdRemoveFile">

                                            <i className="bi bi-x-lg"></i>

                                        </button>

                                    </div>

                                    <div className="epd-section-header common-card-heading">

                                        <div>

                                            <h5>Document Details</h5>

                                            <p>
                                                Select a document and manage its information
                                                and verification details.
                                            </p>

                                        </div>

                                        

                                    </div>


                                    <div className="epd-form-area">

                                        <div className="row g-4">

                                            
                                            <div className="col-lg-6">

                                                <label className="epd-label">
                                                    Document Category
                                                    <span>*</span>
                                                </label>

                                                <select className="form-select epd-input" id="epdDocumentType">

                                                    <option value="">
                                                        Select Document Type
                                                    </option>

                                                    <option>Identity</option>

                                                    <option>Employment</option>

                                                    <option>Education</option>

                                                    <option>Bank</option>

                                                    <option>
                                                        Tax
                                                    </option>

                                                    <option>
                                                        Compliance
                                                    </option>
                                                </select>

                                            </div>

                                            
                                            <div className="col-lg-6">

                                                <label className="epd-label">
                                                    Document Type
                                                    <span>*</span>
                                                </label>

                                                <select className="form-select epd-input" id="epdDocumentType">

                                                    <option value="">
                                                        Select Document Type
                                                    </option>

                                                    <option>Aadhaar</option>
                                                    <option>PAN</option>
                                                    <option>Passport</option>
                                                    <option>Offer Letter</option>
                                                    <option>Resume</option>
                                                    <option>Education Certificate</option>

                                                    <option>10th Certificate</option>

                                                    <option>+2 Certificate</option>

                                                    <option>Graduation</option>

                                                    <option>Post Graduation</option>

                                                    <option>
                                                        1st Company Offer Letter
                                                    </option>

                                                    <option>
                                                        1st Company Relieving Letter
                                                    </option>

                                                    <option>
                                                        Offer Letter
                                                    </option>

                                                    <option>
                                                        NDA
                                                    </option>

                                                    <option>
                                                        ID Proof
                                                    </option>

                                                    <option>
                                                        Experience Letter
                                                    </option>

                                                    <option>
                                                        Certification
                                                    </option>

                                                    <option>
                                                        Passport
                                                    </option>

                                                    <option>
                                                        Driving License
                                                    </option>

                                                    <option>
                                                        Other
                                                    </option>

                                                </select>

                                            </div>

                                            
                                            <div className="col-lg-6">

                                                <label className="epd-label">
                                                    Document Name
                                                </label>

                                                <div className="">

                                                    <input type="text" className="form-control epd-input" id="epdVerifiedBy"
                                                        placeholder="Actual name/title of the document" />

                                                </div>

                                            </div>

                                            
                                            <div className="col-lg-6">

                                                <label className="epd-label">
                                                    Document Number
                                                </label>

                                                <div className="">

                                                    <input type="text" className="form-control epd-input" id="epdVerifiedBy"
                                                        placeholder="Document Number" />

                                                </div>

                                            </div>


                                            
                                            <div className="col-lg-6">

                                                <label className="epd-label">
                                                    Issued Date
                                                </label>

                                                <div className="epd-input-icon">

                                                    <i className="bi bi-calendar3"></i>

                                                    <input type="date" className="form-control epd-input" id="epdVerificationDate" />

                                                </div>

                                            </div>

                                            
                                            <div className="col-lg-6">

                                                <label className="epd-label">
                                                    Expiry Date
                                                </label>

                                                <div className="epd-input-icon">

                                                    <i className="bi bi-calendar3"></i>

                                                    <input type="date" className="form-control epd-input" id="epdVerificationDate" />

                                                </div>

                                            </div>


                                            
                                            <div className="col-12">

                                                <label className="epd-label">
                                                    Remarks
                                                </label>

                                                <textarea className="form-control epd-input epd-textarea" id="epdRemarks" rows="4"
                                                    placeholder="Add remarks or verification notes..."></textarea>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                <div className="modal-footer">

                                    <button type="button" className="epd-modal-cancel" data-bs-dismiss="modal">

                                        Cancel

                                    </button>

                                    <button type="button" className="epd-modal-save" id="epdUploadConfirm">

                                        <i className="bi bi-cloud-arrow-up"></i>

                                        Upload Document

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
    </>
  );
}
