import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("token");

  return token ? (
    <Component {...rest} />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default PrivateRoute;
