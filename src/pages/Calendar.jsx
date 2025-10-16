import { useState, useEffect } from "react";
import {
  FaPlus,
  FaCalendarAlt,
  FaClock,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const toastOptions = {
  autoClose: 2000,
  theme: "dark",
};


const formatTime = (time24) => {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};


const parseTimeTo24 = (time) => {
  if (!time) return "";
  if (time.includes("AM") || time.includes("PM")) {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    let h = parseInt(hours, 10);
    if (modifier === "PM" && h < 12) h += 12;
    if (modifier === "AM" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minutes}`;
  }
  return time;
};

export default function Calendar() {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
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
    console.log("Saving event...", newEvent);

    if (!newEvent.title.trim() || !newEvent.date || !newEvent.time) {
      toast.warning("Please fill in all fields!", toastOptions);
      return;
    }

    const formattedEvent = {
      title: newEvent.title.trim(),
      date: newEvent.date,
      time: formatTime(newEvent.time),
    };

   
    const conflict = events.find((e) => {
      const existingTime24 = parseTimeTo24(e.time);
      const newTime24 = parseTimeTo24(formattedEvent.time);
      return (
        e.date === formattedEvent.date &&
        existingTime24 === newTime24 &&
        e.id !== editEventId
      );
    });

    if (conflict) {
      toast.warning(
        "An event already exists at this date and time!",
        toastOptions
      );
      return;
    }

    if (editEventId) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editEventId ? { ...formattedEvent, id: e.id } : e
        )
      );
      toast.success("Event updated successfully!", toastOptions);
    } else {
      setEvents((prev) => [...prev, { ...formattedEvent, id: Date.now() }]);
      toast.success("Event added successfully!", toastOptions);
    }

    setShowModal(false);
    setNewEvent({ title: "", date: "", time: "" });
    setEditEventId(null);
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

  
  const handleConfirmDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== deleteEventId));
    toast.success("Event deleted!", toastOptions);
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

      {/* Calendar + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
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
                    <div className="mt-1 text-xs truncate">
                      {eventToday.title}
                    </div>
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
            {events.length === 0 && (
              <p className="text-gray-400 text-sm text-center">
                No events yet.
              </p>
            )}
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
                    onClick={() => setDeleteEventId(event.id)}
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

     
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">
              {editEventId ? "Edit Event" : "Add New Event"}
            </h3>
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
              className="w-full mb-3 p-2 rounded bg-gray-700 text-white outline-none"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
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

      
      {deleteEventId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4 text-gray-300">
              Are you sure you want to delete this event?
            </p>
            <div className="flex justify-center gap-2">
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
