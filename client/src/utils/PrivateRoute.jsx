import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Compotent, authenticated }) {
  return authenticated ? <Compotent/> : <Navigate to='/login'/>
}

export default PrivateRoute;
