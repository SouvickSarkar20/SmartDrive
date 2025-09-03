import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<h1 className="p-10">Welcome to AlgoDrive 🚀</h1>}
          />
        </Routes>
        <Route
          path="/route"
          element={
            <ProtectedRoute>
              <RoutePlanner />
            </ProtectedRoute>
          }
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
