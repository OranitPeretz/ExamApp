import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow-sm mb-4 py-3">
      <div className="container">
        <span className="navbar-brand mb-0 h1 fw-bold text-primary">
          <i className="bi bi-journal-check me-2"></i>E-Test System
        </span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-light small">
            Hello, <strong className="text-warning">{user.name}</strong> ({user.role === 'teacher' ? 'Teacher' : 'Student'})
          </span>
          <button className="btn btn-outline-danger btn-sm px-3 rounded-pill" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;