import React from "react";
import { Link, useLocation } from "react-router";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaEdit,
  FaTachometerAlt,
} from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";

const navItems = [
  { name: "Home", icon: <FaHome />, to: "/myapp" },
  { name: "Add New", icon: <MdOutlineAddCircle />, to: "/myapp/addnew" },
  {
    name: "Statements",
    icon: <FaFileInvoiceDollar />,
    to: "/myapp/statements",
  },
  { name: "Expenses", icon: <FaEdit />, to: "/myapp/expenses" },
  { name: "Income", icon: <FaTachometerAlt />, to: "/myapp/incomes" },
];

export default function NavberMobile() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t shadow-inner flex justify-around py-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.to}
          className={`flex flex-col items-center text-sm ${
            location.pathname === item.to ? "text-purple-500" : "text-gray-500"
          }`}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
