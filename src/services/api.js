import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update with your backend URL
});

// Request interceptor to add JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ===========================
// Auth APIs
// ===========================
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

// ===========================
// Student APIs
// ===========================
export const getStudents = () => API.get("/students");
export const getStudentById = (id) => API.get(`/students/${id}`);
export const createStudent = (data) => API.post("/students", data);
export const updateStudent = (id, data) => API.put(`/students/${id}`, data);
export const deleteStudent = (id) => API.delete(`/students/${id}`);

// ===========================
// Attendance APIs
// ===========================
export const getAttendance = () => API.get("/attendance");
export const markAttendance = (data) => API.post("/attendance", data);
export const updateAttendance = (id, data) => API.put(`/attendance/${id}`, data);

// ===========================
// Marks / Academic APIs
// ===========================
export const getMarks = () => API.get("/marks");
export const addMarks = (data) => API.post("/marks", data);
export const updateMarks = (id, data) => API.put(`/marks/${id}`, data);

// ===========================
// Fees APIs
// ===========================
export const getFees = () => API.get("/fees");
export const addFeePayment = (data) => API.post("/fees", data);
export const updateFeePayment = (id, data) => API.put(`/fees/${id}`, data);

// ===========================
// Certificates APIs
// ===========================
export const getCertificates = () => API.get("/certificates");
export const generateCertificate = (data) => API.post("/certificates", data);

// ===========================
// Export default axios instance
// ===========================
export default API;
