import { Navigate } from "react-router-dom";
import { useUserAuth } from "../Context/userAuthContext";
import { auth } from "./Config/config";

function ProtectedRoute({ children }){
    // const {user}=useUserAuth();
    // const {user}=useUserAuth();/
    const user=auth.currentUser;
    const checkAuth=localStorage.getItem('isAuth')
    if(!checkAuth && !user){
        return <Navigate to='/login'/>
    }
    return children
}

export default ProtectedRoute;