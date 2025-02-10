import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AddMember from "../components/AddMember";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();
  const [loadMembers, setLoadMembers] = useState(true);

  useEffect(() => {
    if (loadMembers) {
      fetch("http://localhost:5105/api/attendance/members")
        .then((response) => response.json())
        .then((data) => setMembers(data))
        .catch((error) => console.error("Error fetching members:", error));
      setLoadMembers(false);
    }
  }, [loadMembers]);
  const updateMember = (memberId) => {
    navigate(``);
  };
  const deleteMember = (memberId) => {
    console.log("Deleting member with ID:", memberId); 
    
    fetch(`http://localhost:5105/api/attendance/members/${memberId}`, {
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
    <div className="p-6 bg-white rounded-xl shadow-lg mt-8 w-full mx-auto border border-gray-200">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                Members
              </h2>
              {members.length === 0 ? (
                <p className="text-center text-gray-500">No members found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {members.map((member) => (
                    <div
                      key={member.memberId}
                      className="p-4 bg-blue-100 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <PersonIcon className="text-blue-600 text-4xl" />
                        <div>
                          <h3 className="text-xl font-semibold text-blue-800">
                            {member.name}
                          </h3>
                          <p className="text-sm text-blue-600">
                            {member.contact}
                          </p>
                        </div>
                      </div>


                      <IconButton
                        onClick={() => deleteMember(member.memberId)}
                        // className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform duration-200"
                        disableRipple
                      >
                        <DeleteIcon
                          sx={{ fontSize: "1.25rem" }}
                          className="hover:text-red-700"
                        />
                      </IconButton>
                      <Link
                        to={`/members/update/${member.memberId}`}
                        className="text-blue-500"
                      >
                        <ChangeCircleIcon
                          sx={{ fontSize: "1.25rem" }}
                          className="hover:text-blue-700"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    navigate("/members/add");
                  }}
                  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Add Member
                </button>
              </div>
            </>
          }
        />

        <Route
          path="/add"
          element={
            <>
              <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
                Add Member
              </h2>
              <AddMember />
              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    navigate("/members");
                    setLoadMembers(true); 
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition"
                >
                  Back to Members
                </button>
              </div>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MembersPage;
