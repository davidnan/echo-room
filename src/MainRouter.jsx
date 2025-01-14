import React from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './auth/Login.jsx';
import App from './App.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import RoomPage from "./Room.jsx";
import { useAuth } from "./auth/AuthContext.jsx";
import GuestRoute from "./auth/GuestRoute.jsx";
import Profile from "./Profile.jsx";
import Header from './Header.jsx'; // Make sure this path matches your project structure

const Layout = ({ children }) => {
    const location = useLocation();
    const hideHeader = location.pathname === "/login";

    return (
        <div className="app-container">
            {!hideHeader && <Header />}
            <main className="main-content">{children}</main>
        </div>
    );
};

const MainRouter = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <ProtectedRoute>
                            <App />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="/room/:roomCode" 
                    element={
                        <ProtectedRoute>
                            <RoomPage />
                        </ProtectedRoute>
                    } 
                />

                <Route 
                    path="/login" 
                    element={
                        <GuestRoute>
                            <Login />
                        </GuestRoute>
                    } 
                />

                <Route 
                    path="*" 
                    element={
                        <div className="flex items-center justify-center min-h-screen">
                            <p className="text-xl">Nothing here: 404!</p>
                        </div>
                    } 
                />
            </Routes>
        </Layout>
    );
};

export default MainRouter;