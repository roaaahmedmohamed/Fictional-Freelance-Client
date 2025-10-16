
import { FaSearch } from "react-icons/fa";
import NotificationDropdown from "./NotificationDropdown"; 

export default function TopHeader() {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 shadow">
      {/* Search */}
      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-lg w-full sm:w-2/3 md:w-1/3 sm:mt-8">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-gray-200 w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <NotificationDropdown />

        {/* User Avatar */}
        <img
          src="https://i.pravatar.cc/150?img=31"
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />
      </div>
    </header>
  );
}
