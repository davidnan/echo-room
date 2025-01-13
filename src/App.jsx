import React, { useState, useEffect, useRef } from 'react';

import {logout} from './auth/firebaseLogin.js';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12h4l3-9 4 18 3-9h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function RoomPage() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);
 

  const goToProfile = () => {
   
    navigate("/profile");
  };

  const HandleClick = () => {
    
    goToProfile();
    
  }

  const togglePopup = () => {
    setIsPopupVisible((prevState) => !prevState);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    if (isPopupVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isPopupVisible]);
  const navigate = useNavigate();

  const goToRoom = () => {
    navigate("/room");
  };

  return (
    <div className="container">
      
     

      <div className="room-container">
        <div className="title-container">
          <h1>Enter a room or create one</h1>
          <p>to listen to your favorite music with your friends</p>
        </div>
        
        <div className="input-group">
          <input type="text" placeholder="Room code" />
        </div>
        
        <div className="separator">Or</div>
        
        <button className="create-room-button" onClick={goToRoom}>
          Create room
        </button>
      </div>
      {isPopupVisible && (
        <div className="profile-popup">
          <div className="popup-header">
            <span>Profile Options</span>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
          </div>
          <ul className="popup-options">
            <li onClick={HandleClick}>View Profile</li>
            <li>Change Password</li>
            <li onClick={logout}>Logout</li>
          </ul>
        </div>)}   
    </div>

  );
}

export default RoomPage;