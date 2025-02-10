import { motion, AnimatePresence } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function MemberList({ members, onDelete }) {
  return (
    <div className="w-full max-w-md mx-auto">
      {members.length === 0 ? (
        <p className="text-center text-gray-500">No members found.</p>
      ) : (
        <AnimatePresence>
          {members.map((member) => (
            <motion.div
              key={member.memberId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              className="p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-md flex items-center justify-between mb-4"
            >
              <div className="flex items-center gap-4">
                <PersonIcon className="text-gray-700 text-3xl" />
                <div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.contact}</p>
                </div>
              </div>

              <IconButton onClick={() => onDelete(member.memberId)}>
                <DeleteIcon className="text-red-600 hover:text-red-800" />
              </IconButton>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

export default MemberList; 