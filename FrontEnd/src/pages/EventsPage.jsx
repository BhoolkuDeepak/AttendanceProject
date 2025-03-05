import { useState, useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import AddEvent from "../components/AddEvent";
import EventList from "../components/EventList";
import EventAttendanceGraph from "../components/EventAttendanceGraph";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isManuallyNavigated, setIsManuallyNavigated] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    if (
      events.length > 0 &&
      !isHovered &&
      !isMouseDown &&
      !isManuallyNavigated
    ) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [events.length, isHovered, isMouseDown, isManuallyNavigated]);

  useEffect(() => {
    let timeout;
    if (isManuallyNavigated) {
      timeout = setTimeout(() => setIsManuallyNavigated(false), 5000);
    }
    return () => clearTimeout(timeout);
  }, [isManuallyNavigated]);

  const handleManualNavigation = (index) => {
    setCurrentIndex(index);
    setIsManuallyNavigated(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(245,245,240)]">
      {/* Header Section */}
      <header className="bg-[rgb(69,75,27)] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">Events</h1>
        <button
          onClick={() => setAddEventModalOpen(true)}
          className="flex items-center space-x-2 bg-white text-[rgb(69,75,27)] px-4 py-2 rounded-md shadow-md hover:bg-gray-100 transition"
        >
          <AddCircleIcon className="text-[rgb(69,75,27)]" />
          <span>Add Event</span>
        </button>
      </header>

      {/* Main Content Section */}
      <main className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Left Panel - Event Graph */}
        <section className="lg:w-2/3 ">
          <h2 className="text-xl font-semibold text-[rgb(69,75,27)] ">
            Attendance Overview
          </h2>
          <EventAttendanceGraph />
        </section>

        {/* Right Panel - Event List */}
        <section className="lg:w-1/3">
          <h2 className="text-xl font-semibold text-[rgb(69,75,27)] mb-4">
            Upcoming Events
          </h2>
          <EventList
            events={events}
            currentIndex={currentIndex}
            onNavigate={handleManualNavigation}
          />
        </section>
      </main>

      {/* Add Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setAddEventModalOpen(false)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
            <h3 className="text-2xl font-bold text-center mb-4 text-[rgb(69,75,27)]">
              Add New Event
            </h3>
            <AddEvent closeModal={() => setAddEventModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default EventsPage;
