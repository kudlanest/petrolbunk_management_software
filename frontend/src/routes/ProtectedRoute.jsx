import { Navigate } from "react-router-dom";

//Prevent Direct access to other pages if the user is not logged in
export default function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}