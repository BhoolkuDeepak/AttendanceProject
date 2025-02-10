import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = ({ onLogout, setSidebarWidth }) => {
  const [isHovered, setIsHovered] = useState(false);

  const updateSidebarWidth = useCallback(() => {
    setSidebarWidth(isHovered ? 200 : 60);
  }, [isHovered, setSidebarWidth]);

  useEffect(() => {
    updateSidebarWidth();
  }, [updateSidebarWidth]);

  return (
    <div
      className={`h-screen bg-white p-3 shadow-md fixed transition-all duration-300 ${
        isHovered ? "w-48" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-col gap-5">
        <NavItem to="/" icon={<HomeIcon />} text="Home" isHovered={isHovered} />
        <NavItem
          to="/attendance"
          icon={<DataUsageIcon />}
          text="Attendance"
          isHovered={isHovered}
        />
        <NavItem
          to="/events"
          icon={<EventIcon />}
          text="Events"
          isHovered={isHovered}
        />
        <NavItem
          to="/members"
          icon={<GroupsIcon />}
          text="Members"
          isHovered={isHovered}
        />
        <NavItemLogout onLogout={onLogout} isHovered={isHovered} />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, text, isHovered }) => (
  <Link
    to={to}
    className="flex items-center p-2 rounded-md text-[rgb(69,75,27)] hover:text-green-700 transition-all"
  >
    <span className="w-6 h-6 flex-shrink-0">{icon}</span>
    <span className={`ml-3 transition-opacity ${isHovered ? "opacity-100" : "hidden"}`}>
      {text}
    </span>
  </Link>
);

const NavItemLogout = ({ onLogout, isHovered }) => (
  <button
    onClick={onLogout}
    className="flex items-center p-2 rounded-md text-[rgb(69,75,27)] hover:text-green-700 transition-all"
  >
    <span className="w-6 h-6 flex-shrink-0">
      <LogoutIcon />
    </span>
    <span className={`ml-3 transition-opacity ${isHovered ? "opacity-100" : "hidden"}`}>
      Logout
    </span>
  </button>
);

export default Sidebar;
 