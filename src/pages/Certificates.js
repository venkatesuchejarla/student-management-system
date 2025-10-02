// src/pages/Certificates.js
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await API.get("/certificates");
        setCertificates(res.data);
      } catch (err) {
        setError("Error fetching certificates");
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
  }, []);

  if (loading) return <p className="p-6 text-gray-500">Loading certificates...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Certificates</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Student</th>
              <th className="p-2 border">Certificate Name</th>
              <th className="p-2 border">Issued Date</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((c) => (
              <tr key={c._id} className="hover:bg-gray-100">
                <td className="p-2 border">{c.studentName}</td>
                <td className="p-2 border">{c.name}</td>
                <td className="p-2 border">{new Date(c.issuedDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
