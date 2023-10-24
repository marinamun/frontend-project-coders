import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  //If it's loading we either show h1 or we show the private page aka children
  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
};
export default PrivateRoute;
