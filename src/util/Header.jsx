import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import {logout} from '../auth/firebaseLogin.js';
import { useNavigate } from 'react-router-dom';
import {MinidenticonImg} from "../profile/MinidenticonImg.jsx";
import {useAuth} from "../auth/AuthContext.jsx";
import Logo from "./Logo.jsx";


const Header = ({roomName, isRoom, isRoomOwner, onRoomNameChange, roomCode}) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [editableRoomName, setEditableRoomName] = useState(roomName);
    const [isEditing, setIsEditing] = useState(false);
    const [copyFeedback, setCopyFeedback] = useState('');
    const popupRef = useRef(null);
    const navigate = useNavigate();
    const { user, userData } = useAuth();

    const goToProfile = () => {

        navigate("/profile");
    };

    const goToAllRooms = () => {
        navigate("/all-rooms");
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

    useEffect(() => {
        setEditableRoomName(roomName);
    }, [roomName]);

    const handleRoomNameChange = (e) => {
        setEditableRoomName(e.target.value);
    };
    const handleRoomNameBlur = () => {
        setIsEditing(false);
        if (editableRoomName !== roomName && onRoomNameChange) {
            onRoomNameChange(editableRoomName);
        }
    };
    const handleRoomNameKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsEditing(false);
            if (editableRoomName !== roomName && onRoomNameChange) {
                onRoomNameChange(editableRoomName);
            }
        }
    };

    const handleCopyRoomCode = () => {
        if (roomCode) {
            navigator.clipboard.writeText(roomCode).then(() => {
                setCopyFeedback('Copied!');
                setTimeout(() => setCopyFeedback(''), 1200);
            });
        }
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-left">
                        <Logo />
                        <span className="logo-text">EchoRoom</span>
                    <div className="room-name-container">
                        {isRoomOwner ? (
                            isEditing ? (
                                <input
                                    className="room-name-input"
                                    type="text"
                                    value={editableRoomName}
                                    onChange={handleRoomNameChange}
                                    onBlur={handleRoomNameBlur}
                                    onKeyDown={handleRoomNameKeyDown}
                                    autoFocus
                                />
                            ) : (
                                <span
                                    className="room-name-text editable"
                                    onClick={() => setIsEditing(true)}
                                    title="Click to edit room name"
                                    style={{cursor: 'pointer'}}
                                >
                                    {editableRoomName}
                                </span>
                            )
                        ) : (
                            <span className="room-name-text">{roomName}</span>
                        )}
                    </div>
                </div>
                <div className="header-right">
                    {!isRoom && userData && userData.permissions === 1 && (
                        <button className="all-rooms-button" onClick={goToAllRooms}>
                            All Rooms
                        </button>
                    )}
                    {roomCode && (
                        <div className="room-code-container" onClick={handleCopyRoomCode} title="Click to copy room code">
                            <span className="room-code-label">Room code:</span>
                            <span className="room-code-value">{roomCode}</span>
                            {copyFeedback && <span className="room-code-feedback">{copyFeedback}</span>}
                        </div>
                    )}
                    <div className="profile-icon" onClick={togglePopup}>
                        <MinidenticonImg username={useAuth().user.email}></MinidenticonImg>
                    </div>
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
