import React from 'react';
import './Profile.css';

const ProfilePage = () => {
  return (
    <div className="container">
      <nav className="navigation">
        <div className="breadcrumb">
          <span>Home page</span>
          <span>&gt;</span>
          <span className="current">My profile</span>
        </div>
        <div className="nav-buttons">
          <button>Change password</button>
          <button>Log out</button>
        </div>
      </nav>

      <div className="profile-form">
        <div className="form-section">
          <label>Profile picture</label>
          <div className="profile-picture-container">
            <div className="profile-picture"></div>
            <button>Delete</button>
          </div>
        </div>

        <div className="form-section">
          <label>Username</label>
          <input type="text" />
        </div>

        <div className="button-group">
          <button className="cancel">Cancel</button>
          <button className="continue">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;