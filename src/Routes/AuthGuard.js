import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { apiCallPost } from "../axiosApi/Axios";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "../hooks/useQuery";
import { setUserDetails } from "../redux/userDetails/userSlice";

const AuthGuard = ({ children, redirectPath = "/", type }) => {
  const query = useQuery();
  const dispatch = useDispatch();
  const [isValidated, setIsValidated] = useState(false);
  let loggedIn = useSelector((state)=>state.userDetails.token)
  
  if(loggedIn){
    return <Navigate to={"login"} replace />;
  }
  if (isValidated) {
    return <Navigate to={"login"} replace />;
  }
  return  <Navigate to={"/"} replace />;
};

export default AuthGuard;
