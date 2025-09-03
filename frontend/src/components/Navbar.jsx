import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-black text-green-400
        flex items-center justify-between
        px-10 py-4 shadow-md shadow-[0_0_20px_2px_rgba(255,255,255,0.3)]
      "
    >
      {/* Left: Brand */}
      <Link to="/" className="font-bold text-lg tracking-wide">
        AlgoDrive
      </Link>

      {/* Right: Auth Links */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="hidden sm:inline">{user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-gray-200 transition-colors"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
