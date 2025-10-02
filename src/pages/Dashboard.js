import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// ✅ Heroicons v2 imports
import {
  UserIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  BookOpenIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  const features = [
    { name: "Students", path: "/students", icon: <UserIcon className="h-10 w-10 text-blue-500" /> },
    { name: "Profile", path: "/profile", icon: <UserCircleIcon className="h-10 w-10 text-gray-500" /> },
    { name: "Attendance", path: "/attendance", icon: <ClipboardDocumentListIcon className="h-10 w-10 text-green-500" /> },
    { name: "Marks", path: "/marks", icon: <AcademicCapIcon className="h-10 w-10 text-yellow-500" /> },
    { name: "Fees", path: "/fees", icon: <CurrencyDollarIcon className="h-10 w-10 text-purple-500" /> },
    { name: "Certificates", path: "/certificates", icon: <DocumentTextIcon className="h-10 w-10 text-pink-500" /> },
    { name: "Timetable", path: "/timetable", icon: <CalendarDaysIcon className="h-10 w-10 text-indigo-500" /> },
    { name: "Notifications", path: "/notifications", icon: <BellIcon className="h-10 w-10 text-orange-500" /> },
    { name: "Library", path: "/library", icon: <BookOpenIcon className="h-10 w-10 text-fuchsia-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">
          Welcome, {user?.name || "User"}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Link
            to={feature.path}
            key={feature.name}
            className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            {feature.icon}
            <span className="mt-4 text-lg font-semibold text-gray-700">
              {feature.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
