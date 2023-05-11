import React,{useState} from "react";
import useAuth from "./auth-context";
import {Navigate} from "react-router-dom";
// import Loading from "./Loading";
import { Outlet,redirect} from "react-router-dom";



function RequireAuth({redirectTo }) {
  console.count("RequireAuth")
  const { contextIsAuthenticated } = useAuth();
  const [isLogin,setIsLogin] = useState(false)

  async function tokenValidation () {
    try {
      await contextIsAuthenticated()
      setIsLogin(true)
    } catch {
      setIsLogin(false)
    }
  }

 tokenValidation()
    
  return isLogin ? <Outlet/> : <Navigate to={redirectTo} />

}

export default RequireAuth;