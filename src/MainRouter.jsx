import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Login from './auth/Login.jsx';
import App from './App.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import RoomPage from "./RoomPage.jsx";
import {useAuth} from "./auth/AuthContext.jsx";
import GuestRoute from "./auth/GuestRoute.jsx";
import Profile from "./profile/Profile.jsx";

const MainRouter = () => {
    const {user, loading} = useAuth();
    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute >
                <App/>
            </ProtectedRoute>}>
            </Route>

            <Route path="/profile" element={<ProtectedRoute >
                <Profile />
            </ProtectedRoute>}>
            </Route>

            <Route path="/" element={user ? <Login /> : <Navigate to="/"/>}/>

            <Route path="/room/:roomCode" element={<ProtectedRoute >
                <RoomPage/>
            </ProtectedRoute>}>
            </Route>
            <Route path="/login" element={<GuestRoute> <Login /></GuestRoute>}/>
            <Route path="*" element={<p>Nothing here: 404!</p>} />
        </Routes>
    );
};

export default MainRouter;