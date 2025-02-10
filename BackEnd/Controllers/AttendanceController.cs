using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class AttendanceController : ControllerBase
{
    private readonly JsonService _jsonService;

    public AttendanceController(JsonService jsonService)
    {
        _jsonService = jsonService;
    }

    [HttpPost("events")]
    public ActionResult CreateEvent([FromBody] Event newEvent)
    {
        _jsonService.AddEvent(newEvent);
        return CreatedAtAction(nameof(GetEvents), new { id = newEvent.EventId }, newEvent);
    }

    [HttpGet("events")]
    public ActionResult<IEnumerable<Event>> GetEvents()
    {
        return Ok(_jsonService.GetEvents());
    }





    [HttpDelete("events/{eventId}")]
    public ActionResult DeleteEvent(int eventId)
    {
        var eventToDelete = _jsonService.GetEventById(eventId);
        if (eventToDelete == null)
        {
            return NotFound(); 
        }

        _jsonService.DeleteEvent(eventId); 
        return NoContent(); 
    }

    [HttpPost("members")]
    public ActionResult CreateMember([FromBody] Member member)
    {
        _jsonService.AddMember(member);
        return CreatedAtAction(nameof(GetMembers), new { id = member.MemberId }, member);
    }

    [HttpGet("members")]
    public ActionResult<IEnumerable<Member>> GetMembers()
    {
        return Ok(_jsonService.GetMembers());
    } 

    [HttpDelete("members/{memberId}")]
    public ActionResult DeleteMember(int memberId)
    {
        var memberToDelete = _jsonService.GetMembers().FirstOrDefault(m => m.MemberId == memberId);
        if (memberToDelete == null)
        {
            return NotFound();  
        }

        _jsonService.DeleteMember(memberId);  
        return NoContent();  
    }


    [HttpPost("attendance")]
    public ActionResult CreateAttendance([FromBody] Attendance attendance)
    {
        _jsonService.AddAttendance(attendance);
        return CreatedAtAction(nameof(GetAttendances), new { id = attendance.AttendanceId }, attendance);
    }

    [HttpGet("attendance")]
    public ActionResult<IEnumerable<Attendance>> GetAttendances()
    {
        return Ok(_jsonService.GetAttendances());
    }
}