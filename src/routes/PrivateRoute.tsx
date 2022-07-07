import { Navigate } from "react-router-dom";
import { auth } from "../Data/Auth/authHelper";

interface Props {
    children: JSX.Element
}

const PrivateRoute = ({ children }: Props) => {
    const newAuth = auth.isAuthenticated();
    return newAuth ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;