import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const googleLogin = () => {
        window.open("http://localhost:8000/api/v1/auth/login-with-google", "_self"); 
    };

    return <AuthContext.Provider value={{user,isAuthenticated,googleLogin,loading}}>{children}</AuthContext.Provider>;
};


export const useAuth = () => useContext(AuthContext);