import { useEffect, useState } from "react";

function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/attendance/members")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }, []);

  const deleteMember = (memberId) => {
    fetch(`http://localhost:5000/api/attendance/members/${memberId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setMembers((prevMembers) =>
            prevMembers.filter((member) => member.memberId !== memberId)
          );
        } else {
          console.error("Error deleting member");
        }
      })
      .catch((error) => {
        console.error("Error deleting member:", error);
      });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold">Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.memberId} className="flex justify-between items-center">
            <span>{member.name} - {member.contact}</span>
            <button
              onClick={() => deleteMember(member.memberId)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemberList;
