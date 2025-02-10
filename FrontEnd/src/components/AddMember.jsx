import React, { useState } from "react";

const AddMember = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!name.trim()) {
      tempErrors.name = "Name is required.";
    } else if (name.length < 3) {
      tempErrors.name = "Name must be at least 3 characters.";
    }

    if (!contact.trim()) {
      tempErrors.contact = "Contact is required.";
    } else if (!/^\d{10}$/.test(contact)) {
      tempErrors.contact = "Enter a valid 10-digit phone number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const memberData = { name, contact };

    fetch("http://localhost:5105/api/attendance/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    })
      .then((response) => {
        if (response.ok) {
          setName("");
          setContact("");
          setErrors({});
          alert("Member added successfully!");
        } else {
          throw new Error("Error adding member");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full max-w-lg p-6 text-[rgb(69,75,27)]">
      <h2 className="text-2xl font-semibold mb-4">Add Member</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-lg font-medium opacity-80">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-transparent border-b-2 border-[rgb(69,75,27)] focus:outline-none focus:border-green-700 transition-all duration-200"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-lg font-medium opacity-80">Contact</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 bg-transparent border-b-2 border-[rgb(69,75,27)] focus:outline-none focus:border-green-700 transition-all duration-200"
          />
          {errors.contact && <p className="text-red-600 text-sm">{errors.contact}</p>}
        </div>

        <button
          type="submit"
          className="bg-[rgb(69,75,27)] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-200"
        >
          Add Member
        </button>
      </form>
    </div>
  );
};

export default AddMember;
 