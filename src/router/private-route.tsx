import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

import { TRole, TUser } from "@/interfaces/user";

interface PrivateRoutePropsI {
  allowedRoles: TRole[];
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRoutePropsI> = ({
  allowedRoles,
  children,
}) => {
  const location = useLocation();
  const user = useAuthUser<TUser>();
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to='/auth/sign-in' state={{ from: location }} replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
