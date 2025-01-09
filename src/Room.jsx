import React from 'react';
import './Room.css';


const Room = () => {
  return (
    <div className="room-page">
      <div className="room-content">
        <div className="room-info">
            <div className="room-circle"></div>
            <div className="room-text">
                <p>Room 1 name of username1</p>
                <p>Room code: 999999</p>
            </div>
        </div>
          <section className="user-list">
              <div className="user-item">
                  <div className="user-circle"></div>
                  <p>username 1</p>
                  <button className= "remove">remove</button>
              </div>
              <div className="user-item">
                  <div className="user-circle"></div>
                  <p>username 2</p>
                  <button className= "remove">remove</button>
              </div>
              <div className="user-item">
                  <div className="user-circle"></div>
                  <p>username 3</p>
                  <button className= "remove">remove</button>
              </div>
              <div className="user-item">
                  <div className="user-circle"></div>
                  <p>username 4</p>
                  <button className= "remove">remove</button>
              </div>
          </section>
          <section className="queue-section">
              <h2>Queue</h2>
          </section>
        </div>
        <footer className="room-footer">
        <button className="add-song-button" >+ Add Song</button>
      </footer>
    </div>
  );
};

export default Room;