import React from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentAccount } from "../queryHooks/useAccount";

const ProtectedRoute = ({ children }) => {
    const { data, isLoading } = useGetCurrentAccount();

    if (data && !isLoading) return children;
    else {
        if (!data && !isLoading) return <Navigate to="/login" replace />;
        else return null;
    }
};

export default ProtectedRoute;
