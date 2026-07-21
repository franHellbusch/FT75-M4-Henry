import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RequireAuthProps {
    user: { email: string; uid: string } | null;
}

function RequireAuth({ user }: RequireAuthProps) {
    const location = useLocation();
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return <Outlet />;
}

export default RequireAuth