import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("token");

  // Perform client-side token validation
  const isValidToken = () => {
    if (token) {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const decodedToken = jwt_decode(token);
        if (user.admin_id !== decodedToken.admin_id) {
          return false;
        }
        return true;
      } catch (error) {
        Cookies.remove("token");
        localStorage.removeItem("user");
        return false;
      }
    }
    return false;
  };

  return isValidToken() ? (
    <Component {...rest} />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default PrivateRoute;
