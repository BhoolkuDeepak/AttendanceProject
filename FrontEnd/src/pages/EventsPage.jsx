import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import AddEvent from "../components/AddEvent";
import EventList from "../components/EventList";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-8 w-full mx-auto border border-gray-200">
      <Routes>
        <Route
          index
          element={
            <>
              <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                Events
              </h2>
              <EventList events={events} />
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate("/events/add")}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Add Event
                </button>
              </div>
            </>
          }
        />

        <Route path="add" element={<AddEvent />} />
      </Routes>

      <Outlet />
    </div>
  );
}

export default EventsPage;
