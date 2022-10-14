
import React from 'react'
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getAccountIsAuthenticated, getAccountStatus } from "../features/account/accountSlice";


const ProtectedRoute = ({ children }) => {

    const isAuthenticated = useSelector(getAccountIsAuthenticated)
    const accountStatus = useSelector(getAccountStatus)

    const Loading = () => {
        return (
            <h3>LOADING</h3>
        )
    }

    if (isAuthenticated)
        return children

    else {
        if (accountStatus === "failed")
            return <Navigate to="/login" replace />
        else return <Loading />
    }


}

export default ProtectedRoute