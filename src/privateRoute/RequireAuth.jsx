import React,{useRef} from "react";
import useAuth from "../hooks/auth-context";
import { Outlet, Navigate} from "react-router-dom";


function RequireAuth() {
  
  const randomid = Math.random()
  console.log("RequireAuth randomid",randomid)
  
  const { IsAuthenticated } = useAuth();

  return IsAuthenticated() ? <Outlet/> : <Navigate to={'/login'} />;

}

export default RequireAuth;

