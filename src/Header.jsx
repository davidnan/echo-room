import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import {logout} from './auth/firebaseLogin.js';
import { useNavigate } from 'react-router-dom';


const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12h4l3-9 4 18 3-9h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
        <div className="logo">
            <Logo />
            <span className="logo-text">Echo room</span>
        </div>
        <div className="profile-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" onClick={togglePopup}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          
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