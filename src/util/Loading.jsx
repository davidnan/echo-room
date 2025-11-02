// src/components/Loading.js
import React from 'react';
import './Loading.css'; // Import styles

const Loading = () => {
    return (
        <div className="loading-bg">
            <div className="loading-card">
                <div className="spinner"></div>
                <p className="loading-text">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default Loading;
