import { useState, useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { X as XIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

function MarkAttendance() {
  const [events, setEvents] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));

    fetch("http://localhost:5105/api/attendance/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent || selectedMembers.length === 0) {
      alert("Please select an event and at least one member.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5105/api/attendance/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: selectedEvent, memberIds: selectedMembers }),
      });
      if (!response.ok) {
        throw new Error("Failed to mark attendance");
      }
      alert("Attendance marked successfully!");
      setSelectedMembers([]);
      refreshData();  // Fetch updated attendance
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  
 
  return (
    <div className="relative  p-6 rounded-lg  w-11/12 md:w-3/4 lg:w-1/2 mx-auto mt-10">
      <h2 className="text-3xl font-bold text-[rgb(69,75,27)] text-center mb-6">Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Event</label>
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-[rgb(69,75,27)]"
            required
          >
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>{event.eventName}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Members</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {members.map((member) => (
              <div
                key={member.memberId}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${selectedMembers.includes(member.memberId) ? 'bg-[rgb(69,75,27)] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => handleCheckboxChange(member.memberId)}
              >
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm">{member.contact}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-700 cursor-not-allowed' : 'bg-[rgb(69,75,27)] hover:bg-[rgb(55,65,25)]'} transition-all duration-300`}
          disabled={loading || selectedMembers.length === 0}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default MarkAttendance;
