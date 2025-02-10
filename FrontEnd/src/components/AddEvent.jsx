  import { useState } from "react";

  function AddEvent() {
    const [eventName, setEventName] = useState("");
    const [timings, setTimings] = useState("");
    const [location, setLocation] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringDay, setRecurringDay] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To store error messages

    const handleSubmit = (e) => {
      e.preventDefault();

      // Basic validation
      if (!eventName || !timings || !location) {
        setErrorMessage("Please fill out all the fields.");
        return;
      }

      // Optional: Add time format validation for "timings" field
      const timeRegex = /^([0-9]{1,2}):([0-9]{2})\s?(AM|PM)$/;
      if (!timeRegex.test(timings)) {
        setErrorMessage("Please enter a valid time format (e.g., 10:00 AM).");
        return;
      }

      // If timings is provided, validate time


      const eventData = {
        eventName: eventName,
        timings: timings,
        location: location,
        isRecurring: isRecurring,
        recurringDay: isRecurring ? recurringDay : "", // Only set recurringDay if isRecurring is true
      };

      fetch("http://localhost:5105/api/attendance/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Event could not be added");
            });
          }
          return response.json();
        })
        .then(() => {
          // Clear form and error message on success
          setEventName("");
          setTimings("");
          setLocation("");
          setIsRecurring(false);
          setRecurringDay("");
          setErrorMessage(""); // Clear error message on success
          alert("Event added successfully!");
        })
        .catch((err) => {
          setErrorMessage(err.message); // Set error message on failure
        });
    };

    return (
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
        <h2 className="text-xl font-bold">Add Event</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div> // Display error message
        )}
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="block border p-2 rounded w-full my-2"
        />
        <input
          type="text"
          placeholder="Timings (e.g., 10:00 AM)"
          value={timings}
          onChange={(e) => setTimings(e.target.value)}
          className="block border p-2 rounded w-full my-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="block border p-2 rounded w-full my-2"
        />

        <div className="mb-4">
          <label htmlFor="isRecurring" className="block text-sm font-medium">Recurring</label>
          <input
            type="checkbox"
            id="isRecurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="mr-2"
          />
          Recurring Event
        </div>

        {isRecurring && (
          <div className="mb-4">
            <label htmlFor="recurringDay" className="block text-sm font-medium">Recurring Day</label>
            <input
              type="text"
              id="recurringDay"
              placeholder="e.g., Tuesday"
              value={recurringDay}
              onChange={(e) => setRecurringDay(e.target.value)}
              className="block border p-2 rounded w-full my-2"
            />
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Event</button>
      </form>
    );
  }

  export default AddEvent;
