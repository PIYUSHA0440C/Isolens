import { createContext, useState, useEffect } from "react";
import { register, login, getMe } from "./services/auth.api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    
    const handleLogin = async (email, password) => {

        setLoading(true);

        try {
            const response = await login(email, password);
            setUser(response.user);
            return response.user;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }


    const handleRegister = async (username, email, bio, password) => {
        
        setLoading(true);

        try {

            const response = await register(username, email, bio, password);
            setUser(response.user);
            return response.user;
            
        } catch (error) {
            console.log(error)
            
        } finally {
            setLoading(false);
        }

    }


    return (
        <AuthContext.Provider value={{user, loading, handleLogin, handleRegister}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;