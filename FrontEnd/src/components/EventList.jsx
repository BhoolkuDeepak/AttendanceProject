import { useEffect, useState } from "react";

function EventList() {
  const [events, setEvents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));

    fetch("http://localhost:5105/api/attendance/attendance")
      .then((response) => response.json())
      .then((data) => setAttendance(data))
      .catch((error) => console.error("Error fetching attendance:", error));

    fetch("http://localhost:5105/api/attendance/members")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  const getAttendeesNames = (eventId) => {
    const eventAttendance = attendance.filter((record) => record.eventId === eventId);

    const memberIds = eventAttendance.flatMap((record) => record.attendedMembers);

    return memberIds
      .map((id) => {
        const member = members.find((m) => m.memberId === id);
        return member ? member.name : "Old Member";
      })
      .join(", ");
  };

  return (
    <div className="  mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 tracking-wider" style={{  }}>
        Upcoming Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.eventId}
            className="relative bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out group"
            style={{ fontFamily: "' cursive" }}
          >
            <h3 className="text-2xl font-semibold text-indigo-800 tracking-wide">{event.eventName}</h3>
            <p className="text-sm text-gray-600 mt-2">{event.timings}</p>

            <div className="absolute bottom-0 left-0 right-0 bg-blue-200 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-4 rounded-b-xl z-10 shadow-2xl transform group-hover:scale-105">
              <h4 className="text-lg font-semibold text-gray-800 tracking-wide">Attendees</h4>
              <ul className="mt-2">
                {getAttendeesNames(event.eventId) ? (
                  <li className="text-gray-700">{getAttendeesNames(event.eventId)}</li>
                ) : (
                  <li className="text-gray-700">No attendees</li>
                )}
                <p className="mt-2 text-gray-700">{event.eventDetails}</p>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
