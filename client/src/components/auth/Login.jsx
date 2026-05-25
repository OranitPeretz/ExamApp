import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student'); // ברירת מחדל: תלמיד
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your name or username.');
      return;
    }
    setError('');
    onLogin({ name: username.trim(), role });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow border-0" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-header bg-dark text-white text-center py-4">
          <h3 className="mb-0 fw-bold">🔐 E-Test System</h3>
          <small className="text-muted">Please sign in to continue</small>
        </div>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Select Your Role</label>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className={`btn w-100 py-2.5 fw-bold ${role === 'student' ? 'btn-success text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setRole('student')}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  className={`btn w-100 py-2.5 fw-bold ${role === 'teacher' ? 'btn-primary text-white' : 'btn-outline-secondary'}`}
                  onClick={() => setRole('teacher')}
                >
                  👨‍🏫 Teacher
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="form-label fw-semibold">
                {role === 'student' ? 'Full Name' : 'Username'}
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="username"
                placeholder={role === 'student' ? 'e.g. John Doe' : 'e.g. teacher123'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {error && <div className="alert alert-danger p-2 small">{error}</div>}

            <button type="submit" className={`btn btn-lg w-100 fw-bold text-white ${role === 'student' ? 'btn-success' : 'btn-primary'}`}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;