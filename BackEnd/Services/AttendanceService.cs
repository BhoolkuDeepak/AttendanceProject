using System;

namespace BackEnd.Services;
using System.Collections.Generic;
using System.Linq;

public class AttendanceService
{
    private readonly FileService _fileService;
    private readonly string _attendanceFile = "Data/attendance.json";

    public AttendanceService(FileService fileService)
    {
        _fileService = fileService;
    }

    public List<Attendance> GetAttendances() => _fileService.ReadFromFile<List<Attendance>>(_attendanceFile);

    public void AddAttendance(Attendance attendance)
    {
        var attendances = GetAttendances();
        attendance.AttendanceId = attendances.Count > 0 ? attendances.Max(a => a.AttendanceId) + 1 : 1;
        attendances.Add(attendance);
        _fileService.SaveToFile(_attendanceFile, attendances);
    }
}
