import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { auth, user } from "../Data/Auth/authHelper";

interface Props {
    children: JSX.Element,
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const user = auth.isAuthenticated()
    const navigate = useNavigate()
    return user ? children : <Navigate to="/auth/login" />

};

export default PrivateRoute;