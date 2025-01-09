import React from 'react';
import './App.css';


import { useNavigate } from 'react-router-dom';


 



function RoomPage() {

  const navigate = useNavigate();

  const goToRoom = () => {
   
    navigate("/room");
  };

  const HandleClick = () => {
    
    goToRoom();
    
  }
    return (
        <div className="room-page-container">
            <div className="content">
              <p>Enter a room or create one</p>
              <p>to listen to your favorite music with your friends</p>
              <div className="input-group">
                <input type="text" placeholder="Room code input" />
              </div>
              <div className="separator">Or</div>
              <button className="create-room-button" onClick={HandleClick}>Create room</button>
            </div>
        </div>
    );
}

export default RoomPage;