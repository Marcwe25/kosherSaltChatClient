import React, { useContext } from "react";
import { UserProvider, UserContext, UserDispatchContext } from "../auth-context";
import {useLocation,Navigate} from "react-router-dom";

function RequireAuth({ children }) {

  const user = React.useContext(UserContext);
    let location = useLocation();
    console.log("in context " + user)
    if (!user || user.length == 0) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
  }

export default RequireAuth;