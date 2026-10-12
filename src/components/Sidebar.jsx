import React from 'react';

export default function Sidebar({ isOpen, toggleSidebar, activeMenu, setActiveMenu }) {
  const menus = [
    { name: 'Employee Dashboard', icon: 'bi-grid' },
    { name: 'Employee Profile', icon: 'bi-person' },
    { name: 'Employment Details', icon: 'bi-briefcase' },
    { name: 'Documents', icon: 'bi-file-earmark-text' },
    { name: 'Skills & Certifications', icon: 'bi-award' },
    { name: 'Attendance', icon: 'bi-clock' },
    { name: 'Leave', icon: 'bi-calendar' },
    { name: 'Assets', icon: 'bi-laptop' },
    { name: 'Access & Accounts', icon: 'bi-shield-lock' },
    { name: 'Notifications', icon: 'bi-bell' },
    { name: 'Settings', icon: 'bi-gear' },
    { name: 'Resignation & Exit', icon: 'bi-box-arrow-right' },
  ];

  return (
    <div className={`bg-white border-end shadow-sm d-flex flex-column h-100 ${isOpen ? '' : 'd-none'}`} style={{ width: '250px', position: 'fixed', zIndex: 1000, top: 0, bottom: 0, left: 0 }}>
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold text-primary">Ramel | HR</h5>
        <button className="btn btn-sm btn-light d-md-none" onClick={toggleSidebar}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      <div className="flex-grow-1 overflow-auto p-2">
        <small className="text-muted fw-bold ms-3 mb-2 d-block mt-2">ADMINISTRATION</small>
        <ul className="nav flex-column gap-1">
          {menus.map((menu, idx) => (
            <li className="nav-item" key={idx}>
              <button 
                className={`nav-link text-start w-100 btn ${activeMenu === menu.name ? 'btn-primary-subtle text-primary fw-bold' : 'btn-light text-dark'}`}
                onClick={() => { setActiveMenu(menu.name); if(window.innerWidth < 768) toggleSidebar(); }}
              >
                <i className={`bi ${menu.icon} me-2`}></i> {menu.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
