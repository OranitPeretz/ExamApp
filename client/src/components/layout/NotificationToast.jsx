import React, { useState, useEffect } from 'react';
import { notifyService } from '../../core/classes/NotifyService';

const NotificationToast = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const unsubscribe = notifyService.subscribe((data) => {
      setAlert(data);
      const timer = setTimeout(() => setAlert(null), 3500);
      return () => clearTimeout(timer);
    });
    return unsubscribe;
  }, []);

  if (!alert) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div className={`toast show align-items-center text-white bg-${alert.type === 'success' ? 'success' : 'danger'} border-0 shadow`} role="alert">
        <div className="d-flex">
          <div className="toast-body fw-bold">
            {alert.type === 'success' ? '✓ ' : '⚠ '} {alert.message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationToast;