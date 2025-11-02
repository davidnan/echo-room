import React from 'react';
import UserListItem from './UserListItem.jsx';
import './UserList.css';

const UserList = ({ users, onKickUser, canKick, currentUserEmail }) => {
    return (
        <div className="user-list-container">
            <h3 className="list-title">Users in Room</h3>
            <div className="user-list">
                {users && users.length > 0 ? (
                    users.map((user, index) => (
                        <UserListItem
                            key={user.email || index}
                            name={user.name}
                            email={user.email}
                            uuid={user.uid}
                            permissions={user.permissions || 0}
                            canKick={canKick && user.email !== currentUserEmail}
                            onKick={onKickUser}
                        />
                    ))
                ) : (
                    <div className="empty-state">No users in room</div>
                )}
            </div>
        </div>
    );
};

export default UserList;
