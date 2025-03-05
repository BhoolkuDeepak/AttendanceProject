import MemberList from "./MemberList";

function MemberContainer({ members, onDelete }) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-[rgb(69,75,27)] mb-6">Members</h2>
      <MemberList members={members} onDelete={onDelete} />
    </div>
  );
}

export default MemberContainer;
