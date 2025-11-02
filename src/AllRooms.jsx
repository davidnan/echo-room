import React, { useState, useEffect } from 'react';
import './AllRooms.css';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import config from './config/serverConfig.js';
import Header from './util/Header.jsx';
import { useAuth } from './auth/AuthContext.jsx';

function AllRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userData } = useAuth();

    useEffect(() => {
        // Only fetch rooms if user has permission level 1
        if (userData && userData.permissions === 1) {
            fetchRooms();
        } else {
            setLoading(false);
        }
    }, [userData]);

    const fetchRooms = async () => {
        try {
            setLoading(true);
            const accessToken = await getAuth().currentUser.getIdToken();
            const response = await axios.post(`http://${config.serverIp}:${config.port}/get_rooms`, {
                accessToken: accessToken
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            setRooms(response.data);
            console.log("got rooms: ", response.data);
            setError(null);
        } catch (e) {
            console.error('Error fetching rooms:', e);
            setError('Failed to load rooms');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteRoom = async (roomCode) => {
        try {
            const accessToken = await getAuth().currentUser.getIdToken();
            await axios.post(`http://${config.serverIp}:${config.port}/delete_room`, {
                roomCode: roomCode,
                accessToken: accessToken
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            // Refresh the rooms list after deletion
            fetchRooms();
        } catch (e) {
            console.error('Error deleting room:', e);
            alert('Failed to delete room');
        }
    };

    // Check if user has permission
    if (!userData || userData.permissions !== 1) {
        return (
            <>
                <Header isRoom={false} roomName={""} />
                <div className="all-rooms-container">
                    <div className="all-rooms-content">
                        <h1>Access Denied</h1>
                        <p className="error-text">You do not have permission to view all rooms.</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Header isRoom={false} roomName={""} />
            <div className="all-rooms-container">
                <div className="all-rooms-content">
                    <h1>All Rooms</h1>
                    {loading ? (
                        <p className="loading-text">Loading rooms...</p>
                    ) : error ? (
                        <p className="error-text">{error}</p>
                    ) : rooms.length === 0 ? (
                        <p className="no-rooms-text">No rooms available</p>
                    ) : (
                        <div className="rooms-grid">
                            {rooms.map((room) => (
                                <div key={room.code} className="room-card">
                                    <div className="room-card-header">
                                        <h3 className="room-name">{room.roomName || 'Unnamed Room'}</h3>
                                    </div>
                                    <div className="room-card-body">
                                        <p className="room-code">
                                            <span className="room-code-label">Code:</span>
                                            <span className="room-code-value">{room.code}</span>
                                        </p>
                                    </div>
                                    <div className="room-card-actions">
                                        <button
                                            className="delete-room-button"
                                            onClick={() => handleDeleteRoom(room.code)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default AllRooms;
