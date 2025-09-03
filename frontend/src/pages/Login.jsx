import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      console.log(email);
      
      const res = await API.post("/auth/login", { email, password });
      console.log(res);
      
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-[0_0_20px_2px_rgba(255,255,255,0.3)] w-80">
        <h1 className="text-2xl font-bold text-green-400 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
