import React, { useState } from 'react';
import './Room.css';

const RoomPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songLink, setSongLink] = useState('');

  const users = [
    { username: "John Doe", email: "john@example.com", isOwner: true },
    { username: "Jane Smith", email: "jane@example.com", isOwner: false },
  ];

  const songs = [
    { title: "Never Gonna Give You Up", uid: "dQw4w9WgXcQ" },
    { title: "Bohemian Rhapsody", uid: "fJ9rUzIMcZQ" },
  ];

  const handleAddSong = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Handle saving the song link here
    setIsModalOpen(false);
    setSongLink('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSongLink('');
  };

  return (
    <div className="room-container">
      <div className="room-wrapper">
        <div className="room-card">
          <div className="room-grid">
            {/* Left Panel - Users */}
            <div className="room-divider">
              <div className="room-section">
                <h2 className="room-section-title">Joined users</h2>
                {users.length > 0 ? (
                  <div className="user-list">
                    {users.map((user, index) => (
                      <div key={index} className="user-item">
                        <div className="user-info">
                          <p className="user-name">{user.username}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                        {user.isOwner && (
                          <span className="owner-badge">Owner</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">No user joined</p>
                )}
              </div>
            </div>

            {/* Right Panel - Music Queue */}
            <div>
              <div className="room-section">
                <h2 className="room-section-title">Music Queue</h2>
                {songs.length > 0 ? (
                  <div className="song-list">
                    {songs.map((song, index) => (
                      <div key={index} className="song-item">
                        <img
                          src={`https://img.youtube.com/vi/${song.uid}/mqdefault.jpg`}
                          alt={song.title}
                          className="song-thumbnail"
                        />
                        <p className="song-title">{song.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">No song added</p>
                )}
              </div>
            </div>
          </div>

          {/* Add Song Button */}
          <button className="add-song-button" onClick={handleAddSong}>
            Add song
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <input
              type="text"
              className="modal-input"
              placeholder="Link"
              value={songLink}
              onChange={(e) => setSongLink(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-button cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="modal-button save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPage;