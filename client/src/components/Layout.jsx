import { NavLink, useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 shadow-xl fixed h-screen">
        <h1 className="text-4xl font-extrabold mb-12 text-center">
          💰 FinTrack
        </h1>

        <div className="flex flex-col gap-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-700"
              }`
            }
          >
            🏠 Dashboard
          </NavLink>

          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-700"
              }`
            }
          >
            💸 Expenses
          </NavLink>

          <NavLink
            to="/income"
            className={({ isActive }) =>
              `p-3 rounded-lg transition ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-slate-700"
              }`
            }
          >
            💵 Income
          </NavLink>

          <button
            onClick={logout}
            className="mt-10 bg-red-500 p-3 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 bg-gray-100 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
