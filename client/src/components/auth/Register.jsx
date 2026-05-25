import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { notifyService } from '../../core/classes/NotifyService';

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username || !password || !name) {
      notifyService.show('Please fill in all configuration fields.', 'danger');
      return;
    }
    setLoading(true);
    authService.register({ username, password, name, role })
      .then(() => {
        notifyService.show('Registration complete! Please sign in.');
        onSwitchToLogin();
      })
      .catch(err => notifyService.show(err.message, 'danger'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg border-0" style={{ maxWidth: '420px', width: '100%' }}>
        <div className="card-header bg-dark text-white text-center py-4">
          <h4 className="mb-0 fw-bold">Create Account</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleRegister}>
            <div className="mb-2">
              <label className="form-label small fw-semibold">Full Name</label>
              <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div className="mb-2">
              <label className="form-label small fw-semibold">Username</label>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="john12" />
            </div>
            <div className="mb-2">
              <label className="form-label small fw-semibold">Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••" />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-semibold">System Role</label>
              <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100 fw-bold" disabled={loading}>
              {loading ? 'Saving account...' : 'Complete Register'}
            </button>
          </form>
          <div className="text-center mt-3">
            <button className="btn btn-link btn-sm text-secondary" onClick={onSwitchToLogin}>Return to Login screen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;