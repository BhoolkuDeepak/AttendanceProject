public class Attendance
{
    public int AttendanceId { get; set; }
    public int EventId { get; set; }
    // public DateTime EventDate { get; set; }
    public List<int> AttendedMembers { get; set; } = new List<int>();
}
