import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Compotent, authenticated, loading }) {
  if(!loading){
    if(authenticated === false){
      return <Navigate to="/login" />
    } else{
      return <Compotent/>
    }
  }
}

export default PrivateRoute;
