import { createContext, useContext } from "react";
import { isAuthenticated } from "../service/tokenService";


const AuthContext = createContext({
    contextIsAuthenticated: () => {},
    contextLogin: () => {},
    contextLogout: () => {},
});

export function contextIsAuthenticated  () {
    const a = isAuthenticated()
    console.log("contextIsAuthenticated got")
    console.dir(a)
    return a;
}

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