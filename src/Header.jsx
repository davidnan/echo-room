import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import {logout} from './auth/firebaseLogin.js';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

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

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Echo room</h1>
        
        <div className="header-right">
          <button 
            className="profile-button"
            aria-label="Profile"
            onClick={togglePopup}
          >
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
      
    </header>
  );
};




export default Header;