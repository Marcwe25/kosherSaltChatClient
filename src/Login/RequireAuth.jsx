import React, { useEffect, useState } from "react";
import useAuth from "../hooks/auth-context";
import ChatUI from "../pages/chatUI";
import Login from "./Login"
import Public from "./Public";

function RequireAuth({children}) {

  const {registeredMember } = useAuth();
  return registeredMember ? <ChatUI/> : <Public/>

}

export default RequireAuth;

