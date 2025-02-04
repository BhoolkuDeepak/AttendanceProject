using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

public class JsonService
{
    private readonly string _eventsFile = "Data/events.json";  
    private readonly string _attendanceFile = "Data/attendance.json";  
    private readonly string _membersFile = "Data/members.json"; 

    public List<Event> GetEvents()
    {
        return ReadFromFile<List<Event>>(_eventsFile);
    }
    public Event GetEventById(int eventId)
    {
        var events = GetEvents(); 
        return events.FirstOrDefault(e => e.EventId == eventId); 
    }

    public void AddEvent(Event newEvent)
    {
        var events = GetEvents();  
        newEvent.EventId = events.Count > 0 ? events.Max(e => e.EventId) + 1 : 1;  
        events.Add(newEvent);  
        SaveToFile(_eventsFile, events);  
    }



 
    public void DeleteEvent(int eventId)
    {
        var events = GetEvents();  
        var eventToDelete = GetEventById(eventId); 
        if (eventToDelete != null)
        {
            events.Remove(eventToDelete);  
            SaveToFile(_eventsFile, events);  
        }
        else
        {
            throw new Exception("Event not found.");
        }
    }



    public List<Attendance> GetAttendances()
    {
        
        return ReadFromFile<List<Attendance>>(_attendanceFile);
    }

    public void AddAttendance(Attendance attendance)
    {
        
        var attendances = GetAttendances();  
        attendance.AttendanceId = attendances.Count > 0 ? attendances.Max(a => a.AttendanceId) + 1 : 1; 
        attendances.Add(attendance);  
        SaveToFile(_attendanceFile, attendances);  
    }

    public List<Member> GetMembers()
    {
        return ReadFromFile<List<Member>>(_membersFile);
    }

    public void AddMember(Member member)
    {
        var members = GetMembers();  
        member.MemberId = members.Count > 0 ? members.Max(m => m.MemberId) + 1 : 1;  
        members.Add(member);  
        SaveToFile(_membersFile, members);  
    }

    public void DeleteMember(int memberId)
    {
        var members = GetMembers();
        var memberToDelete = members.FirstOrDefault(m => m.MemberId == memberId);
        if (memberToDelete != null)
        {
            members.Remove(memberToDelete);
            SaveToFile(_membersFile, members);  
        }
        else
        {
            throw new Exception("Member not found.");
        }
    }


    private T ReadFromFile<T>(string filePath)
    {
        if (!File.Exists(filePath))
        {
            return Activator.CreateInstance<T>();
        }
        var json = File.ReadAllText(filePath);  
        return JsonConvert.DeserializeObject<T>(json) ?? Activator.CreateInstance<T>(); 
    }

    private void SaveToFile<T>(string filePath, T data)
    {
        var json = JsonConvert.SerializeObject(data, Newtonsoft.Json.Formatting.Indented);
        File.WriteAllText(filePath, json); 
    }
}
