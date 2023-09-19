import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Compotent, authenticated, loading }) {
  if(!loading){
    if(authenticated === true){
      return <Compotent/>
    } else{
      return <Navigate to='/login'/>
    }
  }
}

export default PrivateRoute;
