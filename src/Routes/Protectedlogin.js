import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedLogin = ({ children, redirectPath = "/" }) => {
  let loggedIn = useSelector((state)=>state.userDetails.token)
  if (!loggedIn) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export default ProtectedLogin;
