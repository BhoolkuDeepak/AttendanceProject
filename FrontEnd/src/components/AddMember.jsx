import { useState } from "react";

function AddMember() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const memberData = { name, contact };

    fetch("http://localhost:5105/api/attendance/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    })
      .then((response) => {
        if (response.ok) {
          setName("");
          setContact("");
          alert("Member added successfully!");
        } else {
          throw new Error("Error adding member");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Add Member</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="block border p-2 rounded w-full my-2"
      />
      <input 
        type="text" 
        placeholder="Contact" 
        value={contact} 
        onChange={(e) => setContact(e.target.value)} 
        className="block border p-2 rounded w-full my-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Member</button>
    </form>
  );
}

export default AddMember;
