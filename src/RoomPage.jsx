import {useCallback, useEffect, useState} from 'react';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useNavigate, useParams} from "react-router-dom";
import Header from "./util/Header.jsx";
import {useAuth} from "./auth/AuthContext.jsx";
import {getAuth} from "firebase/auth";
import config from "./config/serverConfig.js"
import YouTubeAudioPlayer from "./YoutubeVideoPlayer.jsx";


const RoomPage = () => {
    const params = useParams()
    const [socketUrl, setSocketUrl] = useState(`ws://${config.serverIp}:${config.port}/`);
    const [messageHistory, setMessageHistory] = useState([]);
    const [users, setUsers] = useState(["{}"]);
    const [songs, setSongs] = useState([""]);
    const [roomName, setRoomName] = useState("");
    const [videoId, setVideoId] = useState('GBIIQ0kP15E');  // Initial video ID


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

    const onPlayerEnd = () => {
        getAuth().currentUser.getIdToken().then( accessToken => {
            sendMessage(JSON.stringify({type: "get_next_song", accessToken: accessToken }));
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
            <div>
                <h2>users: {JSON.stringify(users)}</h2>
                <h2>songs: {JSON.stringify(songs)}</h2>
            </div>
            {isRoomOwner && (
                <div>
                    <button
                        onClick={handleClickSendMessage}
                        disabled={readyState !== ReadyState.OPEN}
                    >
                        Click Me to send 'this url: https://www.youtube.com/watch?v=utpXlVnUEUE'
                    </button>
                    <ul>
                        <YouTubeAudioPlayer videoId={videoId} onPlayerEnd={onPlayerEnd}/>
                    </ul>
                </div>
            )}        </>
    )
};

export default RoomPage;