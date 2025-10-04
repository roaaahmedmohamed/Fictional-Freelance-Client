import { useState, useEffect } from "react";
import { FaPlus, FaCalendarAlt, FaClock, FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";


const toastStyles = {
  success: { autoClose: 2000, theme: "dark" },
  error: { autoClose: 2000, theme: "dark" },
  warning: { autoClose: 3000, theme: "dark" },
};


const formatTime = (time24) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};


const parseTimeTo24 = (time12) => {
  if (!time12.includes("AM") && !time12.includes("PM")) return time12;
  const [time, modifier] = time12.split(" ");
  let [hours, minutes] = time.split(":");
  let h = parseInt(hours, 10);
  if (modifier === "PM" && h < 12) h += 12;
  if (modifier === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${minutes}`;
};

export default function Calendar() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Team Meeting", date: "2025-10-02", time: "10:00 AM" },
          { id: 2, title: "Client Presentation", date: "2025-10-05", time: "3:00 PM" },
          { id: 3, title: "Project Deadline", date: "2025-10-10", time: "11:59 PM" },
        ];
  });

  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });
  const [editEventId, setEditEventId] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);

  
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      toast.error("Please fill all fields!", toastStyles.error);
      return;
    }

    const formattedEvent = {
      ...newEvent,
      time: formatTime(newEvent.time), 
    };

    const conflict = events.find(
      (e) =>
        e.date === formattedEvent.date &&
        e.time === formattedEvent.time &&
        e.id !== editEventId
    );
    if (conflict) {
      toast.warning("There's already an event at the same date & time!", toastStyles.warning);
      return;
    }

    if (editEventId) {
      setEvents(events.map((e) => (e.id === editEventId ? { ...e, ...formattedEvent } : e)));
      toast.success("Event updated successfully!", toastStyles.success);
    } else {
      setEvents([...events, { id: Date.now(), ...formattedEvent }]);
      toast.success("Event added successfully!", toastStyles.success);
    }

    setNewEvent({ title: "", date: "", time: "" });
    setEditEventId(null);
    setShowModal(false);
  };

  const handleEdit = (event) => {
    setNewEvent({
      title: event.title,
      date: event.date,
      time: parseTimeTo24(event.time), 
    });
    setEditEventId(event.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setDeleteEventId(id);
  };

  const handleConfirmDelete = () => {
    setEvents(events.filter((e) => e.id !== deleteEventId));
    toast.success("Event deleted!", toastStyles.success);
    setDeleteEventId(null);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Calendar</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition"
        >
          <FaPlus className="mr-2" /> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">October 2025</h3>
          <div className="grid grid-cols-7 gap-2 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-semibold text-gray-400">
                {d}
              </div>
            ))}
            {days.map((day) => {
              const dateStr = `2025-10-${String(day).padStart(2, "0")}`;
              const eventToday = events.find((e) => e.date === dateStr);
              return (
                <div
                  key={day}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    eventToday
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {day}
                  {eventToday && (
                    <div className="mt-1 text-xs truncate">{eventToday.title}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-400" /> {event.title}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <FaClock /> {event.date} - {event.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-2 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {editEventId ? "Edit Event" : "Add New Event"}
            </h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditEventId(null);
                  setNewEvent({ title: "", date: "", time: "" });
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteEventId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this event?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteEventId(null)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
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
