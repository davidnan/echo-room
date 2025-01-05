import React from 'react';
import './App.css';

function RoomPage() {
    return (
        <div className="room-page-container">
            <div className="header">
              <h2>Echo room</h2>
            </div>
            <div className="content">
              <p>Enter a room or create one</p>
              <p>to listen to your favorite music with your friends</p>
              <div className="input-group">
                <input type="text" placeholder="Room code input" />
              </div>
              <div className="separator">Or</div>
              <button className="create-room-button">Create room</button>
            </div>
        </div>
    );
}

export default RoomPage;