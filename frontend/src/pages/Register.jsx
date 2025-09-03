import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registration successful, please login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-[0_0_20px_2px_rgba(255,255,255,0.3)] w-80">
        <h1 className="text-2xl font-bold text-green-400 text-center mb-6">
          Register
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-green-600 hover:bg-green-700 text-black font-semibold p-2 rounded-md transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
