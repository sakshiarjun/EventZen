import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { spring } from "../services/api";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";

import Stars from "../components/Stars";
import LandingNavbar from "../components/LandingNavbar";

export default function Register() {

  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const change = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const register = async () => {

    try {

      await spring.post(
        "/auth/register",
        form
      );

      alert("Registered");

      nav("/login");

    } catch {

      alert("Error");

    }

  };

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >

      {/* stars */}

      <Stars />

      {/* navbar */}

      <LandingNavbar />

      {/* center */}

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1
        }}
      >

        {/* glass card */}

        <Paper
          sx={{
            p: 4,
            width: 350,
            backdropFilter: "blur(10px)",
            background:
              "rgba(255,255,255,0.1)",
            borderRadius: 4,
            border:
              "1px solid rgba(255,255,255,0.3)"
          }}
        >

          {/* title */}

          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 800,
              background:
                "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2
            }}
          >
            EventZen
          </Typography>

          <Typography
            align="center"
            sx={{ mb: 2, color: "white" }}
          >
            Create a new account
          </Typography>


          <TextField
            label={<span style={{ color: "white" }}>Name</span>}
            name="name"
            fullWidth
            sx={{ mb: 2, input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
            onChange={change}
          />

          <TextField
            label={<span style={{ color: "white" }}>Email</span>}
            name="email"
            fullWidth
            sx={{ mb: 2, input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
            onChange={change}
          />

          <TextField
            label={<span style={{ color: "white" }}>Password</span>}
            name="password"
            type="password"
            fullWidth
            sx={{ mb: 2, input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
            onChange={change}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={register}
            sx={{
              mt: 1,
              background:
                "linear-gradient(90deg,#ff3d00,#ff9100)"
            }}
          >
            Register
          </Button>


          <Button
            fullWidth
            sx={{ mt: 2, color: "white" }}
            onClick={() =>
              nav("/login")
            }
          >
            Already have an account? Login
          </Button>

        </Paper>

      </Box>

    </Box>

  );
}