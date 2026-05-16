import React, { useState } from 'react';
import TeacherDashboard from './components/TeacherDashboard';
import StudentPortal from './components/StudentPortal';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">E-Test System Prototype</span>
          {user && (
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Logout ({user.name})
            </button>
          )}
        </div>
      </nav>

      <div className="container">
        {!user ? (
          <Login onLogin={setUser} />
        ) : user.role === 'teacher' ? (
          <TeacherDashboard />
        ) : (
          <StudentPortal />
        )}
      </div>
    </div>
  );
}

export default App;
