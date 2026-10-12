import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './ems-styles.css';
import EmployeeTemplate from './EmployeeTemplate';

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost';
const API_BASE = 'http://localhost:5002';

const DEFAULT_EMPLOYEE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  roleKey: 'SOFTWARE_ENGINEER',
  department: 'Engineering',
  designation: 'Developer',
};

const ADMIN_ROLES = ['admin', 'org_admin', 'super_admin', 'hr'];

export default function App() {
  // ============================================================
  // AUTHENTICATION STATE
  // ============================================================

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hrms_user');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Failed to read logged-in user:', error);
      return null;
    }
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(false);

  // ============================================================
  // ADMIN EMPLOYEE DIRECTORY
  // ============================================================

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [employeeError, setEmployeeError] = useState('');
  const [adminTab, setAdminTab] = useState('employees');
  const [adminRequests, setAdminRequests] = useState([]);
  const [loadingAdminRequests, setLoadingAdminRequests] = useState(false);
  const [adminRequestError, setAdminRequestError] = useState('');
  const [updatingRequestIds, setUpdatingRequestIds] = useState([]);
  const [assetAssignmentRequest, setAssetAssignmentRequest] = useState(null);
  const [assetAssignmentForm, setAssetAssignmentForm] = useState({
    assetName: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
    condition: 'Good',
    remarks: '',
  });
  const [assigningAsset, setAssigningAsset] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [newEmp, setNewEmp] = useState(DEFAULT_EMPLOYEE);

  const [creatingEmployee, setCreatingEmployee] = useState(false);

  // ============================================================
  // EMPLOYEE ATTENDANCE
  // ============================================================

  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [checkInTime, setCheckInTime] = useState('--:--');
  const [checkOutTime, setCheckOutTime] = useState('--:--');
  const [workingTime, setWorkingTime] = useState('0h 0m');
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  // Employee full profile (name, code, designation, dept, city, etc.)
  const [employeeProfile, setEmployeeProfile] = useState(null);

  // Attendance stats (present days, avg hours, late, overtime)
  const [attendanceStats, setAttendanceStats] = useState({
    presentDays: 0,
    avgHoursDisplay: '0h 00m',
    lateDays: 0,
    overtimeDisplay: '00h 00m',
  });

  // ============================================================
  // HELPER
  // ============================================================

  const isAdmin =
    currentUser &&
    ADMIN_ROLES.includes((currentUser.role || '').toLowerCase());

  // ============================================================
  // CHART CONFIGURATION
  // ============================================================

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: '45%',
      },
    },

    xaxis: {
      categories: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
      ],
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: '#e9ecef',
    },

    tooltip: {
      y: {
        formatter: (value) => `${value} hours`,
      },
    },
  };

  const chartSeries = [
    {
      name: 'Hours Worked',
      data: [8.5, 8.2, 8.8, 8.7, 8.0, 4.0],
    },
  ];

  // ============================================================
  // FETCH EMPLOYEES
  // ============================================================

  const fetchEmployees = async () => {
    if (!isAdmin) {
      return;
    }

    setLoadingEmployees(true);
    setEmployeeError('');

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/employees`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Failed to fetch employees'
        );
      }

      setEmployees(
        Array.isArray(data)
          ? data
          : data.employees || []
      );
    } catch (error) {
      console.error(
        'Error fetching employees:',
        error
      );

      setEmployeeError(
        error.message || 'Unable to load employees'
      );
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchAdminRequests = async () => {
    if (!currentUser || !isAdmin) return;

    setLoadingAdminRequests(true);
    setAdminRequestError('');
    try {
      const response = await fetch(
        `${API_BASE}/api/admin/employee-requests?adminUserId=${encodeURIComponent(currentUser.id)}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to load employee requests');
      }
      setAdminRequests(Array.isArray(data.requests) ? data.requests : []);
    } catch (error) {
      console.error('Error fetching employee requests:', error);
      setAdminRequestError(error.message || 'Unable to load employee requests');
    } finally {
      setLoadingAdminRequests(false);
    }
  };

  const updateAdminRequestStatus = async (requestId, status) => {
    setUpdatingRequestIds((ids) => [...ids, requestId]);
    setAdminRequestError('');
    try {
      const response = await fetch(
        `${API_BASE}/api/admin/employee-requests/${requestId}/status`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminUserId: currentUser.id, status }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to update request status');
      }
      await fetchAdminRequests();
    } catch (error) {
      console.error('Error updating employee request status:', error);
      setAdminRequestError(error.message || 'Unable to update request status');
    } finally {
      setUpdatingRequestIds((ids) => ids.filter((id) => id !== requestId));
    }
  };

  const fulfilAdminAssetRequest = async (event) => {
    event.preventDefault();
    if (!assetAssignmentRequest) return;

    setAssigningAsset(true);
    setAdminRequestError('');
    try {
      const response = await fetch(
        `${API_BASE}/api/admin/asset-requests/${assetAssignmentRequest.source_id}/fulfil`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            adminUserId: currentUser.id,
            ...assetAssignmentForm,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to assign asset');
      }
      setAssetAssignmentRequest(null);
      await fetchAdminRequests();
    } catch (error) {
      console.error('Error assigning requested asset:', error);
      setAdminRequestError(error.message || 'Unable to assign asset');
    } finally {
      setAssigningAsset(false);
    }
  };

  // ============================================================
  // LOAD EMPLOYEES WHEN ADMIN LOGS IN
  // ============================================================

  const fetchAttendance = async () => {
    if (!currentUser || isAdmin) return;
    try {
      setAttendanceLoading(true);
      const res = await fetch(`${API_BASE}/api/attendance/today/${currentUser.id}`);
      const data = await res.json();
      if (res.ok && data.today) {
        setAttendanceStatus(data.today.check_out_time ? 'Checked Out' : 'Checked In');
        if (data.today.check_in_time) {
          const d = new Date(data.today.check_in_time);
          setCheckInTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        if (data.today.check_out_time) {
          const d = new Date(data.today.check_out_time);
          setCheckOutTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
        if (data.today.working_hours_display) {
          setWorkingTime(data.today.working_hours_display);
        }
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setAttendanceLoading(false);
    }
  };

  const fetchEmployeeProfile = async () => {
    if (!currentUser || isAdmin) return;
    try {
      const res = await fetch(`${API_BASE}/api/employee/profile/${currentUser.id}`);
      if (res.ok) {
        const data = await res.json();
        setEmployeeProfile(data);
      }
    } catch (error) {
      console.error('Error fetching employee profile:', error);
    }
  };

  const fetchAttendanceStats = async (period = 'week') => {
    if (!currentUser || isAdmin) return;
    try {
      const res = await fetch(`${API_BASE}/api/attendance/stats/${currentUser.id}?period=${period}`);
      if (res.ok) {
        const data = await res.json();
        setAttendanceStats(data);
      }
    } catch (error) {
      console.error('Error fetching attendance stats:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      if (isAdmin) {
        fetchEmployees();
        fetchAdminRequests();
      } else {
        fetchAttendance();
        fetchEmployeeProfile();
        fetchAttendanceStats('week');
      }
    }
  }, [currentUser]);

  // ============================================================
  // LOGIN
  // ============================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError('');
    setLoadingAuth(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            email: loginEmail,
            password: loginPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || 'Authentication failed'
        );
      }

      if (!data.user) {
        throw new Error(
          'Login successful but user information was not returned'
        );
      }

      localStorage.setItem(
        'hrms_user',
        JSON.stringify(data.user)
      );

      setCurrentUser(data.user);

      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error('Login error:', error);

      setLoginError(
        error.message || 'Unable to sign in'
      );
    } finally {
      setLoadingAuth(false);
    }
  };

  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {
    localStorage.removeItem('hrms_user');

    setCurrentUser(null);
    setEmployees([]);
    setLoginEmail('');
    setLoginPassword('');
    setAttendanceStatus('Checked Out');
    setCheckInTime('--:--');
    setCheckOutTime('--:--');
  };

  // ============================================================
  // CREATE EMPLOYEE
  // ============================================================

  const handleCreateEmployee = async (e) => {
    e.preventDefault();

    setCreatingEmployee(true);

    try {
      const res = await fetch(
        `${API_BASE}/api/admin/employees`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(newEmp),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
            'Failed to create employee'
        );
      }

      alert(
        data.message ||
          'Employee and login account created successfully'
      );

      setShowModal(false);

      setNewEmp({
        ...DEFAULT_EMPLOYEE,
      });

      await fetchEmployees();
    } catch (error) {
      console.error(
        'Create employee error:',
        error
      );

      alert(
        error.message ||
          'Unable to create employee'
      );
    } finally {
      setCreatingEmployee(false);
    }
  };

  const handlePunch = async (type) => {
    if (!currentUser) return;
    try {
      setAttendanceLoading(true);
      const res = await fetch(`${API_BASE}/api/attendance/punch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: currentUser.id, type })
      });
      const data = await res.json();
      if (res.ok) {
        fetchAttendance(); // refresh the view
      } else {
        alert(data.message || 'Error updating attendance');
      }
    } catch (error) {
      console.error('Punch error:', error);
      alert('Unable to process attendance punch');
    } finally {
      setAttendanceLoading(false);
    }
  };

  // ============================================================
  // CHECK IN
  // ============================================================

  const handleCheckIn = () => {
    handlePunch('CHECK_IN');
  };

  // ============================================================
  // CHECK OUT
  // ============================================================

  const handleCheckOut = () => {
    handlePunch('CHECK_OUT');
  };

  // ============================================================
  // UPDATE NEW EMPLOYEE FIELD
  // ============================================================

  const updateNewEmployee = (field, value) => {
    setNewEmp((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ============================================================
  // LOGIN PAGE
  // ============================================================

  if (!currentUser) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center p-3">
        <div
          className="card shadow border-0"
          style={{
            width: '100%',
            maxWidth: '450px',
          }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold mb-1">
                Ramel HR Portal
              </h2>

              <p className="text-muted mb-0">
                Sign in to your organization workspace
              </p>
            </div>

            {loginError && (
              <div
                className="alert alert-danger"
                role="alert"
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label
                  htmlFor="loginEmail"
                  className="form-label fw-semibold"
                >
                  Work Email
                </label>

                <input
                  id="loginEmail"
                  type="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={loginEmail}
                  onChange={(e) =>
                    setLoginEmail(e.target.value)
                  }
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="loginPassword"
                  className="form-label fw-semibold"
                >
                  Password
                </label>

                <input
                  id="loginPassword"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={loginPassword}
                  onChange={(e) =>
                    setLoginPassword(e.target.value)
                  }
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loadingAuth}
              >
                {loadingAuth
                  ? 'Signing In...'
                  : 'Sign In'}
              </button>
            </form>

            {/* <div className="alert alert-light border mt-4 mb-0">
              <small className="text-muted">
                <strong>Default Admin</strong>
                <br />
                admin@ramel.co.in
                <br />
                password123
              </small>
            </div> */}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // LOGGED-IN PORTAL
  // ============================================================

  const initials = currentUser.email
    ? currentUser.email
        .slice(0, 2)
        .toUpperCase()
    : 'US';

  if (!isAdmin) {
    return (
      <EmployeeTemplate
        currentUser={currentUser}
        handleLogout={handleLogout}
        attendanceStatus={attendanceStatus}
        checkInTime={checkInTime}
        checkOutTime={checkOutTime}
        workingTime={workingTime}
        attendanceLoading={attendanceLoading}
        handleCheckIn={handleCheckIn}
        handleCheckOut={handleCheckOut}
        fetchAttendance={fetchAttendance}
        employeeProfile={employeeProfile}
        attendanceStats={attendanceStats}
        fetchAttendanceStats={fetchAttendanceStats}
      />
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">
            Ramel HR
          </span>

          <div className="d-flex align-items-center gap-3">
            <div className="text-white text-end d-none d-md-block">
              <div className="fw-semibold">
                {currentUser.tenant?.name ||
                  'Organization'}
              </div>

              <small className="text-white-50">
                {currentUser.role}
              </small>
            </div>

            <div
              className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '40px',
                height: '40px',
              }}
            >
              {initials}
            </div>

            <div>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="container-fluid px-4 py-4">
        {/* ====================================================
            ADMIN DASHBOARD
        ==================================================== */}

        {isAdmin ? (
          <>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
              <div>
                <h3 className="fw-bold mb-1">
                  Admin Console
                </h3>

                <p className="text-muted mb-0">
                  Employee and request management
                </p>
              </div>

              {adminTab === 'employees' && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-person-plus me-2"></i>
                  Add New Employee
                </button>
              )}
            </div>

            <div className="btn-group mb-4" role="group" aria-label="Admin sections">
              <button
                type="button"
                className={`btn ${adminTab === 'employees' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setAdminTab('employees')}
              >
                Employees
              </button>
              <button
                type="button"
                className={`btn ${adminTab === 'requests' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => {
                  setAdminTab('requests');
                  fetchAdminRequests();
                }}
              >
                Employee Requests
              </button>
            </div>

            {/* Error */}

            {adminTab === 'employees' && employeeError && (
              <div className="alert alert-danger">
                {employeeError}

                <button
                  className="btn btn-sm btn-outline-danger ms-3"
                  onClick={fetchEmployees}
                >
                  Retry
                </button>
              </div>
            )}

            {adminTab === 'employees' ? (
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0 fw-bold">
                      Employee Records
                    </h5>

                    <small className="text-muted">
                      {employees.length} employee
                      {employees.length !== 1
                        ? 's'
                        : ''}
                    </small>
                  </div>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={fetchEmployees}
                    disabled={loadingEmployees}
                  >
                    {loadingEmployees
                      ? 'Loading...'
                      : 'Refresh'}
                  </button>
                </div>
              </div>

              <div className="card-body p-0">
                {loadingEmployees ? (
                  <div className="text-center py-5">
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    ></div>

                    <p className="text-muted mt-3 mb-0">
                      Loading employees...
                    </p>
                  </div>
                ) : employees.length === 0 ? (
                  <div className="text-center py-5 px-3">
                    <div className="fs-1 mb-3">
                      👥
                    </div>

                    <h5>
                      No employees registered yet
                    </h5>

                    <p className="text-muted">
                      Click "Add New Employee" to
                      create an employee and login
                      account.
                    </p>

                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        setShowModal(true)
                      }
                    >
                      Add First Employee
                    </button>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Employee</th>
                          <th>Code</th>
                          <th>Department & Role</th>
                          <th>Login Email</th>
                          <th>Status</th>
                          <th className="text-end">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {employees.map(
                          (emp, index) => {
                            const fullName =
                              emp.full_name ||
                              `${emp.first_name || ''} ${
                                emp.last_name || ''
                              }`.trim() ||
                              'Employee';

                            const employeeInitials =
                              fullName
                                .split(' ')
                                .map(
                                  (name) =>
                                    name[0]
                                )
                                .join('')
                                .slice(0, 2)
                                .toUpperCase();

                            return (
                              <tr
                                key={
                                  emp.id ||
                                  emp.employee_id ||
                                  index
                                }
                              >
                                <td>
                                  <div className="d-flex align-items-center gap-3">
                                    <div
                                      className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center"
                                      style={{
                                        width:
                                          '42px',
                                        height:
                                          '42px',
                                      }}
                                    >
                                      {
                                        employeeInitials
                                      }
                                    </div>

                                    <div>
                                      <div className="fw-semibold">
                                        {fullName}
                                      </div>

                                      <small className="text-muted">
                                        {emp.designation ||
                                          'Staff'}
                                      </small>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  {emp.employee_code ||
                                    emp.code ||
                                    '-'}
                                </td>

                                <td>
                                  <div>
                                    {emp.department ||
                                      'General'}
                                  </div>

                                  <small className="text-muted">
                                    {emp.role_name ||
                                      emp.role ||
                                      emp.role_key ||
                                      'Employee'}
                                  </small>
                                </td>

                                <td>
                                  {emp.email || '-'}
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      (
                                        emp.status ||
                                        'Active'
                                      ).toLowerCase() ===
                                      'active'
                                        ? 'text-bg-success'
                                        : 'text-bg-secondary'
                                    }`}
                                  >
                                    {emp.status ||
                                      'Active'}
                                  </span>
                                </td>

                                <td className="text-end">
                                  <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() =>
                                      alert(
                                        `Employee: ${fullName}`
                                      )
                                    }
                                  >
                                    View Profile
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            ) : (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0 fw-bold">Employee Requests</h5>
                    <small className="text-muted">
                      Review and update request status for your organization
                    </small>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={fetchAdminRequests}
                    disabled={loadingAdminRequests}
                  >
                    {loadingAdminRequests ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
                {adminRequestError && (
                  <div className="alert alert-danger rounded-0 mb-0" role="alert">
                    {adminRequestError}
                  </div>
                )}
                <div className="card-body p-0">
                  {loadingAdminRequests ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status"></div>
                      <p className="text-muted mt-3 mb-0">Loading requests...</p>
                    </div>
                  ) : adminRequests.length === 0 ? (
                    <div className="text-center text-muted py-5">No employee requests found.</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>Request</th>
                            <th>Employee</th>
                            <th>Category / Subject</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminRequests.map((request) => {
                            const employeeName = `${request.first_name || ''} ${request.last_name || ''}`.trim() || 'Employee';
                            const status = request.current_status || request.status || 'Pending';
                            const updating = updatingRequestIds.includes(request.id);
                            const statusOptions = request.source_type === 'asset'
                              ? (status === 'Completed'
                                ? ['Completed']
                                : ['Pending', 'In Review', 'Approved', 'Rejected'])
                              : ['Pending', 'In Review', 'Approved', 'Completed', 'Rejected'];
                            return (
                              <tr key={request.id}>
                                <td>
                                  <div className="fw-semibold">{request.request_code || `ER-${request.id}`}</div>
                                  <small className="text-muted">{request.priority || 'Normal'} priority</small>
                                </td>
                                <td>
                                  <div>{employeeName}</div>
                                  <small className="text-muted">{request.employee_code || '-'}</small>
                                </td>
                                <td>
                                  <div className="fw-semibold">{request.category}</div>
                                  <small className="text-muted">{request.subject}</small>
                                </td>
                                <td>{request.created_at ? new Date(request.created_at).toLocaleDateString() : '-'}</td>
                                <td>
                                  <select
                                    className="form-select form-select-sm"
                                    aria-label={`Status for ${request.request_code || request.subject}`}
                                    value={status}
                                    disabled={updating || (request.source_type === 'asset' && status === 'Completed')}
                                    onChange={(event) => updateAdminRequestStatus(request.id, event.target.value)}
                                  >
                                    {statusOptions.map((option) => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  {request.source_type === 'asset' && status !== 'Completed' && status !== 'Rejected' && (
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-outline-primary text-nowrap"
                                      onClick={() => {
                                        setAssetAssignmentRequest(request);
                                        setAssetAssignmentForm({
                                          assetName: request.preferred_model || request.asset_type || request.subject || '',
                                          manufacturer: '',
                                          model: request.preferred_model || '',
                                          serialNumber: '',
                                          purchaseDate: '',
                                          warrantyExpiry: '',
                                          condition: 'Good',
                                          remarks: '',
                                        });
                                      }}
                                    >
                                      Assign &amp; Complete
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
            {assetAssignmentRequest && (
              <>
                <div className="modal-backdrop show"></div>
                <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="assetAssignmentTitle">
                  <div className="modal-dialog modal-dialog-centered">
                    <form className="modal-content" onSubmit={fulfilAdminAssetRequest}>
                      <div className="modal-header">
                        <div>
                          <h5 className="modal-title fw-bold" id="assetAssignmentTitle">Assign requested asset</h5>
                          <small className="text-muted">{assetAssignmentRequest.request_code || assetAssignmentRequest.subject}</small>
                        </div>
                        <button
                          type="button"
                          className="btn-close"
                          aria-label="Close"
                          onClick={() => setAssetAssignmentRequest(null)}
                          disabled={assigningAsset}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="assignedAssetName">Asset name</label>
                          <input
                            id="assignedAssetName"
                            className="form-control"
                            value={assetAssignmentForm.assetName}
                            onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, assetName: event.target.value })}
                            required
                          />
                        </div>
                        <div className="row g-3">
                          <div className="col-sm-6">
                            <label className="form-label" htmlFor="assignedAssetManufacturer">Manufacturer</label>
                            <input id="assignedAssetManufacturer" className="form-control" value={assetAssignmentForm.manufacturer} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, manufacturer: event.target.value })} />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label" htmlFor="assignedAssetModel">Model</label>
                            <input id="assignedAssetModel" className="form-control" value={assetAssignmentForm.model} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, model: event.target.value })} />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label" htmlFor="assignedAssetSerial">Serial number</label>
                            <input id="assignedAssetSerial" className="form-control" value={assetAssignmentForm.serialNumber} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, serialNumber: event.target.value })} />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label" htmlFor="assignedAssetCondition">Condition</label>
                            <select id="assignedAssetCondition" className="form-select" value={assetAssignmentForm.condition} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, condition: event.target.value })}>
                              {['Good', 'Fair', 'Poor', 'New'].map((condition) => <option key={condition} value={condition}>{condition}</option>)}
                            </select>
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label" htmlFor="assignedAssetPurchaseDate">Purchase date</label>
                            <input id="assignedAssetPurchaseDate" type="date" className="form-control" value={assetAssignmentForm.purchaseDate} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, purchaseDate: event.target.value })} />
                          </div>
                          <div className="col-sm-6">
                            <label className="form-label" htmlFor="assignedAssetWarrantyExpiry">Warranty expiry</label>
                            <input id="assignedAssetWarrantyExpiry" type="date" className="form-control" value={assetAssignmentForm.warrantyExpiry} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, warrantyExpiry: event.target.value })} />
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="form-label" htmlFor="assetAssignmentRemarks">Remarks</label>
                          <textarea id="assetAssignmentRemarks" className="form-control" rows="2" value={assetAssignmentForm.remarks} onChange={(event) => setAssetAssignmentForm({ ...assetAssignmentForm, remarks: event.target.value })} />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setAssetAssignmentRequest(null)} disabled={assigningAsset}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={assigningAsset}>
                          {assigningAsset ? 'Assigning...' : 'Assign asset & complete request'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          /* ====================================================
             EMPLOYEE SELF-SERVICE DASHBOARD
          ==================================================== */

          <>
            <div className="mb-4">
              <h3 className="fw-bold mb-1">
                Employee Portal
              </h3>

              <p className="text-muted mb-0">
                Welcome back 👋
              </p>

              <small className="text-muted">
                Logged in as:{' '}
                <strong>
                  {currentUser.email}
                </strong>
              </small>
            </div>

            <div className="row g-4">
              {/* Attendance */}

              <div className="col-12 col-lg-5">
                <div className="ed-attendance-card">
                  <div className="ed-attendance-top">
                    <div>
                      <span className="ed-card-kicker">TODAY'S ATTENDANCE</span>
                      <h3 id="edAttendanceTitle">{attendanceStatus === 'Checked In' ? "You're checked in" : (attendanceStatus === 'Checked Out' ? "You're checked out" : "Not checked in")}</h3>
                    </div>
                    <div className="ed-attendance-icon">
                      <i className="bi bi-fingerprint"></i>
                    </div>
                  </div>

                  <div className="ed-time-display">
                    <div className="ed-clock">
                      <span id="edCurrentTime">{checkInTime !== '--:--' ? checkInTime.split(' ')[0] : '--:--'}</span>
                      <small>{checkInTime !== '--:--' ? checkInTime.split(' ')[1] : ''}</small>
                    </div>
                    <div className="ed-work-location-badge" id="edWorkLocationBadge" data-work-location="office" aria-label="Office, WFO">
                      <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                      <span id="edWorkLocationLabel">Office</span>
                      <strong id="edWorkMode">WFO</strong>
                    </div>
                  </div>

                  <div className="ed-attendance-date">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>

                  <div className="ed-attendance-progress">
                    <div className="ed-progress-top">
                      <span>Working time</span>
                      <strong id="edWorkingTime">{workingTime}</strong>
                    </div>
                    <div className="ed-progress-track">
                      <span id="edWorkProgress" style={{ width: attendanceStatus === 'Checked Out' ? '100%' : (attendanceStatus === 'Checked In' ? '50%' : '0%') }}></span>
                    </div>
                    <div className="ed-progress-bottom">
                      <span>09:00 AM</span>
                      <span>06:00 PM</span>
                    </div>
                  </div>

                  <div className="ed-attendance-actions">
                    <button
                      type="button"
                      className="ed-checkin-btn"
                      onClick={handleCheckIn}
                      disabled={attendanceLoading || attendanceStatus === 'Checked In' || attendanceStatus === 'Checked Out'}
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      {attendanceLoading && attendanceStatus !== 'Checked In' ? '...' : 'Check In'}
                    </button>
                    <button
                      type="button"
                      className="ed-checkout-btn"
                      onClick={handleCheckOut}
                      disabled={attendanceLoading || attendanceStatus !== 'Checked In'}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      {attendanceLoading && attendanceStatus === 'Checked In' ? '...' : 'Check Out'}
                    </button>
                  </div>

                  <div className="ed-attendance-footer">
                    <div>
                      <span>Check In</span>
                      <strong id="edCheckInTime">{checkInTime}</strong>
                    </div>
                    <div>
                      <span>Check Out</span>
                      <strong id="edCheckOutTime">{checkOutTime}</strong>
                    </div>
                    <div>
                      <span>Break</span>
                      <strong>0 min</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Chart */}

              <div className="col-12 col-lg-7">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <small className="text-muted fw-semibold">
                        WEEKLY ACTIVITY
                      </small>

                      <h5 className="fw-bold mt-2">
                        Hours Worked This Week
                      </h5>
                    </div>

                    <Chart
                      options={chartOptions}
                      series={chartSeries}
                      type="bar"
                      height={320}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* ======================================================
          CREATE EMPLOYEE MODAL
      ====================================================== */}

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor:
              'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title fw-bold">
                    Create Employee & Login Account
                  </h5>

                  <small className="text-muted">
                    Create an employee profile and
                    login credentials.
                  </small>
                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowModal(false)
                  }
                ></button>
              </div>

              <form onSubmit={handleCreateEmployee}>
                <div className="modal-body">
                  <div className="row g-3">
                    {/* First Name */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        First Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={newEmp.firstName}
                        onChange={(e) =>
                          updateNewEmployee(
                            'firstName',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* Last Name */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Last Name
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={newEmp.lastName}
                        onChange={(e) =>
                          updateNewEmployee(
                            'lastName',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* Email */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Work Email
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="employee@ramel.co.in"
                        value={newEmp.email}
                        onChange={(e) =>
                          updateNewEmployee(
                            'email',
                            e.target.value
                          )
                        }
                        required
                      />

                      <small className="text-muted">
                        This email will be used as the
                        login username.
                      </small>
                    </div>

                    {/* Password */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Temporary Password
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        value={newEmp.password}
                        onChange={(e) =>
                          updateNewEmployee(
                            'password',
                            e.target.value
                          )
                        }
                        minLength="6"
                        required
                      />
                    </div>

                    {/* Department */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Department
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={newEmp.department}
                        onChange={(e) =>
                          updateNewEmployee(
                            'department',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* Designation */}

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Designation
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={newEmp.designation}
                        onChange={(e) =>
                          updateNewEmployee(
                            'designation',
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    {/* System Role */}

                    <div className="col-12">
                      <label className="form-label fw-semibold">
                        System Role
                      </label>

                      <select
                        className="form-select"
                        value={newEmp.roleKey}
                        onChange={(e) =>
                          updateNewEmployee(
                            'roleKey',
                            e.target.value
                          )
                        }
                      >
                        <option value="SOFTWARE_ENGINEER">
                          Software Engineer
                        </option>

                        <option value="HR">
                          HR
                        </option>

                        <option value="MANAGER">
                          Manager
                        </option>

                        <option value="TEAM_LEAD">
                          Team Lead
                        </option>

                        <option value="EMPLOYEE">
                          Employee
                        </option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      setShowModal(false)
                    }
                    disabled={creatingEmployee}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={creatingEmployee}
                  >
                    {creatingEmployee
                      ? 'Creating...'
                      : 'Create User & Employee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
