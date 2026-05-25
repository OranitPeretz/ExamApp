import React, { useState } from 'react';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentPortal from './components/student/StudentPortal';

function App() {
  const [user, setUser] = useState(null); // ישמור אובייקט של { name, role }

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // במידה והמשתמש לא מחובר, נציג אך ורק את מסך ההתחברות
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-vh-100 bg-light">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="container pb-5">
        {user.role === 'teacher' ? (
          <TeacherDashboard />
        ) : (
          <StudentPortal user={user} />
        )}
      </div>
    </div>
  );
}

export default App;