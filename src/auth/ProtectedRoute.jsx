import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../util/Loading.jsx";

const ProtectedRoute = ({ children } ) => {
    const { user, loading} = useAuth();

    if (loading) {
        return <Loading />;
    }
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
