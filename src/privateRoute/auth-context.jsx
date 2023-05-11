import { createContext, useContext } from "react";
import { isAuthenticated } from "../token/refresh";

const AuthContext = createContext({
    contextIsAuthenticated: async () => {},
    contextLogin: () => {},
    contextLogout: () => {},
});



export function AuthProvider({ children }){

    return (
        <AuthContext.Provider value={{contextIsAuthenticated: isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function AuthConsumer() {
    return useContext(AuthContext); 
}