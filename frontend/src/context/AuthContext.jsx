import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/Profile";


// 1️⃣ Create a context
export const AuthContext = createContext();

// 2️⃣ Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 3️⃣ Check if a user is logged in on mount
    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const profile = await getProfile(); // calls backend /auth/profile
                    setUser(profile);
                } catch (err) {
                    console.error("Invalid token, logging out...");
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = (user, token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // 6️⃣ Expose values to the rest of the app
    return (
        <AuthContext.Provider value={{ user, loading, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};
