import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getMe } from "../services/auth.api";


const useAuth = () => {

    const context = useContext(AuthContext);

    const { user, setUser, loading, setLoading } = context;


    const handleLogin = async (email, password) => {
        
        setLoading(true);
        try {
            const response = await login(email, password);
            setUser(response.user);
            return response;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, bio, password) => {

        setLoading(true);
        try {
            const response = await register(username, email, bio, password);
            return response;
        }
        catch (error) {
            console.error(error);
            
        }
        finally {
            setLoading(false);
        }
    }



    return {user, loading, handleLogin, handleRegister};
}

export default useAuth;