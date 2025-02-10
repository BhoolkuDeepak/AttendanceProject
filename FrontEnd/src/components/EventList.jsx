import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useDragControls } from "framer-motion";

function EventList() {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState(null); // Store attendees data
  const [clickedEventId, setClickedEventId] = useState(null); // Track clicked event
  const controls = useAnimation();
  const dragControls = useDragControls();
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"], // Continuous left movement
      transition: { repeat: Infinity, duration: 20, ease: "linear" },
    });
  }, [controls]);

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/events")
      .then((response) => response.json())
      .then((data) => setEvents([...data, ...data])) // Duplicate for seamless scrolling
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleDragEnd = (_, info) => {
    // Continue scrolling based on drag velocity
    controls.start({
      x: info.offset.x * 2, // Scale velocity
      transition: {
        type: "inertia",
        velocity: info.velocity.x, // Use framer's inertia for momentum
        power: 0.5, // Adjusts the friction
        min: -containerRef.current.scrollWidth / 2, // Prevent over-scrolling
        max: 0, // Keep within bounds
      },
    });
  };

  const handleClick = (eventId) => {
    // If the clicked event is already open, close it, otherwise fetch and open it
    if (clickedEventId === eventId) {
      setClickedEventId(null); // Close the event details
      setAttendees(null); // Clear attendees data
    } else {
      setClickedEventId(eventId); // Set clicked event
      // Fetch attendees for the event
      fetch(`http://localhost:5105/api/attendance/attendees/${eventId}`)
        .then((response) => response.json())
        .then((data) => setAttendees(data))
        .catch((error) => console.error("Error fetching attendees:", error));
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="relative w-full max-w-5xl overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -1000, right: 1000 }} // Allow more movement
          dragElastic={0.2} // Adds natural resistance
          dragControls={dragControls}
          animate={controls} // Apply momentum effect
          onDragEnd={handleDragEnd} // Apply inertia on release
          style={{ display: "flex" }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="flex-none border-[rgb(245,245,240)] shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
              style={{
                width: "300px",
                height: "250px",
                cursor: "grab",
              }}
              onClick={() => handleClick(event.eventId)} // Trigger on click
            >
              <div className="p-4">
                <h2 className="text-lg text-[rgb(69,75,27)] font-bold mb-1">
                  {event.eventName}
                </h2>
                <p className="text-[rgb(69,75,27)] text-sm mb-1">{event.timings}</p>
                <p className="text-[rgb(69,75,27)] text-sm">{event.eventDetails}</p>
                {clickedEventId === event.eventId && attendees && (
                  <div className="mt-2">
                    <h3 className="text-sm text-[rgb(69,75,27)]">Attendees:</h3>
                    <ul className="text-xs">
                      {attendees.length > 0 ? (
                        attendees.map((attendee, index) => (
                          <li key={index}>{attendee.name}</li> // Displaying attendee names
                        ))
                      ) : (
                        <li>No attendees yet.</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default EventList;
