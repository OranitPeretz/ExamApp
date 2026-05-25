import React from 'react';

const NavigationMenu = ({ user, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4 py-3">
      <div className="container">
        <span className="navbar-brand fw-bold text-info">
          📚 E-Test Enterprise System
        </span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-light-50 small bg-secondary px-3 py-1.5 rounded text-white">
            User: <strong>{user.name}</strong> <span className="badge bg-light text-dark ms-1">{user.role.toUpperCase()}</span>
          </span>
          <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={onLogout}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu;