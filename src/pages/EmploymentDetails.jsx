import React, { useState, useEffect } from "react";

export default function EmploymentDetails({ employeeProfile, currentUser }) {
  const [profile, setProfile] = useState(employeeProfile || {});
  const [workMode, setWorkMode] = useState(employeeProfile?.work_mode || 'Hybrid');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (employeeProfile && Object.keys(employeeProfile).length > 0) {
      setProfile(employeeProfile);
      if (employeeProfile.work_mode) setWorkMode(employeeProfile.work_mode);
    }
  }, [employeeProfile]);

  useEffect(() => {
    if (currentUser?.id) {
      fetch(`http://localhost:5002/api/employee/profile/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
          if (!data.message) {
            setProfile(data);
            if (data.work_mode) setWorkMode(data.work_mode);
          }
        })
        .catch(console.error);
    }
  }, [currentUser]);

  useEffect(() => {
    if (profile.work_mode) {
      setWorkMode(profile.work_mode);
    }
  }, [profile.work_mode]);

  const handleUpdateWorkMode = async (mode) => {
    if (!profile.employee_id) return;
    setUpdating(true);
    try {
      const response = await fetch(`http://localhost:5002/api/employee/${profile.employee_id}/work-mode`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ work_mode: mode })
      });
      if (response.ok) {
        setWorkMode(mode); window.location.reload();
        // Optionally, if there's a global refresh function passed as prop, call it here
      } else {
        console.error("Failed to update work mode");
      }
    } catch (error) {
      console.error("Error updating work mode:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Formatter helper
  const formatDate = (dateString) => {
    if (!dateString) return "--";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  const getInitials = (f, l) => {
    return `${f ? f[0] : ''}${l ? l[0] : ''}`.toUpperCase() || 'EMP';
  };

  // Dynamic calculation for probation and confirmation based on joining_date, probation_period and probation_status
  const calculateProbationInfo = () => {
    const period = profile.probation_period || '3 Month';
    const match = String(period).match(/\d+/);
    const months = match ? parseInt(match[0], 10) : 3;

    let endDate = profile.probation_end_date;
    if (!endDate && profile.joining_date) {
      const d = new Date(profile.joining_date);
      if (!isNaN(d.getTime())) {
        const end = new Date(d);
        end.setMonth(end.getMonth() + months);
        endDate = end.toISOString().split('T')[0];
      }
    }

    let confirmDate = null;
    const status = (profile.probation_status || '').toLowerCase();
    if (status === 'completed' || status === 'confirmed') {
      if (profile.confirmation_date) {
        confirmDate = profile.confirmation_date;
      } else if (endDate) {
        confirmDate = endDate;
      }
    }

    return {
      period,
      endDate,
      confirmDate
    };
  };

  const probationDetails = calculateProbationInfo();

  // Dynamic calculation of Employment Profile completion percentage
  const section1Fields = [
    { label: 'Employee ID', value: profile.employee_code },
    { label: 'Employee Type', value: profile.employment_type },
    { label: 'Employment Status', value: profile.status || 'Active' },
    { label: 'Joining Date', value: profile.joining_date }
  ];

  const section2Fields = [
    { label: 'Probation Period', value: probationDetails.period },
    { label: 'Probation End Date', value: probationDetails.endDate },
    { label: 'Confirmation Date', value: probationDetails.confirmDate }
  ];

  const section3Fields = [
    { label: 'Department', value: profile.department },
    { label: 'Team', value: profile.team },
    { label: 'Designation', value: profile.designation },
    { label: 'Location', value: profile.location || profile.city }
  ];

  const section4Fields = [
    { label: 'Work Mode', value: workMode || profile.work_mode }
  ];

  const section5Fields = [
    { label: 'Reporting Manager', value: profile.reporting_manager_name || 'Maruthi Vara Prasad' },
    { label: 'HR Manager', value: profile.hr_manager_name || profile.hr_manager_id },
    { label: 'Shift', value: profile.shift }
  ];

  const allSections = [
    { name: 'Employment Overview', fields: section1Fields },
    { name: 'Probation & Confirmation', fields: section2Fields },
    { name: 'Organization Placement', fields: section3Fields },
    { name: 'Work Arrangement', fields: section4Fields },
    { name: 'Reporting Structure', fields: section5Fields }
  ];

  const isFieldComplete = (val) => {
    if (!val) return false;
    const str = String(val).trim();
    if (str === '' || str === '--' || str.toLowerCase().includes('mock') || str === 'N/A') return false;
    return true;
  };

  const totalFields = allSections.reduce((acc, sec) => acc + sec.fields.length, 0);
  const completedFields = allSections.reduce((acc, sec) => {
    return acc + sec.fields.filter(f => isFieldComplete(f.value)).length;
  }, 0);

  const completionPercentage = Math.round((completedFields / totalFields) * 100);
  const incompleteSections = allSections.filter(sec => sec.fields.some(f => !isFieldComplete(f.value)));

  return (
    <>
      <main className="dashboard-wrapper">
        <div className="dashboard-container">
          <div className="px-0 px-md-5 employee-dashboard">
            <div className="employment-details-page">

              {/* Header */}
              <div className="employment-page-intro">
                <div>
                  <h1>Employment Details</h1>
                  <p>Employment profile and organizational details for this employee.</p>
                </div>
                <button type="button" className="epd-upload-btn" id="epdHeaderUploadBtn">
                  <i className="bi bi-eye"></i> View-only profile
                </button>
              </div>

              {/* Employee Quick Info Card */}
              <div className="esc-employee-bar">
                <div className="esc-employee-main">
                  <div className="esc-avatar">
                    {getInitials(profile.first_name, profile.last_name)}
                  </div>
                  <div className="esc-employee-info">
                    <div className="esc-name-row">
                      <h3>{profile.first_name || 'Employee'} {profile.last_name || 'Name'}</h3>
                      <span className="esc-status-badge"><span></span>Active</span>
                    </div>
                    <p>{profile.designation || 'Role Not Assigned'}</p>
                    <div className="esc-employee-meta">
                      <span><i className="bi bi-diagram-3"></i>{profile.department || 'N/A'}</span>
                      <span><i className="bi bi-code-slash"></i>{profile.team || 'Backend'}</span>
                      <span><i className="bi bi-person-badge"></i>{profile.employee_code || 'EMP-000'}</span>
                    </div>
                  </div>
                </div>
                <div className="esc-employee-side">
                  <span className="esc-side-label">Profile Area</span>
                  <strong>Employment Details</strong>
                </div>
              </div>

              <div className="row g-4 align-items-start">
                {/* Main Content */}
                <div className="col-xl-8">
                  <div className="employment-main-card">

                    {/* Section 1: Employment Overview */}
                    <div className="employment-section">
                      <div className="employment-section-heading common-card-heading">
                        <div className="employment-section-icon"><i className="bi bi-person-vcard"></i></div>
                        <div>
                          <h3>Employment Overview</h3>
                          <p>Employee type, status and joining information.</p>
                        </div>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="employment-label">Employee ID</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-fingerprint"></i>
                            <span className="employment-control employment-readonly-value">{profile.employee_code || '--'}</span>
                          </div>
                          <div className="employment-helper">Unique identification number for this employee.</div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Employee Type</label>
                          <div className="employment-control employment-readonly-value">{profile.employment_type || 'Permanent'}</div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Employment Status</label>
                          <div className="employment-control employment-readonly-value">Active</div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Joining Date</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-calendar3"></i>
                            <span className="employment-control employment-readonly-value">{formatDate(profile.joining_date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Probation & Confirmation */}
                    <div className="employment-section">
                      <div className="employment-section-heading common-card-heading">
                        <div className="employment-section-icon"><i className="bi bi-hourglass-split"></i></div>
                        <div>
                          <h3>Probation & Confirmation</h3>
                          <p>Probation and confirmation dates on record.</p>
                        </div>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-4">
                          <label className="employment-label">Probation Period</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-calendar-check"></i>
                            <span className="employment-control employment-readonly-value">{probationDetails.period}</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className="employment-label">Probation End Date</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-calendar-check"></i>
                            <span className="employment-control employment-readonly-value">{formatDate(probationDetails.endDate)}</span>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <label className="employment-label">Confirmation Date</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-patch-check"></i>
                            <span className="employment-control employment-readonly-value">{formatDate(probationDetails.confirmDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Organization Placement */}
                    <div className="employment-section">
                      <div className="employment-section-heading common-card-heading">
                        <div className="employment-section-icon"><i className="bi bi-diagram-3"></i></div>
                        <div>
                          <h3>Organization Placement</h3>
                          <p>Department, team, designation and primary work location.</p>
                        </div>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="employment-label">Department</label>
                          <div className="employment-select-wrapper">
                            <i className="bi bi-building"></i>
                            <span className="employment-control employment-readonly-value employment-select-with-icon">{profile.department || '--'}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Team</label>
                          <div className="employment-select-wrapper">
                            <i className="bi bi-people"></i>
                            <span className="employment-control employment-readonly-value employment-select-with-icon">{profile.team || '--'}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Designation</label>
                          <div className="employment-select-wrapper">
                            <i className="bi bi-award"></i>
                            <span className="employment-control employment-readonly-value employment-select-with-icon">{profile.designation || '--'}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Location</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-geo-alt"></i>
                            <span className="employment-control employment-readonly-value">{profile.location || profile.city || '--'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Work Arrangement */}
                    <div className="employment-section">
                      <div className="employment-section-heading common-card-heading">
                        <div className="employment-section-icon"><i className="bi bi-laptop"></i></div>
                        <div>
                          <h3>Work Arrangement</h3>
                          <p>Current work arrangement on record.</p>
                        </div>
                      </div>
                      <div className="work-mode-options">
                        <div style={{cursor: 'pointer'}} onClick={() => handleUpdateWorkMode('Office')} className={`work-mode-card ${workMode === 'Office' ? 'is-selected' : ''}`}>
                          <span className="work-mode-content">
                            <span className="work-mode-icon"><i className="bi bi-building"></i></span>
                            <span><strong>Office</strong><small>Works from the office</small></span>
                            {workMode === 'Office' && <span className="work-mode-check"><i className="bi bi-check2"></i></span>}
                          </span>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => handleUpdateWorkMode('Remote')} className={`work-mode-card ${workMode === 'Remote' ? 'is-selected' : ''}`}>
                          <span className="work-mode-content">
                            <span className="work-mode-icon"><i className="bi bi-house"></i></span>
                            <span><strong>Remote</strong><small>Works remotely</small></span>
                            {workMode === 'Remote' && <span className="work-mode-check"><i className="bi bi-check2"></i></span>}
                          </span>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => handleUpdateWorkMode('Hybrid')} className={`work-mode-card ${workMode === 'Hybrid' || !workMode ? 'is-selected' : ''}`}>
                          <span className="work-mode-content">
                            <span className="work-mode-icon"><i className="bi bi-arrow-left-right"></i></span>
                            <span><strong>Hybrid</strong><small>Office + remote</small></span>
                            {(workMode === 'Hybrid' || !workMode) && <span className="work-mode-check"><i className="bi bi-check2"></i></span>}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Section 5: Reporting Structure */}
                    <div className="employment-section">
                      <div className="employment-section-heading common-card-heading">
                        <div className="employment-section-icon"><i className="bi bi-person-lines-fill"></i></div>
                        <div>
                          <h3>Reporting Structure</h3>
                          <p>Reporting and HR contacts, plus the assigned shift.</p>
                        </div>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label className="employment-label">Reporting Manager</label>
                          <div className="employment-manager-field">
                            <div className="employment-manager-avatar">{getInitials(profile.reporting_manager_name || 'Maruthi Vara Prasad')}</div>
                            <span className="employment-control employment-readonly-value">{profile.reporting_manager_name || 'Maruthi Vara Prasad'}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">HR Manager</label>
                          <div className="employment-manager-field">
                            <div className="employment-manager-avatar employment-manager-avatar-hr">HR</div>
                            <span className="employment-control employment-readonly-value">{profile.hr_manager_name || (profile.hr_manager_id ? `HR ID: ${profile.hr_manager_id}` : '--')}</span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label className="employment-label">Shift</label>
                          <div className="employment-input-icon">
                            <i className="bi bi-clock"></i>
                            <span className="employment-control employment-readonly-value employment-select-with-icon">{profile.shift || 'General Shift - 09:00 AM - 06:00 PM'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="employment-record-footer">
                      <i className="bi bi-eye" aria-hidden="true"></i> Employee record � View only
                    </div>
                  </div>
                </div>

                {/* Sidebar Content */}
                <div className="col-xl-4">
                  <aside className="employment-side-wrapper">
                    {/* Progress Card */}
                    <div className="employment-completion-card mb-4">
                      <div className="employment-completion-top">
                        <div>
                          <span>EMPLOYMENT PROFILE</span>
                          <strong>{completionPercentage}%</strong>
                        </div>
                        <div className="employment-completion-ring">
                          {completionPercentage === 100 ? (
                            <i className="bi bi-check2"></i>
                          ) : (
                            <i className="bi bi-hourglass-split"></i>
                          )}
                        </div>
                      </div>
                      <div className="employment-progress">
                        <span style={{width: `${completionPercentage}%`}}></span>
                      </div>
                      <p>
                        {completionPercentage === 100 
                          ? "Employee details are on file." 
                          : `${completedFields} of ${totalFields} details verified (${incompleteSections.length} section${incompleteSections.length > 1 ? 's' : ''} incomplete).`}
                      </p>
                    </div>

                    {/* Summary Card */}
                    <div className="employment-summary-card">
                      <div className="employment-summary-header common-card-heading">
                        <div>
                          <span className="employment-summary-eyebrow">EMPLOYEE PROFILE</span>
                          <h3>Employment Snapshot</h3>
                        </div>
                        <div className="employment-summary-icon"><i className="bi bi-briefcase"></i></div>
                      </div>
                      <div className="employment-summary-profile">
                        <div className="employment-summary-avatar">{getInitials(profile.first_name, profile.last_name)}</div>
                        <div>
                          <strong>{profile.first_name || 'Employee'} {profile.last_name || 'Name'}</strong>
                          <span>{profile.employee_code || 'EMP-000'}</span>
                        </div>
                      </div>
                      <div className="employment-summary-status">
                        <div>
                          <span className="employment-mini-label">Current Status</span>
                          <strong>Active</strong>
                        </div>
                        <span className="employment-summary-status-badge"><span></span>Active</span>
                      </div>
                      <div className="employment-summary-list">
                        <div className="employment-summary-item">
                          <span className="employment-summary-item-icon"><i className="bi bi-building"></i></span>
                          <div><small>Department</small><strong>{profile.department || '--'}</strong></div>
                        </div>
                        <div className="employment-summary-item">
                          <span className="employment-summary-item-icon"><i className="bi bi-award"></i></span>
                          <div><small>Designation</small><strong>{profile.designation || '--'}</strong></div>
                        </div>
                        <div className="employment-summary-item">
                          <span className="employment-summary-item-icon"><i className="bi bi-person"></i></span>
                          <div><small>Reporting Manager</small><strong>{profile.reporting_manager_name || 'Maruthi Vara Prasad'}</strong></div>
                        </div>
                        <div className="employment-summary-item">
                          <span className="employment-summary-item-icon"><i className="bi bi-geo-alt"></i></span>
                          <div><small>Location</small><strong>{profile.location || profile.city || '--'}</strong></div>
                        </div>
                        <div className="employment-summary-item">
                          <span className="employment-summary-item-icon"><i className="bi bi-laptop"></i></span>
                          <div><small>Work Mode</small><strong>{workMode || 'Hybrid'}</strong></div>
                        </div>
                        <div className="employment-summary-item">
                          <span className="employment-summary-item-icon"><i className="bi bi-calendar3"></i></span>
                          <div><small>Joining Date</small><strong>{formatDate(profile.joining_date)}</strong></div>
                        </div>
                      </div>
                    </div>

                    <div className="employment-tip-card mt-4">
                      <div className="employment-tip-icon"><i className="bi bi-stars"></i></div>
                      <div>
                        <h4>Employment record</h4>
                        <p>This snapshot shows the employee's current role, reporting line, work location and employment dates.</p>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}
