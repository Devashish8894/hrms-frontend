import React from "react";

export default function Notifications() {
  return (
    <>
<div className="px-0 px-md-5 employee-dashboard">

                
                <div className="employee-notifications-page">

                    
                    <div className="en-page-header">
                        <div>
                            <h2>Notifications</h2>
                            <p>Stay updated with your work, requests, and important announcements.</p>
                        </div>

                        <div className="en-header-actions">
                            <button className="btn en-btn-light">
                                <i className="bi bi-sliders2"></i>
                                Preferences
                            </button>
                            <button className="btn en-btn-primary">
                                <i className="bi bi-check2-all"></i>
                                Mark all as read
                            </button>
                        </div>
                    </div>

                    
                    <div className="en-welcome-banner">
                        <div className="en-welcome-icon">
                            <i className="bi bi-bell-fill"></i>
                        </div>
                        <div className="en-welcome-content">
                            <span className="en-eyebrow">YOUR NOTIFICATION CENTER</span>
                            <h3>Everything important, all in one place.</h3>
                            <p>Track updates from HR, attendance, leave requests, and your team.</p>
                        </div>
                        <div className="en-banner-decoration">
                            <i className="bi bi-bell"></i>
                            <i className="bi bi-stars"></i>
                        </div>
                    </div>

                    
                    <div className="row g-3 en-summary-row">
                        <div className="col-6 col-xl-3">
                            <div className="en-summary-card">
                                <div className="en-summary-icon en-icon-purple">
                                    <i className="bi bi-bell"></i>
                                </div>
                                <div>
                                    <span>Total Notifications</span>
                                    <h3 id="enTotalCount">12</h3>
                                    <small>Across all categories</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-xl-3">
                            <div className="en-summary-card">
                                <div className="en-summary-icon en-icon-blue">
                                    <i className="bi bi-envelope"></i>
                                </div>
                                <div>
                                    <span>Unread</span>
                                    <h3 id="enUnreadCount">7</h3>
                                    <small>Need your attention</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-xl-3">
                            <div className="en-summary-card">
                                <div className="en-summary-icon en-icon-orange">
                                    <i className="bi bi-star"></i>
                                </div>
                                <div>
                                    <span>Important</span>
                                    <h3 id="enImportantCount">3</h3>
                                    <small>Priority updates</small>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-xl-3">
                            <div className="en-summary-card">
                                <div className="en-summary-icon en-icon-green">
                                    <i className="bi bi-check-circle"></i>
                                </div>
                                <div>
                                    <span>Read</span>
                                    <h3 id="enReadCount">5</h3>
                                    <small>Already reviewed</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="en-workspace">

                        
                        <aside className="en-sidebar">
                            <div className="en-sidebar-heading">NOTIFICATION BOX</div>

                            <button className="en-nav-item active" data-filter="all">
                                <span className="en-nav-icon"><i className="bi bi-inbox"></i></span>
                                <span>All Notifications</span>
                                <span className="en-nav-count" id="enNavAll">12</span>
                            </button>

                            <button className="en-nav-item" data-filter="unread">
                                <span className="en-nav-icon"><i className="bi bi-envelope"></i></span>
                                <span>Unread</span>
                                <span className="en-nav-count" id="enNavUnread">7</span>
                            </button>

                            <button className="en-nav-item" data-filter="important">
                                <span className="en-nav-icon"><i className="bi bi-star"></i></span>
                                <span>Important</span>
                                <span className="en-nav-count" id="enNavImportant">3</span>
                            </button>

                            <button className="en-nav-item" data-filter="archived">
                                <span className="en-nav-icon"><i className="bi bi-archive"></i></span>
                                <span>Archived</span>
                                <span className="en-nav-count" id="enNavArchived">0</span>
                            </button>

                            <div className="en-sidebar-divider"></div>

                            <div className="en-sidebar-heading">CATEGORIES</div>

                            <button className="en-category-item" data-category="Leave">
                                <span className="en-category-dot en-dot-purple"></span>
                                Leave
                            </button>
                            <button className="en-category-item" data-category="Attendance">
                                <span className="en-category-dot en-dot-blue"></span>
                                Attendance
                            </button>
                            <button className="en-category-item" data-category="HR Announcement">
                                <span className="en-category-dot en-dot-orange"></span>
                                HR Announcements
                            </button>
                            <button className="en-category-item" data-category="Documents">
                                <span className="en-category-dot en-dot-green"></span>
                                Documents
                            </button>
                            <button className="en-category-item" data-category="Requests">
                                <span className="en-category-dot en-dot-pink"></span>
                                Requests
                            </button>
                            <button className="en-category-item" data-category="Assets">
                                <span className="en-category-dot en-dot-gray"></span>
                                Assets
                            </button>
                            <button className="en-category-item" data-category="IT Access">
                                <span className="en-category-dot en-dot-cyan"></span>
                                IT Access
                            </button>
                            <button className="en-category-item" data-category="Celebrations">
                                <span className="en-category-dot en-dot-yellow"></span>
                                Celebrations
                            </button>

                            <div className="en-sidebar-bottom">
                                <div className="en-sidebar-bottom-icon">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                                <strong>Your updates, securely.</strong>
                                <p>Notifications are connected to your employee workspace.</p>
                            </div>
                        </aside>

                        
                        <section className="en-feed">

                            <div className="en-feed-header">
                                <div>
                                    <h4 id="enFeedTitle">All Notifications</h4>
                                    <p id="enFeedSubtitle">Your latest updates and activity</p>
                                </div>
                                <button className="btn en-icon-button"
                                    title="Notification preferences">
                                    <i className="bi bi-gear"></i>
                                </button>
                            </div>

                            
                            <div className="en-toolbar">
                                <div className="en-search">
                                    <i className="bi bi-search"></i>
                                    <input type="text" id="enSearch" placeholder="Search notifications..."
                                        oninput="enRender()" />
                                    <kbd>⌘ K</kbd>
                                </div>

                                <select className="form-select en-filter-select" id="enDateFilter" onchange="enRender()">
                                    <option value="all">All dates</option>
                                    <option value="today">Today</option>
                                    <option value="week">Last 7 days</option>
                                    <option value="month">Last 30 days</option>
                                </select>

                                <select className="form-select en-filter-select" id="enSortFilter" onchange="enRender()">
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                </select>
                            </div>

                            
                            <div className="en-active-filter" id="enActiveFilter" style={{display: "none"}}>
                                <span id="enActiveFilterText"></span>
                                <button title="Clear category filter">
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>

                            
                            <div id="enNotificationFeed"></div>

                            
                            <div className="en-empty-state" id="enEmptyState" style={{display: "none"}}>
                                <div className="en-empty-icon">
                                    <i className="bi bi-bell-slash"></i>
                                </div>
                                <h4>You're all caught up!</h4>
                                <p>No notifications match your current filters.</p>
                                <button className="btn en-btn-primary">View all
                                    notifications</button>
                            </div>

                            <div className="en-feed-footer">
                                <span id="enResultCount">Showing 12 notifications</span>
                                <button className="btn en-btn-light">Reset filters</button>
                            </div>
                        </section>
                    </div>
                </div>

                
                <div className="modal fade" id="enDetailsModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content en-modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Notification Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body" id="enDetailsBody"></div>
                            <div className="modal-footer">
                                <button className="btn en-btn-light" data-bs-dismiss="modal">Close</button>
                                <button className="btn en-btn-primary" id="enDetailsAction">Open Related Page</button>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="modal fade" id="enPreferencesModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content en-modal-content">
                            <div className="modal-header">
                                <div>
                                    <h5 className="modal-title">Notification Preferences</h5>
                                    <p className="en-modal-subtitle">Choose which updates you want to see.</p>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <div className="en-preference-row">
                                    <div><strong>Leave Updates</strong><small>Approvals, rejections, and
                                            reminders</small></div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="Leave" /></div>
                                </div>
                                <div className="en-preference-row">
                                    <div><strong>Attendance</strong><small>Check-in reminders and corrections</small>
                                    </div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="Attendance" /></div>
                                </div>
                                <div className="en-preference-row">
                                    <div><strong>HR Announcements</strong><small>Company news and policy updates</small>
                                    </div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="HR Announcement" /></div>
                                </div>
                                <div className="en-preference-row">
                                    <div><strong>Documents</strong><small>Verification and document reminders</small>
                                    </div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="Documents" /></div>
                                </div>
                                <div className="en-preference-row">
                                    <div><strong>Requests</strong><small>Employee request status updates</small></div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="Requests" /></div>
                                </div>
                                <div className="en-preference-row">
                                    <div><strong>Assets & IT Access</strong><small>Equipment and account access
                                            updates</small></div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="Assets,IT Access" /></div>
                                </div>
                                <div className="en-preference-row">
                                    <div><strong>Celebrations</strong><small>Birthdays and work anniversaries</small>
                                    </div>
                                    <div className="form-check form-switch"><input className="form-check-input" type="checkbox"
                                            checked data-pref="Celebrations" /></div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn en-btn-light" data-bs-dismiss="modal">Cancel</button>
                                <button className="btn en-btn-primary">Save
                                    Preferences</button>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="en-toast" id="enToast">
                    <div className="en-toast-icon"><i className="bi bi-check-lg"></i></div>
                    <div>
                        <strong id="enToastTitle">Success</strong>
                        <p id="enToastMessage">Action completed successfully.</p>
                    </div>
                    <button><i className="bi bi-x-lg"></i></button>
                </div>

            </div>
    </>
  );
}
