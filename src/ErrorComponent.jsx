import React from 'react';
import './ErrorNotification.css';

const ErrorNotification = ({ message, onClose }) => {
  return (
    <div className="error-notification">
      <div className="error-icon">⚠</div>
      <span className="error-message">{message}</span>
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default ErrorNotification;