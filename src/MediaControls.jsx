import React from 'react';
import './MediaControls.css';

const MediaControls = ({ onPlay, onPause, onSkip }) => {
    return (
        <div className="media-controls">
            <button className="control-button" onClick={onPlay} title="Play">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </button>
            <button className="control-button" onClick={onPause} title="Pause">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                </svg>
            </button>
            <button className="control-button skip-button" onClick={onSkip} title="Skip">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4l10 8-10 8V4zm12 0v16h2V4h-2z"/>
                </svg>
            </button>
        </div>
    );
};

export default MediaControls;

