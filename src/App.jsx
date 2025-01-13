import React from 'react';
import './App.css';
import {logout} from './auth/firebaseLogin.js';
import ProfileHeader from "./ProfileHeader.jsx";
import axios from 'axios'
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import Header from "./util/Header.jsx";
import config from "./config/serverConfig.js"

function RoomPage() {

    const navigate = useNavigate();

    const handleEnteredCode = async (code) => {
        if (code.length === 11) {
            try{
                console.log(code)
                const accessToken = await getAuth().currentUser.getIdToken()
                const response = await axios.post(`http://${config.serverIp}:${config.port}/join_room`, {
                    code: code,
                    accessToken: accessToken
                }, {
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log(response)
                if (response.status === 200) {
                    navigate(`/room/${code}`)
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    const handleCreateRoom = async () => {
        const accessToken = await getAuth().currentUser.getIdToken()
        const response = await axios.post(`http://${config.serverIp}:${config.port}/create_room`, {
             accessToken: accessToken
        }, {
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        navigate(`/room/${response.data}`)
    }

    return (
        <>
            <Header />
            {/*<ProfileHeader></ProfileHeader>*/}
            <div className="room-page-container">
                <div className="header">
                    <h2>Echo room</h2>
                </div>
                <div className="content">
                    <p>Enter a room or create one</p>
                    <p>to listen to your favorite music with your friends</p>
                    <div className="input-group">
                        <input type="text" placeholder="Room code input"
                               onChange={(e) => handleEnteredCode(e.target.value)}/>
                    </div>
                    <div className="separator">Or</div>
                    <button className="create-room-button" onClick={handleCreateRoom}>Create room</button>
                </div>
            </div>
        </>
    );
}

export default RoomPage;