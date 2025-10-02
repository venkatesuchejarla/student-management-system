import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded credentials for now
    if (email === "venkatesu.chejarla@gmail.com" && password === "admin") {
      const fakeUser = {
        name: "Venkatesu Chejarla",
        email,
        token: "dummy-token", // temporary placeholder
      };
      login(fakeUser);

      // Redirect to dashboard after login
      navigate("/");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded w-96">
        {/* College Logo */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/college-logo.png" // file inside public/
            alt="College Logo"
            className="h-20 w-auto mb-2"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
