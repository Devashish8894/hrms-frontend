
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Chart from "react-apexcharts";

export default function Attendance({ currentUser, employeeProfile }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date();
    const m = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}`;
    setMonth(m);
  }, []);

  useEffect(() => {
    if (!currentUser || !month) return;
    const fetchReport = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5002/api/attendance/page/${currentUser.id}?month=${month}`);
        const data = await res.json();
        setReport(data);

        // Default select current date
        const todayStr = new Date().toISOString().split('T')[0];
        const todayRecord = data.dailyRecords.find(r => new Date(r.date).toISOString().split('T')[0] === todayStr);
        if (todayRecord) setSelectedDate(todayRecord);
        else if (data.dailyRecords.length > 0) setSelectedDate(data.dailyRecords[data.dailyRecords.length - 1]);

      } catch (err) {
        console.error("Error fetching attendance report", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [currentUser, month]);

  if (!currentUser) return <div>Please wait...</div>;

  const totalDays = report?.dailyRecords?.length || 0;
  const presentCount = report?.kpis?.presentDays || 0;
  const leaveCount = report?.kpis?.leaveDays || 0;
  const absentCount = report?.kpis?.absentDays || 0;

  const chartCategories = (report?.dailyRecords || []).map(r => new Date(r.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }));
  const chartData = (report?.dailyRecords || []).map(r => r.hours);

  const donutSeries = [presentCount, leaveCount, absentCount];
  const donutOptions = {
    labels: ['Present', 'Leave', 'Absent'],
    colors: ['#1E90FF', '#ffc107', '#dc3545'],
    chart: { type: 'donut' },
    plotOptions: { pie: { donut: { size: '75%' } } },
    dataLabels: { enabled: false },
    legend: { show: false }
  };

  const areaOptions = {
    chart: { type: "area", height: 255, toolbar: { show: false }, zoom: { enabled: false } },
    dataLabels: { enabled: false },
    markers: { size: 4, colors: ["#fff"], strokeColors: "#1E90FF", strokeWidth: 2, hover: { size: 7 } },
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] } },
    xaxis: { categories: chartCategories, labels: { style: { colors: "#8a90a2", fontSize: "12px", fontFamily: "inherit" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: "#8a90a2", fontSize: "12px", fontFamily: "inherit" }, formatter: (val) => val + "h" } },
    grid: { borderColor: "#f1f1f1", strokeDashArray: 4, padding: { top: 0, right: 0, bottom: 0, left: 10 } },
    colors: ["#1E90FF"]
  };

  const filteredRecords = (report?.dailyRecords || []).filter(r => {
    if (statusFilter === "All Status") return true;
    if (statusFilter === "Present" && r.status === "Present") return true;
    if (statusFilter === "Absent" && r.status === "Absent") return true;
    if (statusFilter === "Leave" && r.status === "Leave") return true;
    return false;
  }).reverse(); // Show latest first in table

  return (
    <>
      <div className="epa-page">

                        
                        <div className="epa-page-header">
                            <div>

                                <h2 className="epa-title">Attendance</h2>
                                <p className="epa-subtitle">
                                    Track attendance, working hours, overtime and daily attendance status.
                                </p>
                            </div>

                            <div className="epa-header-actions">
                                <div>
                                    <button type="button" className="epd-upload-btn" id="epdHeaderUploadBtn">
                                        <i className="bi bi-cloud-arrow-up"></i>
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>

                        
                        <div className="esc-employee-bar">

                            <div className="esc-employee-main">

                                <div className="esc-avatar">
    {employeeProfile?.first_name?.charAt(0) || currentUser.email.charAt(0).toUpperCase()}
    {employeeProfile?.last_name?.charAt(0) || ""}
  </div>

                                <div className="esc-employee-info">
                                    <div className="esc-name-row">
                                        <h3>{employeeProfile?.first_name ? `${employeeProfile.first_name} ${employeeProfile.last_name || ''}` : currentUser?.email}</h3>
                                        <span className="esc-status-badge">
                                            <span></span>
                                            Active
                                        </span>
                                    </div>

                                    <p>{employeeProfile?.designation || "Employee"}</p>

                                    <div className="esc-employee-meta">
                                        <span>
                                            <i className="bi bi-diagram-3"></i>
                                            {employeeProfile?.department || "Department"}
                                        </span>
                                        <span>
                                            <i className="bi bi-geo-alt"></i>
                                            {employeeProfile?.city || "Location"}
                                        </span>
                                        <span>
                                            <i className="bi bi-person-badge"></i>
                                            {employeeProfile?.employee_code || "EMP-0000"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="esc-employee-side">
                                <span className="esc-side-label">Current Shift</span>
                                <strong>General Shift</strong> 
                                <strong>09:00 AM - 06:00 PM</strong> 
                                <div><strong>Today's Punch time : {!loading && report?.dailyRecords?.find(r => new Date(r.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0])?.checkIn ? new Date(report.dailyRecords.find(r => new Date(r.date).toISOString().split('T')[0] === new Date().toISOString().split('T')[0]).checkIn).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}) : "--"}</strong> </div>
                            </div>

                        </div>


                        
                        <div className="row g-4 epa-summary-row">

                            <div className="col-xl-3 col-md-6">
                                <div className="epa-summary-card">
                                    <div className="epa-summary-icon epa-purple">
                                        <i className="bi bi-person-check"></i>
                                    </div>

                                    <div>
                                        <span>Present Days</span><strong>{loading ? "..." : presentCount}</strong><small>of {totalDays} days in month</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="epa-summary-card">
                                    <div className="epa-summary-icon epa-green">
                                        <i className="bi bi-clock-history"></i>
                                    </div>

                                    <div>
                                        <span>Total Hours</span><strong>{loading ? "..." : report?.kpis?.totalHoursDisplay || "0h 00m"}</strong><small>This month</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="epa-summary-card">
                                    <div className="epa-summary-icon epa-orange">
                                        <i className="bi bi-calendar2-minus"></i>
                                    </div>

                                    <div>
                                        <span>Leave Days</span><strong>{loading ? "..." : leaveCount}</strong><small>Approved leave</small>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                <div className="epa-summary-card">
                                    <div className="epa-summary-icon epa-blue">
                                        <i className="bi bi-stopwatch"></i>
                                    </div>

                                    <div>
                                        <span>Overtime</span><strong>{loading ? "..." : report?.kpis?.overtimeDisplay || "0h 00m"}</strong><small>This month</small>
                                    </div>
                                </div>
                            </div>

                        </div>


                        
                        <div className="row g-4 epa-overview-row">

                            
                            <div className="col-xl-8">
                                <div className="epa-card epa-chart-card">

                                    <div className="epa-card-header common-card-heading">
                                        <div>
                                            <span className="epa-section-label">ATTENDANCE OVERVIEW</span>
                                            <h3>Daily Working Hours</h3>
                                            <p>Working hours recorded throughout the selected month.</p>
                                        </div>

                                        <div className="epa-chart-legend">
                                            <span>
                                                <i className="epa-dot epa-dot-hours"></i>
                                                Working Hours
                                            </span>

                                            <span>
                                                <i className="epa-dot epa-dot-overtime"></i>
                                                Overtime
                                            </span>
                                        </div>
                                    </div>

                                    {!loading && <Chart options={areaOptions} series={[{ name: "Hours", data: chartData }]} type="area" height={255} />}

                                </div>
                            </div>


                            
                            <div className="col-xl-4">
                                <div className="epa-card epa-breakdown-card">

                                    <div className="epa-card-header common-card-heading">
                                        <div>
                                            <span className="epa-section-label">MONTHLY STATUS</span>
                                            <h3>Attendance Breakdown</h3>
                                            <p>Attendance distribution for this month.</p>
                                        </div>
                                    </div>

                                    <div className="epa-donut-wrapper">
                                        <div id="epaAttendanceDonut">{!loading && <Chart options={donutOptions} series={donutSeries} type="donut" height={200} />}</div>

                                        <div className="epa-donut-center">
                                            <strong>{!loading ? Math.round((presentCount / ((presentCount + absentCount + leaveCount) || 1)) * 100) + "%" : "..."}</strong>
                                            <span>Attendance</span>
                                        </div>
                                    </div>

                                    <div className="epa-status-list">

                                        <div className="epa-status-item">
        <div>
            <span className="epa-status-dot present"></span>
            Present
        </div>
        <strong>{presentCount} Days</strong>
    </div>

                                        <div className="epa-status-item">
        <div>
            <span className="epa-status-dot leave"></span>
            Leave
        </div>
        <strong>{leaveCount} Days</strong>
    </div>

                                        <div className="epa-status-item">
        <div>
            <span className="epa-status-dot absent"></span>
            Absent
        </div>
        <strong>{absentCount} Days</strong>
    </div>

                                    </div>

                                </div>
                            </div>

                        </div>


                        
                        <div className="epa-card epa-records-card">

                            <div className="epa-card-header epa-record-header common-card-heading">

                                <div>
                                    <span className="epa-section-label">DAILY RECORDS</span>
                                    <h3>Employee Attendance</h3>
                                    <p>
                                        Daily check-in, check-out and working hour records.
                                    </p>
                                </div>

                                <div className="epa-record-actions">

                                    <div className="epa-search-box">
                                        <i className="bi bi-search"></i>
                                        <input type="text" id="epaAttendanceSearch"
                                            placeholder="Search date or status..." />
                                    </div>

                                    <select id="epaStatusFilter" className="form-select epa-filter-select">
                                        <option value="all">All Status</option>
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                        <option value="Leave">Leave</option>
                                    </select>

                                </div>

                            </div>


                            <div className="table-responsive epa-table-wrapper">

                                <table className="table epa-attendance-table">

                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Check In</th>
                                            <th>Check Out</th>
                                            <th>Hours</th>
                                            <th>Status</th>
                                            <th className="text-end">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody id="epaAttendanceTableBody">
  {loading && <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>}
  {!loading && filteredRecords.map((row, i) => (
    <tr key={i}>
      <td>
        <div className="fw-bold">{new Date(row.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
      </td>
      <td>
        {row.checkIn ? <><i className="bi bi-box-arrow-in-right text-primary me-2"></i>{new Date(row.checkIn).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})}</> : "--"}
      </td>
      <td>
        {row.checkOut ? <><i className="bi bi-box-arrow-right text-danger me-2"></i>{new Date(row.checkOut).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'})}</> : "--"}
      </td>
      <td className="fw-bold">{row.hoursDisplay}</td>
      <td>
        {row.status === 'Present' && <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2"><span className="me-1">?</span> Present</span>}
        {row.status === 'Leave' && <span className="badge bg-warning bg-opacity-10 text-warning rounded-pill px-3 py-2"><span className="me-1">?</span> Leave</span>}
        {row.status === 'Absent' && <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2"><span className="me-1">?</span> Absent</span>}
        {row.status === 'Holiday' && <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-pill px-3 py-2"><span className="me-1">?</span> Holiday ({row.holidayName || 'Weekend'})</span>}
        {row.status === '-' && <span className="text-muted">--</span>}
      </td>
      <td>
        <button type="button" className="btn btn-sm btn-light text-primary rounded-circle" style={{width:"32px", height:"32px", display:"flex", alignItems:"center", justifyContent:"center"}} onClick={() => { setSelectedDate(row); setShowModal(true); }}>
          <i className="bi bi-eye"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>

                                </table>

                            </div>

                        </div>


                        
                        
{showModal && selectedDate && createPortal(
  <>
    <div className="modal-backdrop fade show" style={{ zIndex: 9998, position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)" }}></div>
    <div className="modal fade show d-block" tabIndex="-1" style={{ zIndex: 9999, position: "fixed", top: 0, left: 0, width: "100%", height: "100%", overflowX: "hidden", overflowY: "auto", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowModal(false)}>
      <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "100%", maxWidth: "800px", margin: "1.75rem auto" }} onClick={e => e.stopPropagation()}>
        <div className="modal-content" style={{ border: 'none', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div className="modal-header d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid #eee', padding: '20px 24px' }}>
            <h5 className="modal-title mb-0" style={{ fontWeight: 600, fontSize: '18px', color: '#1a1d27' }}>Attendance Information</h5>
            <span className="badge rounded-pill" style={{ backgroundColor: '#f5f4fa', color: '#5b50a1', padding: '6px 12px', fontWeight: 500, fontSize: '13px' }}>
              {new Date(selectedDate.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}
            </span>
          </div>
          
          <div className="modal-body" style={{ padding: '24px' }}>
            <div className="row g-3">
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Date</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>{new Date(selectedDate.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Shift</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>General Shift</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Check-in</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>{selectedDate?.checkIn ? new Date(selectedDate.checkIn).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}) : "--"}</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Check-out</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>{selectedDate?.checkOut ? new Date(selectedDate.checkOut).toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}) : "--"}</div>
                </div>
              </div>

              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Break</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>{selectedDate?.status === 'Present' ? "01h 00m" : "--"}</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Total Hours</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>{selectedDate?.hoursDisplay || "--"}</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Overtime</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>{selectedDate && selectedDate.hours > 9 ? ((selectedDate.hours - 9)*60).toFixed(0) + "m" : "0m"}</div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Attendance Status</div>
                  <div style={{ fontWeight: 600, fontSize: '14px' }} className={`epa-detail-status ${selectedDate?.status?.toLowerCase()}`}>{selectedDate?.status || "--"}</div>
                </div>
              </div>

              <div className="col-12">
                <div className="p-3 rounded" style={{ border: '1px solid #eee' }}>
                  <div style={{ fontSize: '12px', color: '#8a90a2', marginBottom: '4px' }}>Remarks</div>
                  <div style={{ fontWeight: 600, color: '#1a1d27', fontSize: '14px' }}>Regular attendance</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer" style={{ borderTop: 'none', padding: '0 24px 24px 24px' }}>
            <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </>,
  document.body
)}

<div className="row g-4">

                            <div className="col-xl-7">

                                <div className="epa-card epa-attendance-insights">

                                    <div className="epa-card-header common-card-heading">
                                        <div>
                                            <span className="epa-section-label">ATTENDANCE INSIGHTS</span>
                                            <h3>This Month</h3>
                                            <p>Quick attendance observations for the employee.</p>
                                        </div>
                                    </div>

                                    <div className="row g-3">

                                        <div className="col-md-4">
                                            <div className="epa-insight-box">
                                                <div className="epa-insight-icon">
                                                    <i className="bi bi-alarm"></i>
                                                </div>

                                                <div>
                                                    <span>Average Check-in</span><strong>{report?.insights?.avgCheckIn || "--"}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="epa-insight-box">
                                                <div className="epa-insight-icon">
                                                    <i className="bi bi-hourglass-split"></i>
                                                </div>

                                                <div>
                                                    <span>Average Hours</span><strong>{report?.insights?.avgHoursDisplay || "--"}</strong>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="epa-insight-box">
                                                <div className="epa-insight-icon">
                                                    <i className="bi bi-exclamation-circle"></i>
                                                </div>

                                                <div>
                                                    <span>Late Arrivals</span><strong>{report?.insights?.lateDays || "0"} Days</strong>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className="col-xl-5">

                                <div className="epa-card epa-regularization-card">

                                    <div className="epa-card-header common-card-heading">
                                        <div>
                                            <span className="epa-section-label">REGULARIZATION</span>
                                            <h3>Attendance Requests</h3>
                                            <p>Recent attendance corrections.</p>
                                        </div>
                                    </div>

                                    <div className="epa-request-row">

                                        <div className="epa-request-icon">
                                            <i className="bi bi-pencil-square"></i>
                                        </div>

                                        <div className="epa-request-content">
                                            <strong>Attendance Correction</strong>
                                            <span>28-Aug-2026 · Check-out missing</span>
                                        </div>

                                        <span className="epa-request-status pending">
                                            Pending
                                        </span>

                                    </div>

                                    <div className="epa-request-row">

                                        <div className="epa-request-icon">
                                            <i className="bi bi-check2-circle"></i>
                                        </div>

                                        <div className="epa-request-content">
                                            <strong>Attendance Correction</strong>
                                            <span>19-Aug-2026 · Approved</span>
                                        </div>

                                        <span className="epa-request-status approved">
                                            Approved
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
    </>
  );
}
