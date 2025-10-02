// src/pages/Marks.js
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Marks() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await API.get("/marks");
        setMarks(res.data);
      } catch (err) {
        setError("Error fetching marks");
      } finally {
        setLoading(false);
      }
    };
    fetchMarks();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading marks...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Marks</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m._id} className="hover:bg-gray-100">
                <td className="p-2 border">{m.studentName}</td>
                <td className="p-2 border">{m.subject}</td>
                <td className="p-2 border">{m.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
