import React, { useState } from 'react';
import './AddSongInput.css';

const AddSongInput = ({ onAddSong, disabled }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onAddSong(url);
            setUrl('');
        }
    };

    return (
        <div className="add-song-container">
            <h3 className="add-song-title">Add Song to Queue</h3>
            <form className="add-song-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="song-url-input"
                    placeholder="Enter YouTube URL..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={disabled}
                />
                <button
                    type="submit"
                    className="add-song-button"
                    disabled={disabled || !url.trim()}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span>Add</span>
                </button>
            </form>
        </div>
    );
};

export default AddSongInput;

