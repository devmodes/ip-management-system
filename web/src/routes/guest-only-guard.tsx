import { useAuth } from "@providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

function GuestOnlyGuard() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}

export default GuestOnlyGuard;
