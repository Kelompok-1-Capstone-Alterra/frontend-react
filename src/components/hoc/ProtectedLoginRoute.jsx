import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedLoginRoute = ({ component: Component, ...rest }) => {
  const token = Cookies.get("token");

  const location = useLocation();

  if (location.pathname === "/login") {
    return token ? (
      <Navigate
        to="/admin"
        replace
      />
    ) : (
      <Component {...rest} />
    );
  }

  return <Component {...rest} />;
};

export default ProtectedLoginRoute;
