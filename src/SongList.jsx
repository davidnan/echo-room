import React, { useState } from 'react';
import SongListItem from './SongListItem.jsx';
import './SongList.css';

const SongList = ({ songs, onRemoveSong, onReorderSongs, canManage }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => (e) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (index) => (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (dropIndex) => (e) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            onReorderSongs(draggedIndex, dropIndex);
        }
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    return (
        <div className="song-list-container">
            <h3 className="list-title">Queue</h3>
            <div className="song-list">
                {songs && songs.length > 0 ? (
                    songs.map((song, index) => (
                        <SongListItem
                            key={song.uid || index}
                            title={song.title || 'Untitled'}
                            videoId={song.uid}
                            onRemove={onRemoveSong}
                            canManage={canManage}
                            onDragStart={handleDragStart(index)}
                            onDragOver={handleDragOver(index)}
                            onDrop={handleDrop(index)}
                            onDragEnd={handleDragEnd}
                            isDragging={draggedIndex === index}
                        />
                    ))
                ) : (
                    <div className="empty-state">No songs in queue</div>
                )}
            </div>
        </div>
    );
};

export default SongList;
