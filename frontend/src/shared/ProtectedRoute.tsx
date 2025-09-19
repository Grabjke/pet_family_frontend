import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "./redux";
import { authSelectors, type Role } from "../modules/auth/authSlice";
import { useAuthInit } from "./useAuthInit";
import { CircularProgress } from "@mui/material";

type Props = {
  roles: Role[];
} & PropsWithChildren;

const selectors = authSelectors;

export function ProtectedRoute({ children, roles }: Props) {
  const userRoles = useAppSelector(selectors.selectCurrentUserRoles);
  const isAuthenticated = useAppSelector(selectors.selectIsAuthenticated);
  const isInitialized = useAppSelector(selectors.selectIsInitialized);
  const navigate = useNavigate();
  const isReady = useAuthInit();

  const hasRequiredRole = userRoles?.some((userRole) =>
    roles.includes(userRole)
  );

  useEffect(() => {
    if (isReady && isInitialized) {
      if (!isAuthenticated || !hasRequiredRole) {
        navigate("/login", { replace: true });
      }
    }
  }, [
    isAuthenticated,
    userRoles,
    roles,
    navigate,
    isInitialized,
    isReady,
    hasRequiredRole,
  ]);

  if (!isReady || !isInitialized) {
    <CircularProgress size="3rem" />;
  }

  if (isAuthenticated && hasRequiredRole) {
    return children;
  }

  return null;
}
