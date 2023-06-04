import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedLoginRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("token");

  return token ? (
    <Navigate
      to="/admin"
      replace
    />
  ) : (
    <Component {...rest} />
  );
};

export default ProtectedLoginRoute;
