
export default function ProjectCard({ project }) {
  const statusColor = {
    "Completed": "bg-green-100 text-green-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    "Pending": "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="font-bold text-gray-700">{project.name}</h3>
      <p className={`inline-block px-2 py-1 mt-2 rounded-full text-xs font-semibold ${statusColor[project.status]}`}>
        {project.status}
      </p>
      <p className="text-gray-500 text-sm mt-1">Deadline: {project.deadline}</p>
    </div>
  );
}
