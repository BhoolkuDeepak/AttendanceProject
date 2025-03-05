import SlidingMotion from "../components/SlidingMotion";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function MemberList({ members = [], onDelete }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <SlidingMotion
        items={members}
        renderItem={(member) =>
          member ? (
            <div className="p-5 bg-white border-l-4 border-[rgb(69,75,27)] shadow-lg flex items-center justify-between transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[rgb(69,75,27)] rounded-full">
                  <PersonIcon className="text-white text-3xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[rgb(69,75,27)] tracking-wide">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">{member.contact}</p>
                </div>
              </div>
              <button
                onClick={() => onDelete(member.memberId)}
                className="p-2  hover:text-gray-200 transition-all duration-300"
              >
                <DeleteIcon className="text-[rgb(69,75,27)] hover:text-green-700" />
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No member data available.
            </p>
          )
        }
      />
    </div>
  );
}

export default MemberList;
