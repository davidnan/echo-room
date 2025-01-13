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

    return (
        <>
            <Header />
            <div>
                <h2>users: {JSON.stringify(users)}</h2>
                <h2>songs: {JSON.stringify(songs)}</h2>
            </div>
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
        </>
    )
};

export default RoomPage;