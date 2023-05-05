import React, { createContext, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);


function UserProvider({ children }) {
    const [user, setUser] = useState({
      username: "John Doe"
    });
  
    return (
      <UserContext.Provider value={user}>
        <UserDispatchContext.Provider value={setUser}>
          {children}
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    );
  }
  
  export { UserProvider, UserContext, UserDispatchContext };