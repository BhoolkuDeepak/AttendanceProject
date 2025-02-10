import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { TypeAnimation } from "react-type-animation";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EventAttendanceGraph() {
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));

    fetch("http://localhost:5105/api/attendance/attendance")
      .then((response) => response.json())
      .then((data) => setAttendance(data))
      .catch((error) => console.error("Error fetching attendance:", error));
  }, []);

  const getAttendeesCount = (eventId) => {
    const eventAttendance = attendance.filter((record) => record.eventId === eventId);
    const memberIds = eventAttendance.flatMap((record) => record.attendedMembers);
    return memberIds.length;
  };

  const eventNames = events.map((event) => event.eventName);
  const attendeeCounts = events.map((event) => getAttendeesCount(event.eventId));

  const data = {
    labels: eventNames,
    datasets: [
      {
        label: "Attendees",
        data: attendeeCounts,
        backgroundColor: 'rgb(69,75,27,0.2)',
        borderColor: 'rgba(69,75,27, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Event Attendance Count',
      },
      tooltip: {
        enabled: false, 
      },
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const rect = event.native.target.getBoundingClientRect();
        setMousePosition({
          x: event.native.x - rect.left,
          y: event.native.y - rect.top,
        });
        setHoveredBarIndex(index);
      } else {
        setHoveredBarIndex(null);
      }
    },
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative">
      <div className="container mx-auto p-4">
        <Bar data={data} options={options} />
      </div>

      <AnimatePresence>
        {hoveredBarIndex !== null && events[hoveredBarIndex] && (
          <motion.div
            className="absolute  text-left   p-6 rounded-lg transition-all"
            style={{
              top: `${mousePosition.y + 20}px`,
              left: `${mousePosition.x + 20}px`,
              transform: "translate(-50%, -50%)",
              maxWidth: "350px",
              zIndex: 10,
              pointerEvents: 'none', // Prevent blocking other interactions
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-[rgb(69,75,27)] mb-2">
              <TypeAnimation
                sequence={[
                  events[hoveredBarIndex].eventName,
                  2000,
                  "",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
            <p className="text-[rgb(69,75,27)] text-lg mb-1">
              <strong>Timings:</strong> {events[hoveredBarIndex].timings}
            </p>
         
            <p className="text-[rgb(69,75,27)] font-medium mt-2">
              <strong>Attendees:</strong> {attendeeCounts[hoveredBarIndex]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
 
export default EventAttendanceGraph;
