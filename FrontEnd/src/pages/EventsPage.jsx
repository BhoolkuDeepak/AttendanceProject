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
    if (events.length > 0 && !isHovered && !isMouseDown && !isManuallyNavigated) {
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
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      <div className="flex justify-between items-center px-6 mb-6">
        <h2 className="text-3xl font-bold text-[rgb(69,75,27)]">Events</h2>
        <AddCircleIcon
          onClick={() => setAddEventModalOpen(true)}
          className="text-[rgb(69,75,27)] cursor-pointer"
          style={{ fontSize: 40 }}
        />
      </div>

      <EventList
        events={events}
        currentIndex={currentIndex}
        onNavigate={handleManualNavigation}
      />
      <EventAttendanceGraph />

      {isAddEventModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 transition-transform transform scale-95 animate-fade-in relative">
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
