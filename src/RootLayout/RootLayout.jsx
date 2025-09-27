import React from "react";
import { FaTachometerAlt, FaEdit, FaUsers, FaCog, FaEye } from "react-icons/fa";
import { MdOutlineAddCircle } from "react-icons/md";

function RootLayout() {
  return (
    <div className="min-h-screen bg-yellow-100 flex p-5 justify-center">
      <div className="flex w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-60 bg-gray-800 text-white p-4 space-y-6">
          <h1 className="text-2xl font-bold">Taka Tally</h1>
          <button className="flex items-center gap-2 bg-white text-purple-700 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
            <MdOutlineAddCircle size={20} /> Create New Statement
          </button>

          <nav className="flex flex-col gap-4 text-sm">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-yellow-300"
            >
              Expences
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-yellow-300"
            >
              Income
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {/* Header */}

          {/* Greeting */}
          <div className="bg-purple-100 p-6 rounded-lg flex items-center gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold">Hi, Alyssa</h3>
              <p className="text-sm text-gray-600">
                Ready to start your day with some pitch decks?
              </p>
            </div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
              alt="Illustration"
              className="w-24"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-yellow-200 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">83%</p>
              <p className="text-sm">Open Rate</p>
            </div>
            <div className="bg-blue-200 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">77%</p>
              <p className="text-sm">Complete</p>
            </div>
            <div className="bg-pink-200 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">91</p>
              <p className="text-sm">Unique Views</p>
            </div>
            <div className="bg-purple-200 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">126</p>
              <p className="text-sm">Total Views</p>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4"></div>
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
