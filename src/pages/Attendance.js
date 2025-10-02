// src/pages/Attendance.js
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await API.get("/attendance");
        setAttendance(res.data);
      } catch (err) {
        setError("Error fetching attendance");
      } finally {
        setLoading(false);
      }
    };
    fetchAttendance();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading attendance...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((a) => (
              <tr key={a._id} className="hover:bg-gray-100">
                <td className="p-2 border">{a.studentName}</td>
                <td className="p-2 border">{new Date(a.date).toLocaleDateString()}</td>
                <td className="p-2 border">{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
