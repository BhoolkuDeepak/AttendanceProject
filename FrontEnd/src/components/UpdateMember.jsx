import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UpdateMember() {
  const { id } = useParams(); 
  console.log(id+"Hi");
  const [memberData, setMemberData] = useState({
    name: "",
    contact: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5105/api/attendance/members/${id}`)
      .then((response) => response.json())
      .then((data) => setMemberData(data))
      .catch((error) => console.error("Error fetching member data:", error));
  }, [id]); 

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...memberData };

    fetch(`http://localhost:5105/api/attendance/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Member updated successfully!");
        } else {
          throw new Error("Error updating member");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow mt-6">
      <h2 className="text-xl font-bold">Update Member</h2>
      <input
        type="text"
        placeholder="Name"
        value={memberData.name}
        onChange={(e) => setMemberData({ ...memberData, name: e.target.value })}
        className="block border p-2 rounded w-full my-2"
      />
      <input
        type="text"
        placeholder="Contact"
        value={memberData.contact}
        onChange={(e) => setMemberData({ ...memberData, contact: e.target.value })}
        className="block border p-2 rounded w-full my-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Update Member
      </button>
    </form>
  );
}

export default UpdateMember;
