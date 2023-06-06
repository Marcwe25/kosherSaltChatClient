import { createContext, useContext } from "react";
import useAuthentication from '../hooks/useAuthentication'
import { useState } from "react";

const AuthContext = createContext({
    contextIsAuthenticated: async () => {}
});

export function AuthProvider({ children }){

    const {isAuthenticated} = useAuthentication() 

    return (
        <AuthContext.Provider value={
            {contextIsAuthenticated: isAuthenticated,
              }
            }>
            {children}
        </AuthContext.Provider>
    )
}

export default function AuthConsumer() {
    return useContext(AuthContext); 
}