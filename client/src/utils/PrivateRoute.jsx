import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Compotent }) {

  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if(loading === false){
    if(isAuthenticated === false){
      return <Navigate to="/login" />
    } else{
      return <Compotent/>
    }
  }
}

export default PrivateRoute;
