import React from 'react';
import { MinidenticonImg } from './profile/MinidenticonImg.jsx';
import './UserListItem.css';

const UserListItem = ({ name, email, uuid, permissions, canKick, onKick }) => {
    // Check if the user is an owner by checking the rightmost bit
    const isOwner = (permissions & 1) === 1;

    return (
        <div className="user-list-item">
            <div className="user-avatar">
                <MinidenticonImg username={email} saturation={50} lightness={50} width={40} height={40} />
            </div>
            <div className="user-info">
                <div className="user-name">
                    {name}
                    {isOwner && <span className="crown-icon">👑</span>}
                </div>
                <div className="user-email">{email}</div>
            </div>
            {isOwner && <div className="user-role">Owner</div>}
            {canKick && (
                <button
                    className="kick-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onKick(uuid);
                    }}
                    title="Kick user"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Kick</span>
                </button>
            )}
        </div>
    );
};

export default UserListItem;
