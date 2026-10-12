
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

export default function Leaves({ currentUser, employeeProfile }) {
  const [data, setData] = useState({ balances: [], approvers: [], requests: [] });
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submittingLeave, setSubmittingLeave] = useState(false);
  const [leaveSubmitError, setLeaveSubmitError] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [viewLeave, setViewLeave] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  
  useEffect(() => {
      const closeDropdown = () => setOpenDropdownId(null);
      document.addEventListener('click', closeDropdown);
      return () => document.removeEventListener('click', closeDropdown);
  }, []);

  useEffect(() => {
    if (data.requests && data.requests.length > 0) {
      if (!selectedLeave) {
        setSelectedLeave(data.requests[0]);
      } else {
        const updatedSelected = data.requests.find(r => r.id === selectedLeave.id);
        if (updatedSelected) {
          setSelectedLeave(updatedSelected);
        }
      }
    }
  }, [data.requests]);
  
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [filterType, setFilterType] = useState('All Leave Type');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  
  const [formData, setFormData] = useState({
    leaveTypeId: '', approverId: '', startDate: '', endDate: '', reason: ''
  });
  const [daysCalculated, setDaysCalculated] = useState(0);

  const fetchData = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL || "https://hrms-backend-5xo8.onrender.com"}/api/leaves/data/${currentUser.id}`);
      const result = await res.json();
      if (result.error) {
          console.error(result.error);
          setData({ balances: [], approvers: [], requests: [] });
      } else {
          setData(result || { balances: [], approvers: [], requests: [] });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [currentUser]);

  // Calculate days when dates change
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end >= start) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setDaysCalculated(diffDays);
      } else {
        setDaysCalculated(0);
      }
    } else {
      setDaysCalculated(0);
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittingLeave(true);
    setLeaveSubmitError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || "https://hrms-backend-5xo8.onrender.com"}/api/leaves/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          leaveTypeId: formData.leaveTypeId,
          approverId: formData.approverId,
          startDate: formData.startDate,
          endDate: formData.endDate,
          days: daysCalculated,
          reason: formData.reason
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to submit leave request');
      setShowApplyModal(false);
      setFormData({ leaveTypeId: '', approverId: '', startDate: '', endDate: '', reason: '' });
      await fetchData();
    } catch (err) {
      setLeaveSubmitError(err.message || 'Unable to submit leave request');
    } finally {
      setSubmittingLeave(false);
    }
  };

  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const holidaysList = data.holidays || [];
  const totalHolidays = holidaysList.length > 0 ? holidaysList.length : 12;
  const passedHolidays = holidaysList.filter(h => new Date(h.holiday_date) < today);
  const upcomingHolidays = holidaysList.filter(h => new Date(h.holiday_date) >= today);

  const holidaysCompletedCount = passedHolidays.length > 0 ? passedHolidays.length : 10;
  const holidaysRemainingCount = upcomingHolidays.length > 0 ? upcomingHolidays.length : Math.max(0, totalHolidays - holidaysCompletedCount);
  const holidayCompletedPercent = Math.round((holidaysCompletedCount / totalHolidays) * 100);

  const computedBalances = (data.balances || []).map(b => {
      const typeName = b.leave_type_name;
      const actualUsed = (data.requests || [])
          .filter(r => r.leave_type === typeName && r.status === 'Approved')
          .reduce((sum, r) => sum + parseFloat(r.days_requested || 0), 0);
      const remaining = parseFloat(b.total_days || 0) - actualUsed;
      return { ...b, used_days: actualUsed, remaining_days: Number(remaining) === Math.floor(remaining) ? remaining.toString() : remaining.toFixed(2) };
  });

  const annualBalance = computedBalances.find(b => (b.leave_type_name || '').toLowerCase().includes('annual')) || {
      leave_type_name: 'Annual Leave', total_days: 18, used_days: 1, remaining_days: '17'
  };
  const sickBalance = computedBalances.find(b => (b.leave_type_name || '').toLowerCase().includes('sick')) || {
      leave_type_name: 'Sick Leave', total_days: 10, used_days: 0, remaining_days: '10'
  };

  const totalUsed = parseFloat(annualBalance.used_days || 0) + parseFloat(sickBalance.used_days || 0);

  const chartSeries = [
      parseFloat(annualBalance.used_days || 0),
      parseFloat(sickBalance.used_days || 0),
      holidaysCompletedCount
  ];
  const chartSum = chartSeries.reduce((a, b) => a + b, 0);

  const chartOptions = {
      chart: { type: 'donut', fontFamily: 'inherit' },
      labels: ['Annual Leave', 'Sick Leave', 'Public Holidays'],
      colors: ['#4e36f5', '#ff5b5b', '#ff9800'],
      dataLabels: { enabled: false },
      stroke: { width: 0 },
      plotOptions: {
          pie: {
              donut: {
                  size: '75%',
                  labels: {
                      show: true,
                      name: { show: true, color: '#888', fontSize: '14px' },
                      value: { show: true, fontSize: '24px', fontWeight: 'bold', color: '#333' },
                      total: {
                          show: true,
                          label: 'Days Used',
                          formatter: function () {
                              return chartSum;
                          }
                      }
                  }
              }
          }
      },
      legend: { show: false }
  };

  const scheduledLeaves = (data.requests || [])
      .filter(req => req.status !== 'Rejected')
      .map(req => {
          const startDate = new Date(req.start_date);
          const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
          const day = startDate.getDate();
          const startFmt = new Date(req.start_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-');
          const endFmt = new Date(req.end_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-');
          const dateStr = req.start_date === req.end_date ? startFmt : `${startFmt} to ${endFmt}`;
          const statusClass = req.status === 'Approved' ? 'approved' : req.status === 'Rejected' ? 'rejected' : 'pending';
          return {
              id: `leave-${req.id}`,
              date: startDate,
              day,
              month,
              title: req.leave_type,
              dateStr,
              days: req.days_requested,
              status: req.status,
              statusClass
          };
      });

  const scheduledHolidays = upcomingHolidays.map((h, i) => {
      const hDate = new Date(h.holiday_date);
      const month = hDate.toLocaleString('default', { month: 'short' }).toUpperCase();
      const day = hDate.getDate();
      const dateFmt = hDate.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-');
      return {
          id: `holiday-${h.id || i}`,
          date: hDate,
          day,
          month,
          title: `Public Holiday (${h.holiday_name})`,
          dateStr: dateFmt,
          days: 1,
          status: 'Pending',
          statusClass: 'pending'
      };
  });

  const upcomingRequests = [...scheduledLeaves, ...scheduledHolidays]
      .sort((a, b) => a.date - b.date)
      .slice(0, 3);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <>
      <main className="dashboard-wrapper">
        <div className="dashboard-container">

            
            

            <div className="px-0 px-md-5 employee-dashboard">

                <div id="profileLeave">

                    <div className="epl-page">

                        
                        <div className="epl-page-header">

                            <div>
                                <h2 className="epl-title">Leave Management</h2>

                                <p className="epl-subtitle">
                                    Manage leave balances, requests, approvals and leave history.
                                </p>
                            </div>

                            <div className="epl-header-actions">

                                <button type="button" className="btn" style={{ borderColor: '#4e36f5', color: '#4e36f5', backgroundColor: '#fff', fontWeight: '500', padding: '8px 16px', borderRadius: '6px' }} id="eplExportBtn" onClick={() => alert("Export functionality coming soon!")}><i className="bi bi-download"></i> Export</button>

                                <button type="button" className="btn" style={{ backgroundColor: '#4e36f5', color: '#fff', fontWeight: '500', padding: '8px 16px', borderRadius: '6px' }} id="eplApplyLeaveBtn" onClick={() => { setLeaveSubmitError(""); setShowApplyModal(true); }}><i className="bi bi-plus-lg"></i> Apply Leave</button>

                            </div>

                        </div>

                        
                        <div className="esc-employee-bar">

                            <div className="esc-employee-main">

                                <div className="esc-avatar">
        {employeeProfile?.first_name?.charAt(0) || currentUser?.email?.charAt(0)?.toUpperCase()}
        {employeeProfile?.last_name?.charAt(0) || ""}
    </div>

                                <div className="esc-employee-info">
                                    <div className="esc-name-row">
        <h3>{employeeProfile?.first_name ? `${employeeProfile.first_name} ${employeeProfile.last_name || ''}` : currentUser?.email}</h3>
        <span className="esc-status-badge"><span></span>Active</span>
    </div>

                                    <p className="esc-role">{employeeProfile?.designation || "Employee"}</p>

                                    <div className="esc-employee-meta">
        <span><i className="bi bi-diagram-3"></i> {employeeProfile?.department || "Department"}</span>
        <span><i className="bi bi-geo-alt"></i> {employeeProfile?.city || "Location"}</span>
        <span><i className="bi bi-person-badge"></i> {employeeProfile?.employee_code || "EMP-0000"}</span>
    </div>
                                </div>

                            </div>

                            <div className="esc-employee-side">
                                <span className="esc-side-label">Profile Area</span>
                                <strong>Leave Management</strong>
                            </div>

                        </div>


                        
                        <div className="row g-4 epl-summary-row">

                            {/* 1. Annual Leave Card */}
                            <div className="col-xl-4 col-md-6">
                                <div className="epl-balance-card annual">
                                    <div className="epl-balance-top">
                                        <div className="epl-balance-icon">
                                            <i className="bi bi-calendar-check"></i>
                                        </div>
                                        <span className="epl-balance-label">Annual Leave</span>
                                    </div>
                                    <div className="epl-balance-values">
                                        <strong>{annualBalance.remaining_days}</strong>
                                        <span>/ {Number(annualBalance.total_days) === Math.floor(annualBalance.total_days) ? annualBalance.total_days.toString().split(".")[0] : annualBalance.total_days} Days</span>
                                    </div>
                                    <div className="epl-progress-track">
                                        <div className="epl-progress-bar" style={{ width: `${Math.round((parseFloat(annualBalance.used_days) / (parseFloat(annualBalance.total_days) || 1)) * 100)}%` }}></div>
                                    </div>
                                    <div className="epl-balance-bottom d-flex justify-content-between align-items-center mt-2">
                                        <span>{annualBalance.remaining_days} days remaining</span>
                                        <strong>{Math.round((parseFloat(annualBalance.used_days) / (parseFloat(annualBalance.total_days) || 1)) * 100)}% used</strong>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Sick Leave Card */}
                            <div className="col-xl-4 col-md-6">
                                <div className="epl-balance-card sick">
                                    <div className="epl-balance-top">
                                        <div className="epl-balance-icon">
                                            <i className="bi bi-heart-pulse"></i>
                                        </div>
                                        <span className="epl-balance-label">Sick Leave</span>
                                    </div>
                                    <div className="epl-balance-values">
                                        <strong>{sickBalance.remaining_days}</strong>
                                        <span>/ {Number(sickBalance.total_days) === Math.floor(sickBalance.total_days) ? sickBalance.total_days.toString().split(".")[0] : sickBalance.total_days} Days</span>
                                    </div>
                                    <div className="epl-progress-track">
                                        <div className="epl-progress-bar" style={{ width: `${Math.round((parseFloat(sickBalance.used_days) / (parseFloat(sickBalance.total_days) || 1)) * 100)}%` }}></div>
                                    </div>
                                    <div className="epl-balance-bottom d-flex justify-content-between align-items-center mt-2">
                                        <span>{sickBalance.remaining_days} days remaining</span>
                                        <strong>{Math.round((parseFloat(sickBalance.used_days) / (parseFloat(sickBalance.total_days) || 1)) * 100)}% used</strong>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Public Holidays Card (Replaces Casual Leave) */}
                            <div className="col-xl-4 col-md-6">
                                <div className="epl-balance-card casual">
                                    <div className="epl-balance-top">
                                        <div className="epl-balance-icon">
                                            <i className="bi bi-calendar2-week"></i>
                                        </div>
                                        <span className="epl-balance-label">Public Holidays</span>
                                    </div>
                                    <div className="epl-balance-values">
                                        <strong>{holidaysCompletedCount}</strong>
                                        <span>/ {totalHolidays} Days</span>
                                    </div>
                                    <div className="epl-progress-track">
                                        <div className="epl-progress-bar" style={{ width: `${holidayCompletedPercent}%` }}></div>
                                    </div>
                                    <div className="epl-balance-bottom d-flex justify-content-between align-items-center mt-2">
                                        <span>{holidaysRemainingCount} days remaining</span>
                                        <strong>{holidayCompletedPercent}% Completed</strong>
                                    </div>
                                </div>
                            </div>

                        </div>


                        
                        <div className="row g-4 epl-overview-row">

                            
                            <div className="col-xl-7">

                                <div className="epl-card epl-utilization-card">

                                    <div className="epl-card-header common-card-heading">

                                        <div>
                                            <span className="epl-section-label">
                                                LEAVE OVERVIEW
                                            </span>

                                            <h3>Leave Utilization</h3>

                                            <p>
                                                Leave usage across available leave categories.
                                            </p>
                                        </div>

                                        <span className="epl-year-badge">
                                            2026
                                        </span>

                                    </div>

                                    <div className="epl-utilization-content">

                                        <div id="eplLeaveChart" className="d-flex justify-content-center align-items-center" style={{ width: '250px', margin: '0 auto' }}>
                                            <Chart options={chartOptions} series={chartSeries} type="donut" width="100%" />
                                        </div>

                                        <div className="epl-utilization-summary">

                                            <div className="epl-util-item">
                                                <span><i className="epl-dot annual"></i>Annual Leave</span>
                                                <strong>{annualBalance.used_days} / {annualBalance.total_days}</strong>
                                            </div>

                                            <div className="epl-util-item">
                                                <span><i className="epl-dot sick"></i>Sick Leave</span>
                                                <strong>{sickBalance.used_days} / {sickBalance.total_days}</strong>
                                            </div>

                                            <div className="epl-util-item">
                                                <span><i className="epl-dot casual"></i>Public Holidays</span>
                                                <strong>{holidaysCompletedCount} / {totalHolidays}</strong>
                                            </div>

                                            <div className="epl-util-total">
                                                <span>Total Leave Used</span>
                                                <strong>{chartSum} Days</strong>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            
                            <div className="col-xl-5">

                                <div className="epl-card epl-upcoming-card">

                                    <div className="epl-card-header common-card-heading">

                                        <div>
                                            <span className="epl-section-label">
                                                UPCOMING
                                            </span>

                                            <h3>Upcoming Leave</h3>

                                            <p>
                                                Scheduled leave for this employee.
                                            </p>
                                        </div>

                                    </div>

                                    {upcomingRequests.length > 0 ? upcomingRequests.map(req => (
                                        <div className="epl-upcoming-item" key={req.id}>
                                            <div className="epl-upcoming-date">
                                                <strong>{req.day}</strong>
                                                <span>{req.month}</span>
                                            </div>
                                            <div className="epl-upcoming-content">
                                                <strong>{req.title}</strong>
                                                <span>{req.dateStr}</span>
                                                <small>{req.days} Day{req.days > 1 ? 's' : ''}</small>
                                            </div>
                                            <span className={`epl-leave-status ${req.statusClass}`}>
                                                {req.status}
                                            </span>
                                        </div>
                                    )) : (
                                        <div className="text-muted p-3 text-center">No upcoming leaves</div>
                                    )}

                                </div>

                            </div>

                        </div>


                        
                        <div className="epl-card epl-history-card">

                            <div className="epl-card-header epl-history-header common-card-heading">

                                <div>

                                    <span className="epl-section-label">
                                        LEAVE HISTORY
                                    </span>

                                    <h3>Employee Leave Requests</h3>

                                    <p>
                                        Review all leave applications and approval details.
                                    </p>

                                </div>

                                <div className="epl-history-actions">

                                    <div className="epl-search-box">

                                        <i className="bi bi-search"></i>

                                        <input type="text" id="eplLeaveSearch" placeholder="Search leave type or reason..." />

                                    </div>

                                    <select id="eplStatusFilter" className="form-select epl-filter" value={filterStatus} onChange={e => {setFilterStatus(e.target.value); setCurrentPage(1);}}>
    <option value="All Status">All Status</option>
    <option value="Approved">Approved</option>
    <option value="Pending">Pending</option>
    <option value="Rejected">Rejected</option>
</select>

                                    <select id="eplTypeFilter" className="form-select epl-filter" value={filterType} onChange={e => {setFilterType(e.target.value); setCurrentPage(1);}}>
    <option value="All Leave Type">All Leave Type</option>
    {computedBalances.map(b => <option key={b.leave_type_id} value={b.leave_type_name}>{b.leave_type_name}</option>)}
</select>

                                </div>

                            </div>


                            <div className="table-responsive" style={{ overflow: 'visible' }}>

                                <table className="table epl-leave-table">

                                    <thead>

                                        <tr>

                                            <th>Leave Type</th>
                                            <th>From Date</th>
                                            <th>To Date</th>
                                            <th>Days</th>
                                            <th>Reason</th>
                                            <th>Approver</th>
                                            <th>Status</th>
                                            <th>Applied Date</th>
                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody id="eplLeaveTableBody">
{(() => {
    if (loading) return <tr><td colSpan={9} className="text-center py-3">Loading...</td></tr>;
    
    let filtered = (data.requests || []).filter(req => {
        let match = true;
        if (filterStatus !== 'All Status' && req.status !== filterStatus) match = false;
        if (filterType !== 'All Leave Type' && req.leave_type !== filterType) match = false;
        return match;
    });
    
    if (filtered.length === 0) return <tr><td colSpan={9} className="text-center py-3 text-muted">No leave requests found.</td></tr>;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    return paginated.map(req => {
        const statusClass = req.status === 'Approved' ? 'success' : req.status === 'Rejected' ? 'danger' : 'warning';
        const startFmt = new Date(req.start_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, ' ');
        const endFmt = new Date(req.end_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, ' ');
        const appliedFmt = new Date(req.created_at).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, ' ');
        const isAnnual = (req.leave_type || '').toLowerCase().includes('annual');
        const isSick = (req.leave_type || '').toLowerCase().includes('sick');
        const typeClass = isAnnual ? 'annual' : isSick ? 'sick' : 'casual';
        const typeIcon = isAnnual ? 'bi-calendar-check' : isSick ? 'bi-heart-pulse' : 'bi-calendar2-week';
        
        return (
            <tr key={req.id}>
                <td>
                    <div className="epl-leave-type">
                        <div className={`epl-type-icon ${typeClass}`}><i className={`bi ${typeIcon}`}></i></div>
                        <strong>{req.leave_type}</strong>
                    </div>
                </td>
                <td>{startFmt}</td>
                <td>{endFmt}</td>
                <td>{req.days_requested} Day(s)</td>
                <td><span className="text-truncate d-inline-block" style={{maxWidth: '150px'}} title={req.reason}>{req.reason || '--'}</span></td>
                <td>{req.approver_first ? `${req.approver_first} ${req.approver_last}` : '--'}</td>
                <td><span className={`badge bg-${statusClass} bg-opacity-10 text-${statusClass} rounded-pill px-3 py-2`}>{req.status}</span></td>
                <td>{appliedFmt}</td>
                <td>
                    <div style={{ position: 'relative' }}>
                          <button className="btn btn-sm btn-light border-0" style={{ backgroundColor: 'transparent', color: '#4e36f5', fontWeight: 'bold' }} type="button" onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === req.id ? null : req.id); setSelectedLeave(req); }}>
                              <i className="bi bi-three-dots"></i>
                          </button>
                          {openDropdownId === req.id && (
                              <ul className="dropdown-menu dropdown-menu-end shadow border-0 show" style={{ position: 'absolute', right: '100%', top: 0, minWidth: '150px', zIndex: 9999, display: 'block', marginRight: '5px' }}>
                                  <li>
                                      {req.status === 'Pending' ? (
                                          <button className="dropdown-item d-flex align-items-center gap-2 py-2 text-secondary" onClick={() => { setViewLeave(req); setIsEditMode(true); setOpenDropdownId(null); }}>
                                              <i className="bi bi-pencil" style={{fontSize: '14px'}}></i> Edit
                                          </button>
                                      ) : (
                                          <span className="dropdown-item d-flex align-items-center gap-2 py-2 text-muted" style={{ cursor: 'not-allowed' }} title="Can only edit pending leaves">
                                              <i className="bi bi-pencil" style={{fontSize: '14px'}}></i> Edit
                                          </span>
                                      )}
                                  </li>
                                  <li><button className="dropdown-item d-flex align-items-center gap-2 py-2 text-secondary" onClick={() => { setViewLeave(req); setIsEditMode(false); setOpenDropdownId(null); }}><i className="bi bi-eye" style={{fontSize: '14px'}}></i> View Details</button></li>
                                  <li><hr className="dropdown-divider m-0" /></li>
                                  <li><button className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" onClick={() => setOpenDropdownId(null)}><i className="bi bi-trash" style={{fontSize: '14px'}}></i> Cancel</button></li>
                              </ul>
                          )}
                      </div>
                </td>
            </tr>
        );
    });
})()}
</tbody>

                                </table>

                            </div>


                            <div className="epl-table-footer">
{(() => {
    const filtered = (data.requests || []).filter(req => {
        let match = true;
        if (filterStatus !== 'All Status' && req.status !== filterStatus) match = false;
        if (filterType !== 'All Leave Type' && req.leave_type !== filterType) match = false;
        return match;
    });
    const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
    
    return (
        <>
            <span>Showing {filtered.length === 0 ? 0 : startIndex + 1} to {endIndex} of {filtered.length} leave requests</span>
            <div className="epl-pagination">
                <button className={`epl-page-btn ${currentPage === 1 ? "disabled" : ""}`} disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><i className="bi bi-chevron-left"></i></button>
                {[...Array(totalPages)].map((_, i) => (
                    <button key={i} className={`epl-page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))}
                <button className={`epl-page-btn ${currentPage === totalPages ? "disabled" : ""}`} disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><i className="bi bi-chevron-right"></i></button>
            </div>
        </>
    );
})()}
</div>
</div>
</div>
</div>
<div className="row g-4">

                            <div className="col-xl-7">

                                <div className="epl-card epl-timeline-card">

                                    <div className="epl-card-header common-card-heading">

                                        <div>

                                            <span className="epl-section-label">
                                                APPROVAL FLOW
                                            </span>

                                            <h3>Leave Approval Timeline</h3>

                                            <p>
                                                Track the progress of the selected leave request.
                                            </p>

                                        </div>

                                    </div>


                                    <div className="epl-timeline">
{selectedLeave ? (
    <>
        <div className="epl-timeline-item completed">
            <div className="epl-timeline-icon"><i className="bi bi-check-lg"></i></div>
            <div className="epl-timeline-content">
                <strong>Leave Applied</strong>
                <span>{new Date(selectedLeave.created_at || selectedLeave.start_date).toLocaleString('en-GB', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</span>
                <small>Leave request submitted.</small>
            </div>
        </div>
        
        <div className="epl-timeline-line"></div>
        
        <div className={`epl-timeline-item ${selectedLeave.status === 'Approved' || selectedLeave.status === 'Rejected' ? 'completed' : 'pending'}`}>
            <div className="epl-timeline-icon">
                {selectedLeave.status === 'Approved' ? <i className="bi bi-check-lg"></i> : selectedLeave.status === 'Rejected' ? <i className="bi bi-x-lg"></i> : <i className="bi bi-hourglass-split"></i>}
            </div>
            <div className="epl-timeline-content">
                <strong>{selectedLeave.status === 'Approved' ? 'Manager Approved' : selectedLeave.status === 'Rejected' ? 'Manager Rejected' : 'Pending Manager Approval'}</strong>
                {selectedLeave.updated_at && <span>{new Date(selectedLeave.updated_at).toLocaleString('en-GB', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</span>}
                <small>{selectedLeave.status === 'Approved' ? `Approved by ${selectedLeave.approver_first || 'Manager'}` : selectedLeave.status === 'Rejected' ? `Rejected by ${selectedLeave.approver_first || 'Manager'}` : `Waiting for ${selectedLeave.approver_first || 'Manager'}`}</small>
            </div>
        </div>
        
        {selectedLeave.status !== 'Pending' && (
            <>
                <div className="epl-timeline-line"></div>
                <div className="epl-timeline-item completed">
                    <div className="epl-timeline-icon">
                        {selectedLeave.status === 'Approved' ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}
                    </div>
                    <div className="epl-timeline-content">
                        <strong>Leave {selectedLeave.status}</strong>
                        {selectedLeave.updated_at && <span>{new Date(selectedLeave.updated_at).toLocaleString('en-GB', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</span>}
                        <small>Leave request {selectedLeave.status.toLowerCase()} successfully.</small>
                    </div>
                </div>
            </>
        )}
    </>
) : (
    <div className="text-muted p-3">Select a leave request to view timeline</div>
)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5">

                                <div className="epl-card epl-policy-card">

                                    <div className="epl-card-header common-card-heading">

                                        <div>

                                            <span className="epl-section-label">
                                                LEAVE POLICY
                                            </span>

                                            <h3>Leave Information</h3>

                                        </div>

                                    </div>


                                    <div className="epl-policy-list">
                                        <div>
                                            <span>Annual Leave</span>
                                            <strong>{Number(annualBalance.total_days) === Math.floor(annualBalance.total_days) ? annualBalance.total_days.toString().split(".")[0] : annualBalance.total_days} Days / Year</strong>
                                        </div>
                                        <div>
                                            <span>Sick Leave</span>
                                            <strong>{Number(sickBalance.total_days) === Math.floor(sickBalance.total_days) ? sickBalance.total_days.toString().split(".")[0] : sickBalance.total_days} Days / Year</strong>
                                        </div>
                                        <div>
                                            <span>Public Holidays</span>
                                            <strong>{totalHolidays} Days / Year</strong>
                                        </div>
                                        <div>
                                            <span>Carry Forward</span>
                                            <strong>Up to 5 Days</strong>
                                        </div>
                                    </div>
                                    <div className="epl-policy-note">
                                        <i className="bi bi-info-circle"></i>
                                        <span>Leave balances are calculated according to the employee's assigned leave policy.</span>
                                    </div>
                                </div>
</div>
</div>

                    </div>
                </div>


                

                <div className="modal fade" id="eplApplyLeaveModal" tabindex="-1">

                    <div className="modal-dialog modal-dialog-centered modal-lg">

                        <div className="modal-content epl-modal">

                            <div className="modal-header">

                                <div>
                                    <span className="epl-section-label">
                                        LEAVE REQUEST
                                    </span>

                                    <h5 className="modal-title">
                                        Apply Leave
                                    </h5>
                                </div>

                                <button type="button" className="btn-close" data-bs-dismiss="modal">
                                </button>

                            </div>


                            <div className="modal-body">

                                <div className="row g-4">

                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Leave Type
                                        </label>

                                        <select id="eplApplyType" className="form-select">

                                            <option value="">
                                                Select Leave Type
                                            </option>

                                            <option>
                                                Annual Leave
                                            </option>

                                            <option>
                                                Sick Leave
                                            </option>

                                            <option>
                                                Casual Leave
                                            </option>

                                        </select>

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Approver
                                        </label>

                                        <select className="form-select">

                                            <option>
                                                Priya Sharma
                                            </option>

                                            <option>
                                                Anita Rao
                                            </option>

                                        </select>

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            From Date
                                        </label>

                                        <input type="date" id="eplApplyFrom" className="form-control" />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            To Date
                                        </label>

                                        <input type="date" id="eplApplyTo" className="form-control" />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Number of Days
                                        </label>

                                        <input type="text" id="eplApplyDays" className="form-control" placeholder="Automatically calculated" readOnly />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Supporting Document
                                        </label>

                                        <input type="file" className="form-control" />

                                    </div>


                                    <div className="col-12">

                                        <label className="form-label">
                                            Reason
                                        </label>

                                        <textarea className="form-control" rows="3"
                                            placeholder="Enter reason for leave"></textarea>

                                    </div>

                                </div>

                            </div>


                            <div className="modal-footer">

                                <button type="button" className="btn epl-cancel-btn" data-bs-dismiss="modal">
                                    Cancel
                                </button>

                                <button type="button" className="btn epl-primary-btn" id="eplSubmitLeave">
                                    Submit Leave
                                </button>

                            </div>

                        </div>

                    </div>
</div>
</main>

      {/* Dynamic Apply Leave Modal (overriding the bootstrap one in HTML if it was there) */}
      {showApplyModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content epl-modal">
              <div className="modal-header">
    <div>
        <span className="epl-section-label">LEAVE REQUEST</span>
        <h5 className="modal-title">Apply Leave</h5>
    </div>
    <button type="button" className="btn-close" onClick={() => setShowApplyModal(false)} aria-label="Close"></button>
</div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row g-4">
                    {leaveSubmitError && <div className="col-12"><div className="alert alert-danger mb-0" role="alert">{leaveSubmitError}</div></div>}
                    <div className="col-md-6">
                      <label className="form-label">Leave Type</label>
                      <select className="form-select" required value={formData.leaveTypeId} onChange={e => setFormData({...formData, leaveTypeId: e.target.value})}>
                        <option value="">Select Leave Type</option>
                        {computedBalances.map(b => <option key={b.leave_type_id} value={b.leave_type_id}>{b.leave_type_name}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Approver</label>
                      <select className="form-select" required value={formData.approverId} onChange={e => setFormData({...formData, approverId: e.target.value})}>
                        <option value="">Select Approver</option>
                        {(data.approvers || []).map(a => <option key={a.id} value={a.id}>{a.first_name} {a.last_name} ({a.role_name})</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">From Date</label>
                      <input type="date" className="form-control" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">To Date</label>
                      <input type="date" className="form-control" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Number of Days</label>
                      <input type="text" className="form-control" readOnly value={daysCalculated > 0 ? `${daysCalculated} Day(s)` : 'Automatically calculated'} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Supporting Document</label>
                      <input type="file" className="form-control" />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Reason</label>
                      <textarea className="form-control" rows="3" placeholder="Enter reason for leave" required value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}></textarea>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn epl-cancel-btn" onClick={() => setShowApplyModal(false)}>Cancel</button>
                  <button type="submit" className="btn epl-primary-btn" disabled={submittingLeave}>{submittingLeave ? "Submitting..." : "Submit Leave"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    
      {/* View / Edit Leave Details Modal */}
      {viewLeave && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1055 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content epl-modal border-0 shadow" style={{ borderRadius: '12px' }}>
              <div className="modal-header border-0 pb-0 pt-4 px-4">
                <h5 className="modal-title fw-bold" style={{ color: '#24263d', fontSize: '18px' }}>Leave Information</h5>
                <button type="button" className="btn-close" onClick={() => setViewLeave(null)}></button>
              </div>
              <div className="modal-body px-4 pb-4 pt-3">
                  <div className="row g-3">
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Leave Type</small>
                              {isEditMode ? (
                                  <select className="form-select form-select-sm border-0 px-0 fw-bold shadow-none" value={viewLeave.leave_type || ''} onChange={(e) => setViewLeave({...viewLeave, leave_type: e.target.value})}>
                                      <option value="Annual Leave">Annual Leave</option>
                                      <option value="Sick Leave">Sick Leave</option>
                                      <option value="Casual Leave">Casual Leave</option>
                                  </select>
                              ) : (
                                  <strong className="d-block text-dark">{viewLeave.leave_type || '--'}</strong>
                              )}
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>From Date</small>
                              {isEditMode ? (
                                  <input type="date" className="form-control form-control-sm border-0 px-0 fw-bold shadow-none" value={viewLeave.start_date ? new Date(viewLeave.start_date).toISOString().split('T')[0] : ''} onChange={(e) => setViewLeave({...viewLeave, start_date: e.target.value})} />
                              ) : (
                                  <strong className="d-block text-dark">{viewLeave.start_date ? new Date(viewLeave.start_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-') : '--'}</strong>
                              )}
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>To Date</small>
                              {isEditMode ? (
                                  <input type="date" className="form-control form-control-sm border-0 px-0 fw-bold shadow-none" value={viewLeave.end_date ? new Date(viewLeave.end_date).toISOString().split('T')[0] : ''} onChange={(e) => setViewLeave({...viewLeave, end_date: e.target.value})} />
                              ) : (
                                  <strong className="d-block text-dark">{viewLeave.end_date ? new Date(viewLeave.end_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-') : '--'}</strong>
                              )}
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Number of Days</small>
                              <strong className="d-block text-dark">{viewLeave.days_requested || '--'} Days</strong>
                          </div>
                      </div>
      
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Approver</small>
                              <strong className="d-block text-dark">{viewLeave.approver_first ? `${viewLeave.approver_first} ${viewLeave.approver_last || ''}` : 'Admin User'}</strong>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Applied Date</small>
                              <strong className="d-block text-dark">{viewLeave.created_at ? new Date(viewLeave.created_at).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-') : '--'}</strong>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Approved Date</small>
                              <strong className="d-block text-dark">{viewLeave.updated_at && viewLeave.status !== 'Pending' ? new Date(viewLeave.updated_at).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(/ /g, '-') : '--'}</strong>
                          </div>
                      </div>
                      <div className="col-md-3">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Supporting Document</small>
                              <strong className="d-block text-dark">Not Required</strong>
                          </div>
                      </div>
      
                      <div className="col-12">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Reason</small>
                              {isEditMode ? (
                                  <textarea className="form-control form-control-sm border-0 px-0 fw-bold shadow-none" rows="2" value={viewLeave.reason || ''} onChange={(e) => setViewLeave({...viewLeave, reason: e.target.value})}></textarea>
                              ) : (
                                  <strong className="d-block text-dark">{viewLeave.reason || '--'}</strong>
                              )}
                          </div>
                      </div>
      
                      <div className="col-12">
                          <div className="p-3 rounded" style={{ border: '1px solid #eaeaea' }}>
                              <small className="text-muted d-block mb-1" style={{ fontSize: '13px' }}>Comments</small>
                              <strong className="d-block text-dark">{viewLeave.status === 'Approved' ? 'Approved by reporting manager.' : (viewLeave.status === 'Rejected' ? 'Rejected by manager.' : 'Waiting for manager approval.')}</strong>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="modal-footer border-0 px-4 pb-4 pt-0">
                  {!isEditMode ? (
                      <>
                          {viewLeave.status === 'Pending' && (
                              <button type="button" className="btn btn-outline-secondary px-4 fw-medium rounded-3 d-flex align-items-center gap-2" onClick={() => setIsEditMode(true)}>
                                  <i className="bi bi-pencil"></i> Edit
                              </button>
                          )}
                          <button type="button" className="btn text-white px-4 fw-medium rounded-3 ms-auto" style={{ backgroundColor: '#4e36f5' }} onClick={() => setViewLeave(null)}>
                              Close
                          </button>
                      </>
                  ) : (
                      <>
                          <button type="button" className="btn btn-outline-secondary px-4 fw-medium rounded-3" onClick={() => setIsEditMode(false)}>
                              Cancel
                          </button>
                          <button type="button" className="btn text-white px-4 fw-medium rounded-3 d-flex align-items-center gap-2 ms-auto" style={{ backgroundColor: '#4e36f5' }} onClick={async () => {
                              try {
                                  const res = await fetch(`${import.meta.env.VITE_API_URL || "https://hrms-backend-5xo8.onrender.com"}/api/leaves/update/${viewLeave.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({
                                          leave_type: viewLeave.leave_type,
                                          start_date: viewLeave.start_date,
                                          end_date: viewLeave.end_date,
                                          reason: viewLeave.reason
                                      })
                                  });
                                  if (res.ok) {
                                      setIsEditMode(false);
                                      setViewLeave(null);
                                      fetchData();
                                  } else {
                                      alert("Failed to save changes");
                                  }
                              } catch (err) {
                                  console.error(err);
                                  alert("Error saving changes");
                              }
                          }}>
                              <i className="bi bi-check2"></i> Save changes
                          </button>
                      </>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      </>
  );
}
