
import { Outlet, Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../hooks/useAuth";

const PrivateRoutes = () => {
    console.log("isUserLoggedIn : ",isUserLoggedIn())
    if(!isUserLoggedIn()) return <Navigate to="/login" />;
    return <Outlet />
}

export default PrivateRoutes