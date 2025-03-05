import SlidingMotion from "../components/SlidingMotion";

// eslint-disable-next-line react/prop-types
function EventList({ events = [] }) {
  return (
    <div className="w-full flex flex-col items-center justify-center relative">
      {/* <h2 className="text-3xl font-bold text-[rgb(69,75,27)] mb-6">
        Upcoming Events
      </h2> */}

      <SlidingMotion
        items={events} 
        renderItem={(event) =>
          event ? (
            <div className="p-5 bg-white border-l-4 border-[rgb(69,75,27)] shadow-lg transition-all duration-300 hover:shadow-xl w-80">
              <div className="border-b pb-3">
                <h3 className="text-lg font-semibold text-[rgb(69,75,27)] tracking-wide">
                  {event.eventName}
                </h3>
                <p className="text-sm text-gray-600">{event.timings}</p>
              </div>

              <div className="pt-3">
                <p className="text-gray-700 text-sm">{event.eventDetails}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">No event data available.</p>
          )
        }
      />
    </div>
  );
}

export default EventList;
