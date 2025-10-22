import {useCallback, useEffect, useState, useRef} from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useNavigate, useParams} from "react-router-dom";
import Header from "./util/Header.jsx";
import {useAuth} from "./auth/AuthContext.jsx";
import {getAuth} from "firebase/auth";
import config from "./config/serverConfig.js"
import YouTubeAudioPlayer from "./YoutubeVideoPlayer.jsx";
import UserList from "./UserList.jsx";
import SongList from "./SongList.jsx";
import MediaControls from './MediaControls.jsx';
import AddSongInput from './AddSongInput.jsx';


const RoomPage = () => {
    const params = useParams()
    const [socketUrl, setSocketUrl] = useState(`ws://${config.serverIp}:${config.port}/`);
    const [messageHistory, setMessageHistory] = useState([]);
    const [users, setUsers] = useState(["{}"]);
    const [songs, setSongs] = useState([""]);
    const [roomName, setRoomName] = useState("");
    const [videoId, setVideoId] = useState('GBIIQ0kP15E');  // Initial video ID
    const playerRef = useRef(null);


    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
    const navigate = useNavigate();
    const auth = useAuth();

    // Determine room owner (assume first user in users array is owner, adjust as needed)
    const roomOwnerEmail = users && users.length > 0 && users[0].email ? users[0].email : null;
    const currentUserEmail = auth.user?.email;
    const isRoomOwner = roomOwnerEmail === currentUserEmail;

    // Handler to update room name
    const handleRoomNameChange = (newRoomName) => {
        getAuth().currentUser.getIdToken().then(accessToken => {
            sendMessage(JSON.stringify({type: "update_room_name", roomName: newRoomName, accessToken: accessToken }));
        });
    };

    useEffect(() => {
        if (lastMessage === null) {
            return;
        }
        const messageJson = JSON.parse(lastMessage.data);
        console.log("Received message: ", JSON.stringify(messageJson));
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
            case "roomName":
                setRoomName(messageJson.roomName);
                break;

        }

    }, [lastMessage]);

    useEffect( () => {
        console.log(readyState)
        if (readyState === ReadyState.OPEN) {
            console.log("ready");
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

    const handleAddSong = (url) => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "add_song", url: url, accessToken: accessToken }));
        })
    }

    const handlePlay = () => {
        playerRef.current?.playVideo();
    }

    const handlePause = () => {
        playerRef.current?.pauseVideo();
    }

    const handleSkip = () => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "get_next_song", accessToken: accessToken }));
        })
    }

    const onPlayerEnd = () => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "get_next_song", accessToken: accessToken }));
        })
    }

    const handleRemoveSong = (songUid) => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "remove_song", songUid: songUid, accessToken: accessToken }));
        })
    }

    const handleReorderSongs = (fromIndex, toIndex) => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "reorder_songs", fromIndex: fromIndex, toIndex: toIndex, accessToken: accessToken }));
        })
    }

    const handleKickUser = (userEmail) => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "kick_user", userEmail: userEmail, accessToken: accessToken }));
        })
    }

    return (
        <>
            <Header
                isRoom={true}
                roomName={roomName}
                isRoomOwner={isRoomOwner}
                onRoomNameChange={handleRoomNameChange}
                roomCode={params.roomCode}
            />
            <div className="room-page-content">
                {isRoomOwner && (
                    <>
                        <YouTubeAudioPlayer videoId={videoId} onPlayerEnd={onPlayerEnd} ref={playerRef}/>
                        <MediaControls
                            onPlay={handlePlay}
                            onPause={handlePause}
                            onSkip={handleSkip}
                        />
                    </>
                )}

                <AddSongInput
                    onAddSong={handleAddSong}
                    disabled={readyState !== ReadyState.OPEN}
                />

                <UserList
                    users={users}
                    onKickUser={handleKickUser}
                    canKick={isRoomOwner}
                    currentUserEmail={currentUserEmail}
                />
                <SongList
                    songs={songs}
                    onRemoveSong={handleRemoveSong}
                    onReorderSongs={handleReorderSongs}
                    canManage={isRoomOwner}
                />
            </div>
        </>
    )
};

export default RoomPage;
