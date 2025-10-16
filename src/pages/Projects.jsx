import { useState } from "react";
import { projects as mockProjects } from "../data/mockData";
import EditProjectModal from "../components/EditProjectModal";
import ProjectModal from "../components/ProjectModal";
import AddProjectModal from "../components/AddProjectModal";
import toast, { Toaster } from "react-hot-toast";

import {
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

 
  const toastStyle = {
    duration: 2500,
    position: "top-right",
    style: {
      background: "#1f2937",
      color: "#fff",
      borderRadius: "10px",
      padding: "12px 16px",
      fontSize: "14px",
    },
  };


  const handleAddProject = (newProject) => {
    const conflict = projects.some((p) => p.deadline === newProject.deadline);
    if (conflict) {
      toast.error(
        <span className="flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-400" />
          Deadline conflict! Another project exists at the same time.
        </span>,
        toastStyle
      );
      return;
    }

    setProjects((prev) => [...prev, newProject]);
    toast.success(
      <span className="flex items-center gap-2">
        <FaCheckCircle className="text-green-400" />
        Project added successfully!
      </span>,
      toastStyle
    );
  };


  const handleEditProject = (updatedProject) => {
    const conflict = projects.some(
      (p) => p.id !== updatedProject.id && p.deadline === updatedProject.deadline
    );

    if (conflict) {
      toast.error(
        <span className="flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-400" />
          Deadline conflict! Another project exists at same time.
        </span>,
        toastStyle
      );
      return;
    }

    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    setEditProject(null);
    toast.success(
      <span className="flex items-center gap-2">
        <FaEdit className="text-blue-400" />
        Project updated successfully!
      </span>,
      toastStyle
    );
  };


  const confirmDeleteProject = () => {
    if (!confirmDelete) return;
    setProjects((prev) => prev.filter((p) => p.id !== confirmDelete.id));
    toast.success(
      <span className="flex items-center gap-2">
        <FaTrash className="text-red-500" />
        Project deleted successfully!
      </span>,
      toastStyle
    );
    setConfirmDelete(null);
  };


  const total = projects.length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const ongoing = projects.filter((p) => p.status === "Ongoing").length;
  const delayed = projects.filter((p) => p.status === "Delayed").length;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Toast */}
      <Toaster />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
        >
          <FaPlus className="mr-2" /> Add New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Projects", value: total, icon: <FaCheckCircle className="text-blue-500 text-3xl opacity-70" /> },
          { label: "Completed", value: completed, icon: <FaCheckCircle className="text-green-500 text-3xl opacity-70" /> },
          { label: "Ongoing", value: ongoing, icon: <FaClock className="text-yellow-400 text-3xl opacity-70" /> },
          { label: "Delayed", value: delayed, icon: <FaExclamationTriangle className="text-red-500 text-3xl opacity-70" /> },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between"
          >
            <div>
              <h3 className="text-sm text-gray-400">{stat.label}</h3>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Projects Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-4">Projects List</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="p-3">Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Team</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-gray-700 transition">
                  <td className="p-3">{proj.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        proj.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : proj.status === "Ongoing"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </td>
                  <td className="p-3">{proj.deadline}</td>
                  <td className="p-3">
                    <div className="flex -space-x-2">
                      {proj.team?.map((member, idx) => (
                        <img
                          key={idx}
                          src={member.avatar}
                          alt={member.name}
                          className="w-8 h-8 rounded-full border-2 border-gray-900"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditProject(proj)}
                      className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-sm"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(proj)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProject}
        />
      )}

      {editProject && (
        <EditProjectModal
          project={editProject}
          onClose={() => setEditProject(null)}
          onSave={handleEditProject}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Are you sure?</h3>
            <p className="mb-6 text-gray-300">
              Do you really want to delete{" "}
              <span className="text-red-400">{confirmDelete.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProject}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
