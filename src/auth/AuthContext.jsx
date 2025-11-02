import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../config/firebaseConfig.js"; // Import your Firebase config
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import config from "../config/serverConfig.js";

const AuthContext = createContext({
    user: null,
    loading: true,
    userData: null,
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async (currentUser) => {
        if (!currentUser) {
            setUserData(null);
            return;
        }

        try {
            const accessToken = await currentUser.getIdToken();
            console.log(currentUser);
            const response = await axios.post(
                `http://${config.serverIp}:${config.port}/get_user_data`,
                {
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    accessToken: accessToken
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            setUserData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUserData(null);
        }
    };

    const refreshUserData = async () => {
        if (auth.currentUser) {
            await fetchUserData(auth.currentUser);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Fetch user data from backend when user logs in
                await fetchUserData(currentUser);
            } else {
                setUserData(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, userData, refreshUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
