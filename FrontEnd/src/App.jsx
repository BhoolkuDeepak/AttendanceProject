import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState, useEffect } from "react";
import EventsPage from "./pages/EventsPage";
import MembersPage from "./pages/MembersPage";
import AttendancePage from "./pages/AttendancePage";
import HomePage from "./pages/HomePage";
import "./index.css";
import UpdateMember from "./components/UpdateMember";
import { motion } from "framer-motion";

import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const text = "Login";
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); // Delay for smooth entry
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:5105/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: name, Password: password }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
      onLogin();
    } else {
      setError("Invalid credentials!");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)", 
          padding: 3,
          width: "75%",
          textAlign: "center",
          borderRadius: "12px", 
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex", 
            justifyContent: "center",
            fontWeight: "bold",
            color: "#1976d2",
            fontFamily: "'Bubblegum Sans', cursive", 
            letterSpacing: "2px",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)", 
          }}
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1, 
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          ))}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Username"
            sx={{
              m: 2,
              "& .MuiInputLabel-root": {
                fontFamily: "'Bubblegum Sans', cursive", 
                letterSpacing: "1px",
                fontSize: "1.1rem", 
              },
            }}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            sx={{
              m: 2,
              "& .MuiInputLabel-root": {
                fontFamily: "'Bubblegum Sans', cursive", 
                letterSpacing: "1px",
                fontSize: "1.1rem",
              },
            }}
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          {/* <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>Login</Button> */}
          <IconButton
            type="submit"
            aria-label="fingerprint"
            color="primary"
            sx={{
              m: 2,
              transition: "transform 0.2s ease-in-out", 
              "&:hover": {
                transform: "scale(1.3)", 
              },
            }}
          >
            <Fingerprint />
          </IconButton>
        </form>
      </Paper>
    </Container>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/" />; 
  }

  return children; 
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    navigate("/");
  };

  return (
    <>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Router>
          <div className="min-h-screen bg-gray-100 p-4">
            <nav className="flex justify-between p-4 bg-white shadow rounded-lg">
              <div className="flex gap-4">
                <Link to="/" className="text-blue-500">
                  Home
                </Link>
                <Link to="/events" className="text-blue-500">
                  Events
                </Link>
                <Link to="/members" className="text-blue-500">
                  Members
                </Link>
                <Link to="/attendance" className="text-blue-500">
                  Attendance
                </Link>
              </div>
              <IconButton
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform duration-200"
                disableRipple
              >
                <LogoutIcon
                  sx={{ fontSize: "1.25rem" }}
                  className="hover:text-red-700"
                />
              </IconButton>
            </nav>

            <Routes>
              <Route
                path="/*"
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
                    <AttendancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/members/update/:id"
                element={
                  <ProtectedRoute>
                    <UpdateMember />{" "}
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
