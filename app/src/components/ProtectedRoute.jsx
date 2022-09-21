
import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getAccountStatus } from "../features/account/accountSlice";
import { getAuthenticationStatus } from "../features/authentication/authenticationSlice";


const ProtectedRoute = ({ children }) => {

    const authenticationStatus = useSelector(getAuthenticationStatus)
    const accountStatus = useSelector(getAccountStatus)

    if (authenticationStatus === "succeeded" && accountStatus === "succeeded")
        return children
    else return <Navigate to="/login" replace />

}

export default ProtectedRoute