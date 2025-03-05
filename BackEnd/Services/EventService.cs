
namespace BackEnd.Services;
using System.Collections.Generic;
using System.Linq;

public class EventService
{
    private readonly FileService _fileService;
    private readonly string _eventsFile = "Data/events.json";

    public EventService(FileService fileService)
    {
        _fileService = fileService;
    }

    public List<Event> GetEvents() => _fileService.ReadFromFile<List<Event>>(_eventsFile);

    public Event GetEventById(int eventId) => GetEvents().FirstOrDefault(e => e.EventId == eventId);

    public void AddEvent(Event newEvent)
    {
        var events = GetEvents();
        newEvent.EventId = events.Count > 0 ? events.Max(e => e.EventId) + 1 : 1;
        events.Add(newEvent);
        _fileService.SaveToFile(_eventsFile, events);
    }

    public void DeleteEvent(int eventId)
    {
        var events = GetEvents();
        var eventToDelete = GetEventById(eventId);
        if (eventToDelete != null)
        {
            events.Remove(eventToDelete);
            _fileService.SaveToFile(_eventsFile, events);
        }
        else
        {
            throw new Exception("Event not found.");
        }
    }
}
