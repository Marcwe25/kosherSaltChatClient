import React,{useRef} from "react";
import useAuth from "../hooks/auth-context";
import { Outlet, Navigate} from "react-router-dom";
// import useAuthentication from '../hooks/useAuthentication'


function RequireAuth() {
  // const {isAuthenticated} = useAuthentication()
  // return isAuthenticated() ? <Outlet/> : <Navigate to={'/login'} />;

  const { contextIsAuthenticated } = useAuth();
  const authenticated =  contextIsAuthenticated()
  return authenticated ? <Outlet/> : <Navigate to={'/login'} />;

}

export default RequireAuth;

