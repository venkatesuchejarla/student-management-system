import { useEffect, useState } from "react";
import API from "../services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", class: "" });
  const [editId, setEditId] = useState(null);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/students");
        setStudents(res.data);
      } catch (err) {
        setError("Error fetching students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Handle add/edit form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/students/${editId}`, formData);
      } else {
        await API.post("/students", formData);
      }
      setShowModal(false);
      setFormData({ name: "", email: "", class: "" });
      setEditId(null);
      // Refresh list
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      alert("Failed to save student");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this student?")) {
      try {
        await API.delete(`/students/${id}`);
        setStudents(students.filter((s) => s._id !== id));
      } catch (err) {
        alert("Failed to delete student");
      }
    }
  };

  // Handle edit
  const handleEdit = (student) => {
    setFormData({ name: student.name, email: student.email, class: student.class || "" });
    setEditId(student._id);
    setShowModal(true);
  };

  if (loading) return <p className="p-6 text-gray-500">Loading students...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Students List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Student
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Class</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id} className="hover:bg-gray-100">
                <td className="p-2 border">{s.name}</td>
                <td className="p-2 border">{s.email}</td>
                <td className="p-2 border">{s.class || "-"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-500 text-white px-2 py-1 ml-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editId ? "Edit Student" : "Add Student"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border p-2 w-full rounded"
                required
              />
              <input
                type="text"
                placeholder="Class"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="border p-2 w-full rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditId(null); setFormData({ name: "", email: "", class: "" }); }}
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  {editId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
