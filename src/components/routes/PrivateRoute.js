import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    console.log("check isAuthenticated: ", isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate> //Redirect
    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute;