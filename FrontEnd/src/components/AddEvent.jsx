import { useState } from "react";

function AddEvent({ closeModal }) {
  const [eventName, setEventName] = useState("");
  const [timings, setTimings] = useState("");
  const [location, setLocation] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDay, setRecurringDay] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!eventName.trim()) {
      tempErrors.eventName = "Event name is required.";
    } else if (eventName.length < 3) {
      tempErrors.eventName = "Event name must be at least 3 characters.";
    }

    if (!timings.trim()) {
      tempErrors.timings = "Timings are required.";
    } else if (!/^([0-9]{1,2}):([0-9]{2})\s?(AM|PM)$/.test(timings)) {
      tempErrors.timings = "Please enter a valid time format (e.g., 10:00 AM).";
    }

    if (!location.trim()) {
      tempErrors.location = "Location is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const eventData = {
      eventName,
      timings,
      location,
      isRecurring,
      recurringDay: isRecurring ? recurringDay : "",
    };

    fetch("http://localhost:5105/api/attendance/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then((response) => {
        if (response.ok) {
          setEventName("");
          setTimings("");
          setLocation("");
          setIsRecurring(false);
          setRecurringDay("");
          setErrors({});
          alert("Event added successfully!");
          closeModal();
        } else {
          throw new Error("Error adding event");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full max-w-lg p-6 text-[rgb(69,75,27)]">
      <h2 className="text-2xl font-semibold mb-4">Add Event</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-lg font-medium opacity-80">Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-3 bg-transparent border-b-2 border-[rgb(69,75,27)] focus:outline-none focus:border-green-700 transition-all duration-200"
          />
          {errors.eventName && <p className="text-red-600 text-sm">{errors.eventName}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium opacity-80">Timings</label>
          <input
            type="text"
            value={timings}
            onChange={(e) => setTimings(e.target.value)}
            className="w-full p-3 bg-transparent border-b-2 border-[rgb(69,75,27)] focus:outline-none focus:border-green-700 transition-all duration-200"
          />
          {errors.timings && <p className="text-red-600 text-sm">{errors.timings}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium opacity-80">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 bg-transparent border-b-2 border-[rgb(69,75,27)] focus:outline-none focus:border-green-700 transition-all duration-200"
          />
          {errors.location && <p className="text-red-600 text-sm">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium opacity-80">Recurring Event</label>
          <input
            type="checkbox"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="mr-2"
          />
        </div>

        {isRecurring && (
          <div>
            <label className="block text-lg font-medium opacity-80">Recurring Day</label>
            <input
              type="text"
              value={recurringDay}
              onChange={(e) => setRecurringDay(e.target.value)}
              className="w-full p-3 bg-transparent border-b-2 border-[rgb(69,75,27)] focus:outline-none focus:border-green-700 transition-all duration-200"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-[rgb(69,75,27)] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200"
        >
          Add Event
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
 