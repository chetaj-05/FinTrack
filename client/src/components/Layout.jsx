import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout({ children }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex">
      {/* Mobile Button */}

      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}

      <div
        className={`
        fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white p-6 shadow-xl z-40
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <h1 className="text-4xl font-bold text-center mb-10">💰 FinTrack</h1>

        <p className="mb-8 text-center">👋 {user?.name}</p>

        <div className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive ? "bg-indigo-600" : "hover:bg-slate-700"
              }`
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive ? "bg-indigo-600" : "hover:bg-slate-700"
              }`
            }
          >
            💸 Expenses
          </NavLink>

          <NavLink
            to="/income"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive ? "bg-indigo-600" : "hover:bg-slate-700"
              }`
            }
          >
            💵 Income
          </NavLink>

          <NavLink
            to="/budget"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive ? "bg-indigo-600" : "hover:bg-slate-700"
              }`
            }
          >
            🎯 Budget
          </NavLink>

          <NavLink
            to="/reports"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive ? "bg-indigo-600" : "hover:bg-slate-700"
              }`
            }
          >
            📈 Reports
          </NavLink>

          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `p-3 rounded-lg ${
                isActive ? "bg-indigo-600" : "hover:bg-slate-700"
              }`
            }
          >
            👤 Profile
          </NavLink>

          <button
            onClick={logout}
            className="mt-8 bg-red-500 p-3 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}

      <div className="flex-1 md:ml-64 bg-gray-100 min-h-screen p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;
