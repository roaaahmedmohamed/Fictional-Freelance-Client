import { useState } from "react";

export default function EditProjectModal({ project, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: project.id,
    name: project.name,
    status: project.status,
    deadline: project.deadline,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">✏️ Edit Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100"
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Delayed">Delayed</option>
          </select>
          <input
            type="text"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            placeholder="Deadline (e.g. Oct 1, 2025, 10:00 AM)"
            className="w-full px-3 py-2 rounded bg-gray-700 text-gray-100"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
