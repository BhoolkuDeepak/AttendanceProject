import { useState, useEffect } from "react";
import AddMember from "../components/AddMember";
import MemberList from "../components/MemberList";

function MembersPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5105/api/attendance/members")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  const deleteMember = (memberId) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.memberId !== memberId)
    );
    fetch(`http://localhost:5105/api/attendance/members/${memberId}`, {
      method: "DELETE",
    }).catch((error) => console.error("Error deleting member:", error));
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[rgb(245,245,240)] space-y-10">
      <div className="w-full max-w-3xl flex flex-col items-center">
        <AddMember />
      </div>
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* <h2 className="text-2xl font-bold text-[rgb(69,75,27)] mb-6">
          Members
        </h2> */}
        <MemberList members={members} onDelete={deleteMember} />
      </div>
    </div>
  );
}

export default MembersPage;
