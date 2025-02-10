import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import EventsPage from "./pages/EventsPage";
import MembersPage from "./pages/MembersPage";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import UpdateMember from "./components/UpdateMember";
import EventAttendanceGraph from "./components/EventAttendanceGraph";
import ProtectedRoute from "./components/ProtectedRoute";
import MarkAttendance from "./components/MarkAttendance";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(60);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Router>
          <div className="relative min-h-screen flex overflow-hidden bg-[rgb(245,245,240)]">
            <Sidebar onLogout={handleLogout} setSidebarWidth={setSidebarWidth} />

            {/* Content Section */}
            <div
              className="flex-grow p-4 transition-all duration-300"
              style={{ marginLeft: `${sidebarWidth}px` }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events/*"
                  element={
                    <ProtectedRoute>
                      <EventsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/members/*"
                  element={
                    <ProtectedRoute>
                      <MembersPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance"
                  element={
                    <ProtectedRoute>
                      <MarkAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/members/update/:id"
                  element={
                    <ProtectedRoute>
                      <UpdateMember />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance-graph"
                  element={
                    <ProtectedRoute>
                      <EventAttendanceGraph />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </Router>
      )}
    </>
  );
};
 
export default App;