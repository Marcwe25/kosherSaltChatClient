import React from "react";
import useAuth from "./auth-context";
import {Navigate} from "react-router-dom";

function RequireAuth({ children,redirectTo }) {

  const { contextIsAuthenticated } = useAuth();
  console.log("inside requireAuth")
  
  const authenticated =  contextIsAuthenticated()

  console.log("requireAuth authenticated is")
  console.dir(authenticated)
  return authenticated ? children : <Navigate to={redirectTo} />;
}

export default RequireAuth;