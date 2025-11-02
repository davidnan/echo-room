import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from '../auth/AuthContext.jsx';
import { MinidenticonImg } from './MinidenticonImg.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../util/Header.jsx';
import axios from 'axios';
import config from '../config/serverConfig.js';
import { getAuth } from 'firebase/auth';

const ProfilePage = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState(userData?.displayName || user?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleCancel = () => {
    navigate('/');
  };

  const handleSave = async () => {
    if (!displayName.trim()) {
      setMessage('Display name cannot be empty');
      return;
    }

    try {
      setIsSaving(true);
      setMessage('');
      const accessToken = await getAuth().currentUser.getIdToken();

      await axios.post(`http://${config.serverIp}:${config.port}/update_display_name`, {
        displayName: displayName.trim(),
        accessToken: accessToken
      }, {
        headers: { 'Content-Type': 'application/json' },
      });

      setMessage('Display name updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error updating display name:', error);
      setMessage('Failed to update display name');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header isRoom={false} roomName={""} />
      <div className="profile-container">
        <div className="profile-content">
          <h1>My Profile</h1>

          <div className="profile-form">
            <div className="form-section">
              <label>Profile Picture</label>
              <div className="profile-picture-container">
                <div className="profile-picture-wrapper">
                  <MinidenticonImg username={user?.email || ''} width="80" height="80" />
                </div>
                <div className="profile-picture-info">
                  <p>Your unique avatar is generated from your email</p>
                </div>
              </div>
            </div>

            <div className="form-section">
              <label>Email</label>
              <input
                type="text"
                value={user?.email || ''}
                disabled
                className="input-disabled"
              />
            </div>

            <div className="form-section">
              <label>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your display name"
              />
            </div>

            {message && (
              <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}

            <div className="button-group">
              <button className="cancel" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </button>
              <button className="continue" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
