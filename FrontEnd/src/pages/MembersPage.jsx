import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddMember from "../components/AddMember";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [deletedMember, setDeletedMember] = useState(null);
  const [loadMembers, setLoadMembers] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
 
  useEffect(() => {
    if (loadMembers) {
      fetch("http://localhost:5105/api/attendance/members")
        .then((response) => response.json())
        .then((data) => setMembers(data))
        .catch((error) => console.error("Error fetching members:", error));
      setLoadMembers(false);
    }
  }, [loadMembers]);

  useEffect(() => {
    if (members.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [members, isHovered]);

  const deleteMember = (memberId) => {
    setDeletedMember(memberId);
    setTimeout(() => {
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.memberId !== memberId)
      );
      fetch(`http://localhost:5105/api/attendance/members/${memberId}`, {
        method: "DELETE",
      }).catch((error) => console.error("Error deleting member:", error));
    }, 1000);
  };

  const nextMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % members.length);
  };

  const prevMember = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + members.length) % members.length);
  };

  return (
    <div className="flex h-screen bg-[rgb(245,245,240)]">
      <div className="w-1/2 p-6 flex flex-col justify-center items-center ">
        <AddMember />
      </div>

      <div className="w-1/2 p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <h2 className="text-3xl font-bold text-[rgb(69,75,27)] mb-6">Members</h2>
        <div 
          className="relative w-full max-w-lg h-96 flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {members.length === 0 ? (
            <p className="text-center text-gray-500">No members found.</p>
          ) : (
            <>
              <IconButton
                onClick={prevMember}
                className="absolute left-4 top-1/2 transform -translate-y-1/2  hover:text-green-700"
              >
                <ArrowBackIosIcon />
              </IconButton>
              <AnimatePresence mode="wait">
                <motion.div
                  key={members[currentIndex]?.memberId}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
                  exit={{ opacity: 0, x: -100, transition: { duration: 0.8 } }}
                  className="w-full flex flex-col items-center text-center"
                >
                  <PersonIcon className="text-[rgb(69,75,27)] text-6xl mb-4" />
                  <h3 className="text-2xl font-semibold text-[rgb(69,75,27)]">{members[currentIndex]?.name}</h3>
                  {/* <p className="text-gray-600 text-lg">{members[currentIndex]?.contact}</p> */}
                  <IconButton
                    onClick={() => deleteMember(members[currentIndex]?.memberId)}
                    disableRipple
                    className="mt-4"
                  >
                    <DeleteIcon
                      sx={{ fontSize: "1.75rem" }}
                      className="text-[rgb(69,75,27)] hover:text-green-700"
                    />
                  </IconButton>
                </motion.div>
              </AnimatePresence>
              <IconButton
                onClick={nextMember}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2   hover:bg-gray-200"
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembersPage;
