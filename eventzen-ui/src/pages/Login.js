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

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();

  const login = async () => {

    try {

      const res = await spring.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      if (res.data.role === "ADMIN")
        nav("/admin");
      else
        nav("/dashboard");

    } catch {

      alert("Invalid login");

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
            Login to your account
          </Typography>


          <TextField
            label={<span style={{ color: "white" }}>Email</span>}
            fullWidth
            sx={{ mb: 2, input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
            onChange={e =>
              setEmail(e.target.value)
            }
          />

          <TextField
            label={<span style={{ color: "white" }}>Password</span>}
            type="password"
            fullWidth
            sx={{ mb: 2, input: { color: "white" }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, '&:hover fieldset': { borderColor: 'white' }, '&.Mui-focused fieldset': { borderColor: 'white' } } }}
            onChange={e =>
              setPassword(e.target.value)
            }
          />

          <Button
            fullWidth
            variant="contained"
            onClick={login}
            sx={{
              mt: 1,
              background:
                "linear-gradient(90deg,#ff3d00,#ff9100)"
            }}
          >
            Login
          </Button>


          <Button
            fullWidth
            sx={{ mt: 2, color: "white" }}
            onClick={() =>
              nav("/register")
            }
          >
            Don't have an account? Register
          </Button>

        </Paper>

      </Box>

    </Box>

  );
}