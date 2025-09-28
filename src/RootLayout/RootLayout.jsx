import React from "react";
import {
  FaTachometerAlt,
  FaEdit,
  FaHome,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import { AuthContext } from "../Contexts/ContextProvider";
import { Link, Outlet, useLocation } from "react-router";
import LogoutButton from "../Components/LogoutButton";
import NavberMobile from "../Components/NavberMobile";

function RootLayout() {
  const { user } = React.useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <FaHome />, to: "/myapp" },
    {
      name: "Statements",
      icon: <FaFileInvoiceDollar />,
      to: "/myapp/statements",
    },
    { name: "Expenses", icon: <FaEdit />, to: "/myapp/expenses" },
    { name: "Income", icon: <FaTachometerAlt />, to: "/myapp/incomes" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center p-0 md:p-5 bg-gray-100">
      {/* Mobile logout button */}
      {user && (
        <div className="fixed top-6  right-4 md:hidden z-50">
          <LogoutButton />
        </div>
      )}

      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col relative w-60 bg-gray-800 text-white p-4 space-y-6 overflow-y-auto">
          <Link to="/myapp">
            <h1 className="text-2xl font-bold">Taka Tally</h1>
          </Link>

          <Link
            to="/myapp/addnew"
            className="flex items-center gap-2 bg-white text-purple-400 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <MdOutlineAddCircle size={20} /> Add New
          </Link>

          <nav className="flex flex-col gap-4 text-sm mt-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition ${
                  location.pathname === item.to ? "bg-gray-700" : "text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop logout */}
          <div className="absolute left-5 bottom-5">
            <LogoutButton />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 min-h-[calc(100vh-60px)]">
          <Outlet />
        </main>
      </div>

      {/* Mobile navigation */}
      <NavberMobile />
    </div>
  );
}

export default RootLayout;
