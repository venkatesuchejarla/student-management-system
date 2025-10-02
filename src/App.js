import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Marks from "./pages/Marks";
import Fees from "./pages/Fees";
import Certificates from "./pages/Certificates";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Chatbot from "./components/Chatbot"; // import the chatbot

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/students"
            element={
              <PrivateRoute role="admin">
                <Students />
              </PrivateRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <PrivateRoute>
                <Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path="/marks"
            element={
              <PrivateRoute>
                <Marks />
              </PrivateRoute>
            }
          />
          <Route
            path="/fees"
            element={
              <PrivateRoute>
                <Fees />
              </PrivateRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <PrivateRoute>
                <Certificates />
              </PrivateRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Floating Chatbot, visible on all pages */}
        <Chatbot />
      </Router>
    </AuthProvider>
  );
}

export default App;
