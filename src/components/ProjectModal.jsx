
import { FaTimes } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null; 

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative text-gray-800">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Content */}
        <h2 className="text-xl font-bold mb-4">{project.name}</h2>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-sm ${
              project.status === "Completed"
                ? "bg-green-100 text-green-600"
                : project.status === "Ongoing"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {project.status}
          </span>
        </p>
        <p className="mt-2">
          <strong>Deadline:</strong> {project.deadline}
        </p>

        <div className="mt-4">
          <strong>Team:</strong>
          <div className="flex mt-2 -space-x-2">
            {project.team?.map((m, idx) => (
              <img
                key={idx}
                src={m.avatar}
                alt={m.name}
                title={m.name}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
