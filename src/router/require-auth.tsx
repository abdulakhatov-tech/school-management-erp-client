import React from "react";
import { Navigate } from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const RequireAuth: React.FC<{ children: React.ReactNode; fallbackPath: string }> = ({
    children,
    fallbackPath,
}) => {
    const isAuthenticated = useIsAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to={fallbackPath} replace />;
    }

    return <>{children}</>;
};

export default RequireAuth;
