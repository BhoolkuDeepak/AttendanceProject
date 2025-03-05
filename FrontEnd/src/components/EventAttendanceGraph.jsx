import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function EventAttendanceGraph() {
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState([]);

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
        backgroundColor: "#4B5320", // Army Green
        hoverBackgroundColor: "#2F4F2F", // Darker Green on Hover
        borderRadius: 8, // Rounded bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Event Attendance Count",
        font: { size: 18, weight: "bold" },
        color: "#333",
      },
      tooltip: {
        enabled: true,
      },
      legend: {
        display: false, // Hide legend for a cleaner UI
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Hide X-axis grid lines
        ticks: { color: "#333" },
      },
      y: {
        grid: { display: false }, // Hide Y-axis grid lines
        ticks: { color: "#333", stepSize: 1 },
      },
    },
    animation: {
      duration: 500,
      easing: "easeOutQuad",
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default EventAttendanceGraph;
