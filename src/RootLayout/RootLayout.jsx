import React from "react";
import {
  FaTachometerAlt,
  FaEdit,
  FaUsers,
  FaCog,
  FaEye,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";
import { AuthContext } from "../Contexts/ContextProvider";
import { Link, Outlet } from "react-router";

function RootLayout() {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="min-h-screen bg-yellow-100 flex justify-center p-5">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col h-[94vh] w-60 bg-gray-800 text-white p-4 space-y-6 overflow-y-auto">
          <Link to="/myapp">
            <h1 className="text-2xl font-bold">Taka Tally</h1>
          </Link>

          <Link
            to="/myapp/addnew"
            className="flex items-center gap-2 bg-white text-purple-700 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition"
          >
            <MdOutlineAddCircle size={20} /> Create New Statement
          </Link>

          <nav className="flex flex-col gap-4 text-sm mt-4">
            <Link className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-white">
              <FaFileInvoiceDollar size={18} />
              All Statements
            </Link>
            <Link
              to="/myapp/expenses"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-white"
            >
              <FaEdit /> Expenses
            </Link>
            <Link
              to="/myapp/income"
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 transition text-white"
            >
              <FaTachometerAlt /> Income
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 h-[94vh] overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
