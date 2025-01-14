import React from 'react';
import './Room.css';
import {useCallback, useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useNavigate, useParams} from "react-router-dom";
import {useAuth} from "./auth/AuthContext.jsx";
import {getAuth} from "firebase/auth";
import config from "./config/serverConfig.js"
import YouTubeAudioPlayer from "./YoutubeVideoPlayer.jsx";


const RoomPage = () => {
  const [socketUrl, setSocketUrl] = useState(`ws://${config.serverIp}:${config.port}/`);
    const [messageHistory, setMessageHistory] = useState([]);
    const [users, setUsers] = useState(["{}"]);
    const [songs, setSongs] = useState([""]);
    const [videoId, setVideoId] = useState('GBIIQ0kP15E');  // Initial video ID


    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const navigate = useNavigate();

    useEffect(() => {
        if (lastMessage === null) {
            return;
        }
        const messageJson = JSON.parse(lastMessage.data);
        switch (messageJson.type) {
            case "next_song":
                setVideoId(messageJson.songUid);
                break;
            case "songs":
                setSongs(messageJson.songs);
                break;
            case "users":
                setUsers(messageJson.users);
                break;

        }

    }, [lastMessage]);

    useEffect( () => {
        if (readyState === ReadyState.OPEN) {
            getAuth().currentUser.getIdToken().then( accessToken => {
                sendMessage(JSON.stringify({type: "join", code: params.roomCode, accessToken: accessToken }));
            })
        }
    }, [readyState]);

    useEffect(() => {
        if (readyState === ReadyState.CLOSED) {
            navigate('/')
        }
    })


    const handleClickSendMessage = useCallback(() => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "add_song", url: "https://www.youtube.com/watch?v=utpXlVnUEUE", accessToken: accessToken }));
        })
    }, []);

    const onPlayerEnd = () => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "get_next_song", accessToken: accessToken }));
        })
    }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songLink, setSongLink] = useState('');

 

  const handleAddSong = () => {
    setIsModalOpen(true);
  };

  const handleSave = () => {
    // Handle saving the song link here
    setIsModalOpen(false);
    setSongLink('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSongLink('');
  };

  return (
    <div className="room-container">
      <div className="room-wrapper">
        <div className="room-card">
          <div className="room-grid">
            {/* Left Panel - Users */}
            <div className="room-divider">
              <div className="room-section">
                <h2 className="room-section-title">Joined users</h2>
                {users.length > 0 ? (
                  <div className="user-list">
                    {users.map((user, index) => (
                      <div key={index} className="user-item">
                        <div className="user-info">
                          <p className="user-name">{user.username}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                        {user.isOwner && (
                          <span className="owner-badge">Owner</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">No user joined</p>
                )}
              </div>
            </div>

            {/* Right Panel - Music Queue */}
            <div>
              <div className="room-section">
                <h2 className="room-section-title">Music Queue</h2>
                {songs.length > 0 ? (
                  <div className="song-list">
                    {songs.map((song, index) => (
                      <div key={index} className="song-item">
                         <YouTubeAudioPlayer videoId={videoId} onPlayerEnd={onPlayerEnd}/>
                        <img
                          src={`https://img.youtube.com/vi/${song.uid}/mqdefault.jpg`}
                          alt={song.title}
                          className="song-thumbnail"
                        />
                        <p className="song-title">{song.title}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="empty-message">No song added</p>
                )}
              </div>
            </div>
          </div>

          {/* Add Song Button */}
          <button className="add-song-button" onClick={handleAddSong}>
            Add song
          </button>
        </div>
      </div>
      <button
                    onClick={handleClickSendMessage}
                    disabled={readyState !== ReadyState.OPEN}
                >
                    Click Me to send 'this url: https://www.youtube.com/watch?v=utpXlVnUEUE'
                </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <input
              type="text"
              className="modal-input"
              placeholder="Link"
              value={songLink}
              onChange={(e) => setSongLink(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-button cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="modal-button save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPage;