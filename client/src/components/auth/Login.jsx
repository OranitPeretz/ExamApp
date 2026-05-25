import React, { useState } from 'react';
import { authService } from '../../services/authService';
import { notifyService } from '../../core/classes/NotifyService';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      notifyService.show('Please fill in all layout fields.', 'danger');
      return;
    }
    setLoading(true);
    authService.login(username, password)
      .then(user => {
        notifyService.show(`Welcome back, ${user.name}!`);
        onLogin(user);
      })
      .catch(err => {
        notifyService.show(err.message, 'danger');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-header bg-dark text-white text-center py-4">
          <h4 className="mb-0 fw-bold">Sign In</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} placeholder="e.g. admin" />
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} placeholder="e.g. 125" />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-bold py-2" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          <div className="text-center mt-3">
            <button className="btn btn-link btn-sm text-secondary" onClick={onSwitchToRegister}>New user? Register account here</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;