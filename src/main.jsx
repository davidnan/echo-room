import React from 'react';
import ReactDOM from 'react-dom/client';
import MainRouter from './MainRouter'; 
import { BrowserRouter } from 'react-router-dom';
import {AuthProvider} from "./auth/AuthContext.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <React.StrictMode>
            <BrowserRouter>
                <MainRouter />
            </BrowserRouter>
        </React.StrictMode>
    </AuthProvider>
);