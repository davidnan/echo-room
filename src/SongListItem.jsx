import React from 'react';
import './SongListItem.css';

const SongListItem = ({ title, videoId, onRemove, canManage, onDragStart, onDragOver, onDrop, onDragEnd, isDragging }) => {
    // YouTube thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

    return (
        <div
            className={`song-list-item ${isDragging ? 'dragging' : ''}`}
            draggable={canManage}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onDragEnd={onDragEnd}
        >
            {canManage && (
                <div className="drag-handle">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6-8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                </div>
            )}
            <div className="song-thumbnail">
                <img src={thumbnailUrl} alt={title} />
            </div>
            <div className="song-info">
                <div className="song-title">{title}</div>
            </div>
            {canManage && (
                <button
                    className="remove-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(videoId);
                    }}
                    title="Remove song"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default SongListItem;
