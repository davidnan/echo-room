import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login.jsx';
import App from './App.jsx';
import PrivateRoute from './auth/PrivateRoute.jsx';

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute >
                <App/>
            </PrivateRoute>}>
            </Route>
            <Route path="/login" element={<Login />}/>
        </Routes>
    );
};

export default MainRouter;