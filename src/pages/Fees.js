// src/pages/Fees.js
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await API.get("/fees");
        setFees(res.data);
      } catch (err) {
        setError("Error fetching fee history");
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading fees...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fee History</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((f) => (
              <tr key={f._id} className="hover:bg-gray-100">
                <td className="p-2 border">{f.studentName}</td>
                <td className="p-2 border">{f.amount}</td>
                <td className="p-2 border">{new Date(f.date).toLocaleDateString()}</td>
                <td className="p-2 border">{f.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
