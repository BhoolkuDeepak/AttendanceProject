using BackEnd.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class AttendanceController : ControllerBase
{
    // private readonly JsonService _jsonService;
    private readonly MemberService _memberService;
    private readonly EventService _eventService;

    private readonly AttendanceService _attendanceService;

    public AttendanceController(MemberService memberService,EventService eventService, AttendanceService attendanceService)
    {   
        _memberService=memberService;
        _eventService=eventService;
        _attendanceService=attendanceService;
        // _jsonService = jsonService;
    }

    [HttpPost("events")]
    public ActionResult CreateEvent([FromBody] Event newEvent)
    {
        _eventService.AddEvent(newEvent);
        return CreatedAtAction(nameof(GetEvents), new { id = newEvent.EventId }, newEvent);
    }

    [HttpGet("events")]
    public ActionResult<IEnumerable<Event>> GetEvents()
    {
        return Ok(_eventService.GetEvents());
    }





    [HttpDelete("events/{eventId}")]
    public ActionResult DeleteEvent(int eventId)
    {
        var eventToDelete = _eventService.GetEventById(eventId);
        if (eventToDelete == null)
        {
            return NotFound();
        }

        _eventService.DeleteEvent(eventId);
        return NoContent();
    }

    [HttpPost("members")]
    public ActionResult CreateMember([FromBody] Member member)
    {
        _memberService.AddMember(member);
        return CreatedAtAction(nameof(GetMembers), new { id = member.MemberId }, member);
    }

    [HttpGet("members")]
    public ActionResult<IEnumerable<Member>> GetMembers()
    {
        return Ok(_memberService.GetMembers());
    }

    [HttpDelete("members/{memberId}")]
    public ActionResult DeleteMember(int memberId)
    {
        var memberToDelete = _memberService.GetMembers().FirstOrDefault(m => m.MemberId == memberId);
        if (memberToDelete == null)
        {
            return NotFound();
        }

        _memberService.DeleteMember(memberId);
        return NoContent();
    }


    [HttpPost("attendance")]
    public ActionResult CreateAttendance([FromBody] Attendance attendance)
    {
        _attendanceService.AddAttendance(attendance);
        return CreatedAtAction(nameof(GetAttendances), new { id = attendance.AttendanceId }, attendance);
    }

    [HttpGet("attendance")]
    public ActionResult<IEnumerable<Attendance>> GetAttendances()
    {
        return Ok(_attendanceService.GetAttendances());
    }
}