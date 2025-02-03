import { useState, useEffect } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedEvent || selectedMembers.length === 0) {
      alert("Please select an event and at least one member.");
      return;
    }

    const attendanceData = {
      eventId: selectedEvent,
      eventDate: new Date().toISOString(), 
      attendedMembers: selectedMembers,    
    };

    setLoading(true);

    fetch("http://localhost:5105/api/attendance/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          alert("Attendance marked successfully!");
        } else {
          throw new Error("Error marking attendance");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error marking attendance:", error);
        alert("Failed to mark attendance. Please try again.");
      });
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-xl shadow-lg mt-8 w-full mx-auto">
      <h2 className="text-3xl font-bold text-white text-center mb-6">Mark Attendance</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-6">
          <label htmlFor="event" className="block text-sm font-medium text-gray-700">Event</label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.eventId} value={event.eventId}>
                {event.eventName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="members" className="block text-sm font-medium text-gray-700">Members</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {members.map((member) => (
              <div
                key={member.memberId}
                className={`cursor-pointer transform transition-all duration-300 ease-in-out p-4 rounded-lg shadow-md hover:scale-105 ${
                  selectedMembers.includes(member.memberId)
                    ? "bg-blue-200 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => handleCheckboxChange(member.memberId)}
              >
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.contact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Display a warning message if no members are selected */}
        {selectedMembers.length === 0 && (
          <p className="text-red-500 text-sm">Please select at least one member.</p>
        )}

        <button
          type="submit"
          className={`w-full p-3 text-white rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition-all duration-300`}
          disabled={loading || selectedMembers.length === 0}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default MarkAttendance;
