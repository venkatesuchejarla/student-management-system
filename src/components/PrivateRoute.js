import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * PrivateRoute component
 * Protects routes that require authentication
 *
 * @param {ReactNode} children - The component(s) to render if authenticated
 * @param {string} [role] - Optional: restrict access to a specific role (e.g., 'admin')
 */
export default function PrivateRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  // Optional: show loading while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (role && user.role !== role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Access Denied</p>
      </div>
    );
  }

  // Authenticated → render children
  return children;
}
