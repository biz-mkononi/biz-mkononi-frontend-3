import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../Data/Auth/authHelper";

interface Props {
    children: JSX.Element
}

const PrivateRoute = ({ children }: Props) => {
    const newAuth = auth.isAuthenticated();
    return newAuth ? (
        <>
            {children}
            <Outlet />
        </>
    ) : (
        <Navigate to="/auth/login" replace />
    )
};

export default PrivateRoute;