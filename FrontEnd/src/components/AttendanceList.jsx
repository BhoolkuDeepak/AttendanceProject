// import { useEffect, useState } from "react";

// function AttendanceList() {
//   const [attendance, setAttendance] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [members, setMembers] = useState([]);

//   useEffect(() => {
//     // Fetch attendance records
//     fetch("http://localhost:5105/api/attendance/attendance")
//       .then((res) => res.json())
//       .then((data) => setAttendance(data))
//       .catch((error) => console.error("Error fetching attendance:", error));

//     // Fetch events and members for more detailed information
//     fetch("http://localhost:5105/api/attendance/events")
//       .then((res) => res.json())
//       .then((data) => setEvents(data))
//       .catch((error) => console.error("Error fetching events:", error));

//     fetch("http://localhost:5105/api/attendance/members")
//       .then((res) => res.json())
//       .then((data) => setMembers(data))
//       .catch((error) => console.error("Error fetching members:", error));
//   }, []);

//   const getEventName = (eventId) => {
//     const event = events.find((e) => e.eventId === eventId);
//     return event ? event.eventName : "Unknown Event";
//   };

//   const getMemberNames = (memberIds) => {
//     return memberIds
//       .map((id) => {
//         const member = members.find((m) => m.memberId === id);
//         return member ? member.name : "Unknown Member";
//       })
//       .join(", ");
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow mt-4">
//       <h2 className="text-xl font-bold">Attendance Records</h2>
//       <ul>
//         {attendance.map((record) => (
//           <li key={record.attendanceId}>
//             <strong>{getEventName(record.eventId)}</strong>:{" "}
//             {getMemberNames(record.attendedMembers)} -{" "}
//             {new Date(record.eventDate).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AttendanceList;
