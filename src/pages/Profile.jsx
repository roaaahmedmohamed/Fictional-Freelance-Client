import { useState, useEffect } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";

export default function UserProfile() {
  const defaultUser = {
    name: "Mohamed Ali",
    email: "mohamed@example.com",
    role: "Project Manager",
    phone: "+20 123 456 789",
    address: "Cairo, Egypt",
    joined: "Jan 2023",
    department: "Product Development",
    avatar: "https://i.pravatar.cc/150?img=32",
    activity: [
      { id: 1, action: "Created a new project: Dashboard UI", time: "2h ago" },
      { id: 2, action: "Completed task: Landing Page Design", time: "1d ago" },
      { id: 3, action: "Updated project deadline", time: "3d ago" },
    ],
  };

  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(user);
  const [password, setPassword] = useState("");

  useEffect(() => {
    
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setShowModal(false);
    setPassword(""); 
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <button
          onClick={() => {
            setFormData(user);
            setShowModal(true);
          }}
          className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
        >
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center gap-6 mb-10">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full border-4 border-gray-700"
        />
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-400 flex items-center gap-2">
            <FaEnvelope /> {user.email}
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <FaUserTie /> {user.role}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Personal Info</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-2">
              <FaPhone className="text-blue-400" /> {user.phone}
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400" /> {user.address}
            </li>
            <li className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" /> Joined: {user.joined}
            </li>
            <li className="flex items-center gap-2">
              <FaUserTie className="text-blue-400" /> {user.department}
            </li>
          </ul>
        </div>

        {/* Activity */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <div className="divide-y divide-gray-700">
            {user.activity.map((act) => (
              <div
                key={act.id}
                className="py-3 flex justify-between items-center hover:bg-gray-700 px-2 rounded transition"
              >
                <p>{act.action}</p>
                <span className="text-sm text-gray-400">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

            <div className="space-y-4">
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="Avatar URL"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />

              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
