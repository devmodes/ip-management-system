import { useAuth } from "@providers/auth-provider";
import { Navigate, Outlet } from "react-router-dom";

function AuthGuard() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default AuthGuard;
