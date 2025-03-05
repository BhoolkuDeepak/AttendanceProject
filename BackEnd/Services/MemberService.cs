
namespace BackEnd.Services;
using System.Collections.Generic;
using System.Linq;

public class MemberService
{
    private readonly FileService _fileService;
    private readonly string _membersFile = "Data/members.json";

    public MemberService(FileService fileService)
    {
        _fileService = fileService;
    }

    public List<Member> GetMembers() => _fileService.ReadFromFile<List<Member>>(_membersFile);

    public void AddMember(Member member)
    {
        var members = GetMembers();
        member.MemberId = members.Count > 0 ? members.Max(m => m.MemberId) + 1 : 1;
        members.Add(member);
        _fileService.SaveToFile(_membersFile, members);
    }

    public void DeleteMember(int memberId)
    {
        var members = GetMembers();
        var memberToDelete = members.FirstOrDefault(m => m.MemberId == memberId);
        if (memberToDelete != null)
        {
            members.Remove(memberToDelete);
            _fileService.SaveToFile(_membersFile, members);
        }
        else
        {
            throw new Exception("Member not found.");
        }
    }
}
