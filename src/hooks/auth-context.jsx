import { createContext, useContext } from "react";
import { useState , useMemo} from "react";
import jwtDecode from "jwt-decode";
import {REFRESH_TOKEN } from '../utility/constNames';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [registeredMember,setRegisteredMember] = useState(null)

    const login = async (data) => {
      console.log("AuthProvider login data" , data)
      setRegisteredMember(data);
      console.log("AuthProvider login registeredMember" , registeredMember)

    };
  
    const logout = () => {
        setRegisteredMember(null);
    };

    function isTokenExpired (token_param){
        try{
            const decodedToken = jwtDecode(token_param);
            const currentTime = Date.now() / 1000;
            const exp = decodedToken.exp < currentTime;
            return exp
        } catch {
            return true
        } 
    }
    

    const IsAuthenticated = () => {
        const localRefreshToken = localStorage.getItem(REFRESH_TOKEN)
        return localRefreshToken && !isTokenExpired(localRefreshToken)
    }
  
    const value = useMemo(
      () => ({
        registeredMember,
        login,
        logout,
        IsAuthenticated
      }),
      [registeredMember]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}

export default function useAuth() {
    return useContext(AuthContext); 
}