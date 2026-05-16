import React, { useState } from 'react';
import TeacherDashboard from './components/TeacherDashboard';
import StudentPortal from './components/StudentPortal';

function App() {
  const [role, setRole] = useState('teacher');

  const toggleRole = () => {
    setRole(prevRole => (prevRole === 'teacher' ? 'student' : 'teacher'));
  };

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">E-Test System Prototype</span>
          <button className="btn btn-outline-light" onClick={toggleRole}>
            Switch to {role === 'teacher' ? 'Student' : 'Teacher'} View
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="alert alert-info">
          Currently viewing as: <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
        </div>
        
        {role === 'teacher' ? (
          <TeacherDashboard />
        ) : (
          <StudentPortal />
        )}
      </div>
    </div>
  );
}

export default App;
