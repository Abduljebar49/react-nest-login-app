import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./routing/PrivateRoute";
import LoginPage from "./routing/LoginPage";
import SignUpPage from "./routing/SignUpPage";
import HomePage from "./routing/HomePage";

const router = createBrowserRouter([
  { path: "login", element: <LoginPage /> }, 
  { path: "signup", element: <SignUpPage /> },  
  {
    element: <PrivateRoutes />,
    children: [{ path: "/", element: <HomePage /> }],
  },
]);

export default router;
