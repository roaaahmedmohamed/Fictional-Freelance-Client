
import { useState, useRef, useEffect } from "react";
import { notifications } from "../data/mockData";
import { FaBell } from "react-icons/fa";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 bg-gray-800 text-gray-300 rounded-full hover:bg-gray-700 transition"
      >
        <FaBell size={20} />
        <span className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full border border-gray-900"></span>
      </button>

      
      {open ? (
        <div className="absolute right-0 mt-2 w-72 bg-gray-800 text-gray-100 rounded-lg shadow-lg border border-gray-700 z-50">
          <h4 className="font-bold p-3 border-b border-gray-700">Recent Activity</h4>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.map((note) => (
              <li key={note.id} className="p-3 hover:bg-gray-700 transition">
                <p className="text-sm">{note.text}</p>
                <span className="text-xs text-gray-400">{note.time}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
