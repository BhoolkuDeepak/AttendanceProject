import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

  import IconButton from "@mui/material/IconButton";
  import Fingerprint from "@mui/icons-material/Fingerprint";
  import { useState, useEffect } from "react";
  import "./index.css";
  import { motion } from "framer-motion";
  import Login from "./components/Login";

  
function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const text = "Login";
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100); 
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

export default Login;
