import React from "react";
import useAuth from "../hooks/auth-context";
import ChatUI from "../pages/chatUI";
import Login from "./Login"

function RequireAuth() {

  const { IsAuthenticated } = useAuth();
  return IsAuthenticated() ? <ChatUI/> : <Login/>

}

export default RequireAuth;

