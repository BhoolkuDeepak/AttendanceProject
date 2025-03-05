import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import { useFetchTrigger } from "./FetchContext"; // Import the context

const Sidebar = ({ onLogout, setSidebarWidth }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const { setFetchTrigger } = useFetchTrigger(); // Get trigger function from context

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
        <NavItem
          to="/"
          icon={<HomeIcon />}
          text="Home"
          isHovered={isHovered}
          isActive={location.pathname === "/"}
        />
        <NavItem
          to="/attendance"
          icon={<DataUsageIcon />}
          text="Attendance"
          isHovered={isHovered}
          isActive={location.pathname === "/attendance"}
          onHover={() => setFetchTrigger("attendance")} // Trigger fetch
        />
        <NavItem
          to="/events"
          icon={<EventIcon />}
          text="Events"
          isHovered={isHovered}
          isActive={location.pathname === "/events"}
          onHover={() => setFetchTrigger("events")} // Trigger fetch
        />
        <NavItem
          to="/members"
          icon={<GroupsIcon />}
          text="Members"
          isHovered={isHovered}
          isActive={location.pathname === "/members"}
          onHover={() => setFetchTrigger("members")} // Trigger fetch
        />
        <NavItemLogout onLogout={onLogout} isHovered={isHovered} />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, text, isHovered, isActive, onHover }) => (
  <Link
    to={to}
    className={`flex items-center p-2 rounded-md transition-all ${
      isActive
        ? "text-green-700"
        : "text-[rgb(69,75,27)] hover:text-green-700"
    }`}
    onMouseEnter={onHover} // Fetch on hover
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
