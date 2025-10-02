import { createContext, useState, useEffect } from "react";

// Create the Auth context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  // Get user from localStorage on first load
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Loading state (useful for async operations)
  const [loading, setLoading] = useState(false);

  // Login function
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setUser(data);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  // Check if user is authenticated
  const isAuthenticated = () => !!user;

  // Optional: keep user in sync if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
