import React, { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "https://hrms-backend-5xo8.onrender.com";

const CATEGORY_STYLE = {
  Programming: { avatar: "esc-java", icon: "bi-code-slash" },
  Framework: { avatar: "esc-spring", icon: "bi-boxes" },
  Cloud: { avatar: "esc-aws", icon: "bi-cloud" },
  Database: { avatar: "esc-postgresql", icon: "bi-database" },
  DevOps: { avatar: "esc-aws", icon: "bi-gear" },
  Testing: { avatar: "esc-spring", icon: "bi-bug" },
  "UI/UX": { avatar: "esc-java", icon: "bi-palette" },
  "Project Management": { avatar: "esc-postgresql", icon: "bi-kanban" },
  "Soft Skills": { avatar: "esc-spring", icon: "bi-people" },
  "Domain Knowledge": { avatar: "esc-aws", icon: "bi-book" },
  Others: { avatar: "esc-postgresql", icon: "bi-lightning-charge" },
};
const LEVEL_WIDTH = { Beginner: 25, Intermediate: 60, Advanced: 85, Expert: 100 };
const MAX_CERT_FILE_SIZE = 10 * 1024 * 1024;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CERT_LOGO_CLASSES = ["", "esc-cert-green", "esc-cert-orange"];

const formatCertDate = (value) => {
  if (!value) return "ΓÇö";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "ΓÇö";
  return `${String(date.getDate()).padStart(2, "0")}-${MONTHS[date.getMonth()]}-${date.getFullYear()}`;
};
const EMPTY_CERT_FORM = {
  skillCategory: "",
  certificationName: "",
  issuingOrganization: "",
  certificateNumber: "",
  issueDate: "",
  expiryDate: "",
};
const EMPTY_SKILL_FORM = {
  skillName: "",
  skillCategory: "",
  otherSkill: "",
  proficiency: "Beginner",
  yearsOfExperience: "",
  lastUsed: "",
};

export default function SkillsCertifications({ currentUser, employeeProfile }) {
  const [isCertOpen, setIsCertOpen] = useState(false);
  const [certForm, setCertForm] = useState(EMPTY_CERT_FORM);
  const [certFile, setCertFile] = useState(null);
  const [certSubmitting, setCertSubmitting] = useState(false);
  const [certFeedback, setCertFeedback] = useState({ type: "", text: "" });
  const [certs, setCerts] = useState([]);
  const [certsLoading, setCertsLoading] = useState(true);
  const [certsError, setCertsError] = useState("");

  const loadCerts = useCallback(async () => {
    if (!currentUser?.id) {
      setCertsLoading(false);
      return;
    }
    try {
      setCertsError("");
      const response = await fetch(`${API_BASE}/api/employee/certifications/${currentUser.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to load certifications");
      setCerts(data);
    } catch (err) {
      setCertsError(err.message || "Failed to load certifications");
    } finally {
      setCertsLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    loadCerts();
  }, [loadCerts]);

  const certCards = certs.map((cert, index) => {
    const style = CATEGORY_STYLE[cert.skill_category] || CATEGORY_STYLE.Others;
    const verified = cert.verification_status === "Verified";
    return (
      <div className="col-xl-4 col-lg-6" key={cert.id}>
        <div className="esc-cert-card">
          <div className="esc-cert-top">
            <div className={`esc-cert-logo ${CERT_LOGO_CLASSES[index % CERT_LOGO_CLASSES.length]}`}>
              <i className={`bi ${style.icon}`}></i>
            </div>
          </div>

          <div className="esc-cert-content">
            <span className="esc-cert-category">{cert.skill_category}</span>
            <h4>{cert.certification_name}</h4>
            <p className="esc-cert-org">{cert.issuing_organization || "ΓÇö"}</p>

            <div className="esc-cert-info">
              <div>
                <span>Certificate Number</span>
                <strong>{cert.certificate_number || "ΓÇö"}</strong>
              </div>
              <div>
                <span>Issue Date</span>
                <strong>{formatCertDate(cert.issue_date)}</strong>
              </div>
              <div>
                <span>Expiry Date</span>
                <strong>{formatCertDate(cert.expiry_date)}</strong>
              </div>
            </div>
          </div>

          <div className="esc-cert-footer">
            <span className="esc-cert-verified" style={verified ? undefined : { color: "#f59a42" }}>
              <i className={`bi ${verified ? "bi-patch-check-fill" : "bi-clock-fill"}`}></i>
              {verified ? "Verified" : "Pending"}
            </span>

            {cert.file_path && (
              <a
                className="btn esc-cert-view-btn"
                href={`${API_BASE}/uploads/certifications/${encodeURIComponent(cert.file_path)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
                <i className="bi bi-arrow-up-right"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  });

  const updateCertField = (event) => {
    const { name, value } = event.target;
    setCertForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeCert = () => {
    setIsCertOpen(false);
    setCertForm(EMPTY_CERT_FORM);
    setCertFile(null);
    setCertFeedback({ type: "", text: "" });
  };

  const pickCertFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > MAX_CERT_FILE_SIZE) {
      setCertFeedback({ type: "danger", text: "File size must be 10 MB or less." });
      event.target.value = "";
      return;
    }
    setCertFeedback({ type: "", text: "" });
    setCertFile(file);
  };

  const saveCertification = async () => {
    if (!certForm.skillCategory || !certForm.certificationName.trim()) {
      setCertFeedback({ type: "danger", text: "Skill category and certification name are required." });
      return;
    }

    const body = new FormData();
    Object.entries(certForm).forEach(([key, value]) => body.append(key, value));
    if (certFile) body.append("file", certFile);

    try {
      setCertSubmitting(true);
      setCertFeedback({ type: "", text: "" });
      const response = await fetch(`${API_BASE}/api/employee/certifications/${currentUser.id}`, {
        method: "POST",
        body,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save certification");
      setCertForm(EMPTY_CERT_FORM);
      setCertFile(null);
      setCertFeedback({ type: "success", text: data.message });
      loadCerts();
    } catch (err) {
      setCertFeedback({ type: "danger", text: err.message || "Failed to save certification" });
    } finally {
      setCertSubmitting(false);
    }
  };
  const [isSkillOpen, setIsSkillOpen] = useState(false);
  const [skillForm, setSkillForm] = useState(EMPTY_SKILL_FORM);
  const [skillSubmitting, setSkillSubmitting] = useState(false);
  const [skillFeedback, setSkillFeedback] = useState({ type: "", text: "" });
  const skillCategory = skillForm.skillCategory;
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("");

  const loadSkills = useCallback(async () => {
    if (!currentUser?.id) {
      setSkillsLoading(false);
      return;
    }
    try {
      setSkillsError("");
      const response = await fetch(`${API_BASE}/api/employee/skills/${currentUser.id}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to load skills");
      setSkills(data);
    } catch (err) {
      setSkillsError(err.message || "Failed to load skills");
    } finally {
      setSkillsLoading(false);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    loadSkills();
  }, [loadSkills]);

  const filteredSkills = useMemo(() => {
    const term = skillSearch.trim().toLowerCase();
    return skills.filter((skill) => {
      if (skillCategoryFilter && skill.skill_category !== skillCategoryFilter) return false;
      if (!term) return true;
      return [skill.skill_name, skill.other_skill, skill.skill_category]
        .some((value) => (value || "").toLowerCase().includes(term));
    });
  }, [skills, skillSearch, skillCategoryFilter]);

  const advancedCount = skills.filter((s) => s.proficiency === "Advanced").length;
  const expertCount = skills.filter((s) => s.proficiency === "Expert").length;

  const skillRows = filteredSkills.map((skill) => {
    const style = CATEGORY_STYLE[skill.skill_category] || CATEGORY_STYLE.Others;
    const years = skill.years_of_experience === null ? null : Number(skill.years_of_experience);
    const verified = skill.verification_status === "Verified";
    const highLevel = skill.proficiency === "Advanced" || skill.proficiency === "Expert";
    return (
      <div className="esc-skill-row" key={skill.id}>
        <div className="esc-skill-name">
          <div className={`esc-skill-avatar ${style.avatar}`}>
            <i className={`bi ${style.icon}`}></i>
          </div>
          <div>
            <strong>{skill.skill_category === "Others" && skill.other_skill ? skill.other_skill : skill.skill_name}</strong>
            <span>{skill.skill_category}</span>
          </div>
        </div>

        <div className="esc-skill-category">
          <span>{skill.skill_category}</span>
        </div>

        <div className="esc-skill-level">
          <span className={`esc-level-badge ${highLevel ? "esc-level-advanced" : "esc-level-intermediate"}`}>
            {skill.proficiency}
          </span>
          <div className="esc-level-progress">
            <span style={{ width: `${LEVEL_WIDTH[skill.proficiency] || 25}%` }}></span>
          </div>
        </div>

        <div className="esc-skill-experience">
          <strong>{years === null ? "ΓÇö" : `${years} ${years === 1 ? "year" : "years"}`}</strong>
          <span>Experience</span>
        </div>

        <div className="esc-skill-verified" style={verified ? undefined : { color: "#f59a42" }}>
          <i className={`bi ${verified ? "bi-patch-check-fill" : "bi-clock-fill"}`}></i>
          {verified ? "Verified" : "Pending"}
        </div>
      </div>
    );
  });

  const updateSkillField = (event) => {
    const { name, value } = event.target;
    setSkillForm((prev) => ({ ...prev, [name]: value }));
  };

  const closeSkill = () => {
    setIsSkillOpen(false);
    setSkillForm(EMPTY_SKILL_FORM);
    setSkillFeedback({ type: "", text: "" });
  };

  const saveSkill = async () => {
    if (!skillForm.skillName.trim() || !skillForm.skillCategory) {
      setSkillFeedback({ type: "danger", text: "Skill and skill category are required." });
      return;
    }
    if (skillForm.skillCategory === "Others" && !skillForm.otherSkill.trim()) {
      setSkillFeedback({ type: "danger", text: "Enter the other skill name." });
      return;
    }

    try {
      setSkillSubmitting(true);
      setSkillFeedback({ type: "", text: "" });
      const response = await fetch(`${API_BASE}/api/employee/skills/${currentUser.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save skill");
      setSkillForm(EMPTY_SKILL_FORM);
      setSkillFeedback({ type: "success", text: data.message });
      loadSkills();
    } catch (err) {
      setSkillFeedback({ type: "danger", text: err.message || "Failed to save skill" });
    } finally {
      setSkillSubmitting(false);
    }
  };
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
                                    {(employeeProfile?.preferred_name
                                        ? employeeProfile.preferred_name.slice(0, 2)
                                        : employeeProfile?.first_name
                                            ? `${employeeProfile.first_name[0]}${employeeProfile.last_name ? employeeProfile.last_name[0] : (employeeProfile.first_name[1] || "")}`
                                            : currentUser?.email ? currentUser.email.slice(0, 2) : "EM"
                                    ).toUpperCase()}
                                </div>

                                <div className="esc-employee-info">
                                    <div className="esc-name-row">
                                        <h3>{employeeProfile?.preferred_name || [employeeProfile?.first_name, employeeProfile?.last_name].filter(Boolean).join(" ") || currentUser?.email?.split("@")[0] || "Employee"}</h3>
                                        <span className="esc-status-badge">
                                            <span></span>
                                            Active
                                        </span>
                                    </div>

                                    <p>{employeeProfile?.designation || "Senior Software Engineer"}</p>

                                    <div className="esc-employee-meta">
                                        <span>
                                            <i className="bi bi-diagram-3"></i>
                                            {employeeProfile?.department || "Engineering"}
                                        </span>

                                        <span>
                                            <i className="bi bi-code-slash"></i>
                                            {employeeProfile?.team || "Backend"}
                                        </span>

                                        <span>
                                            <i className="bi bi-person-badge"></i>
                                            {employeeProfile?.employee_code || "EMP-1360"}
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
                                        <strong id="escTotalSkills">{skills.length}</strong>
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
                                        <strong id="escAdvancedSkills">{advancedCount}</strong>
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
                                        <strong id="escVerifiedSkills">{expertCount}</strong>
                                        <small>Highest proficiency</small>
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
                                        <strong id="escCertificationCount">{certs.length}</strong>
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
                                            value={skillSearch}
                                            onChange={(e) => setSkillSearch(e.target.value)}
                                         />
                                    </div>

                                    <select className="form-select esc-filter-select" id="escSkillCategoryFilter" value={skillCategoryFilter} onChange={(e) => setSkillCategoryFilter(e.target.value)}>
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

                                    <button type="button" className="btn esc-btn-primary" id="escAddSkillBtn" onClick={() => setIsSkillOpen(true)}>
                                        <i className="bi bi-plus-lg"></i>
                                        Add Skill
                                    </button>

                                </div>

                            </div>


                            
                            <div className="esc-skills-list" id="escSkillsList">
                                {skillRows}

                                {!skillsLoading && filteredSkills.length === 0 && (
                                    <p className="text-center text-muted py-4 mb-0">
                                        {skillsError || "No skills found."}
                                    </p>
                                )}

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

                                <button className="btn esc-btn-primary" id="escAddCertificationInline" type="button" onClick={() => setIsCertOpen(true)}>
                                    <i className="bi bi-plus-lg"></i>
                                    Add Certification
                                </button>

                            </div>


                            <div className="row g-3" id="escCertificationList">

                                {certCards}

                                {!certsLoading && certs.length === 0 && (
                                    <p className="text-center text-muted py-4 mb-0">
                                        {certsError || "No certifications found."}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>


                    

                    {isSkillOpen && <div className="modal-backdrop fade show" onClick={closeSkill}></div>}

                    <div
                        className={`modal fade${isSkillOpen ? " show d-block" : ""}`}
                        id="escSkillModal"
                        tabIndex="-1"
                        aria-hidden={!isSkillOpen}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) closeSkill();
                        }}
                    >

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
                                        aria-label="Close"
                                        onClick={closeSkill}
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
                                                name="skillName"
                                                value={skillForm.skillName}
                                                onChange={updateSkillField}
                                                placeholder="e.g. Java"
                                             />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Skill Category</label>
                                            <select className="form-select" id="escSkillCategoryInput" name="skillCategory" value={skillCategory} onChange={updateSkillField}>
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

                                            <input className="form-control" placeholder="...." name="otherSkill" value={skillForm.otherSkill} onChange={updateSkillField} disabled={skillCategory !== "Others"} />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Proficiency</label>

                                            <select className="form-select" id="escSkillProficiencyInput" name="proficiency" value={skillForm.proficiency} onChange={updateSkillField}>
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
                                                name="yearsOfExperience"
                                                value={skillForm.yearsOfExperience}
                                                onChange={updateSkillField}
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
                                                name="lastUsed"
                                                value={skillForm.lastUsed}
                                                onChange={updateSkillField}
                                             />
                                        </div>

                                        

                                    </div>

                                </div>

                                <div className="modal-footer esc-modal-footer">

                                    {skillFeedback.text && <span className={`me-auto small text-${skillFeedback.type}`}>{skillFeedback.text}</span>}

                                    <button
                                        type="button"
                                        className="btn esc-cancel-btn"
                                        onClick={closeSkill}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn esc-btn-primary"
                                        id="escSaveSkillBtn"
                                        onClick={saveSkill}
                                        disabled={skillSubmitting}
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        {skillSubmitting ? "Saving..." : "Save Skill"}
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>


                    

                    {isCertOpen && <div className="modal-backdrop fade show" onClick={closeCert}></div>}

                    <div
                        className={`modal fade${isCertOpen ? " show d-block" : ""}`}
                        id="escCertificationModal"
                        tabIndex="-1"
                        aria-hidden={!isCertOpen}
                        onClick={(event) => {
                            if (event.target === event.currentTarget) closeCert();
                        }}
                    >

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
                                        aria-label="Close"
                                        onClick={closeCert}
                                    ></button>

                                </div>

                                <div className="modal-body">

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <label className="form-label">Skill Category</label>
                                            <select className="form-select" id="escSkillCategoryInput" name="skillCategory" value={certForm.skillCategory} onChange={updateCertField}>
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
                                                name="certificationName"
                                                value={certForm.certificationName}
                                                onChange={updateCertField}
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
                                                name="issuingOrganization"
                                                value={certForm.issuingOrganization}
                                                onChange={updateCertField}
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
                                                name="certificateNumber"
                                                value={certForm.certificateNumber}
                                                onChange={updateCertField}
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
                                                name="issueDate"
                                                value={certForm.issueDate}
                                                onChange={updateCertField}
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
                                                name="expiryDate"
                                                value={certForm.expiryDate}
                                                onChange={updateCertField}
                                             />
                                        </div>

                                        <div className="col-md-12">

                                            <label className="form-label">
                                                Certificate File
                                            </label>

                                            <label className="esc-file-upload">

                                                <i className="bi bi-cloud-arrow-up"></i>

                                                <span>
                                                    <strong>{certFile ? certFile.name : "Choose certificate"}</strong>
                                                    <small>PDF, JPG or PNG</small>
                                                </span>

                                                <input
                                                    type="file"
                                                    id="escCertificationFile"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={pickCertFile}
                                                 />

                                            </label>

                                        </div>

                                    </div>

                                </div>

                                <div className="modal-footer esc-modal-footer">

                                    {certFeedback.text && <span className={`me-auto small text-${certFeedback.type}`}>{certFeedback.text}</span>}

                                    <button
                                        type="button"
                                        className="btn esc-cancel-btn"
                                        onClick={closeCert}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        className="btn esc-btn-primary"
                                        id="escSaveCertificationBtn"
                                        onClick={saveCertification}
                                        disabled={certSubmitting}
                                    >
                                        <i className="bi bi-check-lg"></i>
                                        {certSubmitting ? "Saving..." : "Save Certification"}
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
