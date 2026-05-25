import React, { useState } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NavigationMenu from './components/layout/NavigationMenu';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import StudentPortal from './components/student/StudentPortal';
import NotificationToast from './components/layout/NotificationToast';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login'); // login, register, dashboard

  const handleLogin = (authenticatedUser) => {
    setUser(authenticatedUser);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="min-vh-100 bg-light">
      {user && <NavigationMenu user={user} onLogout={handleLogout} />}

      <div className="container py-3">
        {view === 'login' && !user && (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setView('register')} />
        )}
        {view === 'register' && !user && (
          <Register onSwitchToLogin={() => setView('login')} />
        )}
        {user && user.role === 'teacher' && <TeacherDashboard />}
        {user && user.role === 'student' && <StudentPortal user={user} />}
      </div>

      <NotificationToast />
    </div>
  );
}

export default App;