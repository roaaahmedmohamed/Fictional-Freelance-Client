// src/components/Sidebar.jsx
import { useState } from "react";
import { FaChartPie, FaCalendarAlt, FaUser, FaTable, FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/", icon: <FaChartPie /> },
  { name: "Calendar", path: "/calendar", icon: <FaCalendarAlt /> },
  { name: "User Profile", path: "/profile", icon: <FaUser /> },
  { name: "Projects", path: "/projects", icon: <FaTable /> },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-0 left-0 z-60 bg-blue-600 text-white p-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <FaBars size={20} />
      </button>

      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 flex flex-col transition-transform duration-300 z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8 md:mb-6">
          <h1 className="text-2xl font-bold text-blue-400">TailAdmin</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {menu.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              onClick={() => setIsOpen(false)} // يغلق الموبايل بعد الضغط
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
