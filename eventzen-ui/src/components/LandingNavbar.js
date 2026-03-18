import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LandingNavbar() {

  const nav = useNavigate();

  return (

    <AppBar
      position="fixed"
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(0,0,0,0.4)",
        boxShadow: "none"
      }}
    >

      <Toolbar>

        <Typography
          sx={{ flexGrow: 1 }}
        >
          EventZen
        </Typography>

        <Button
          color="inherit"
          onClick={() => nav("/register")}
        >
          Register
        </Button>

        <Button
          color="inherit"
          onClick={() => nav("/login")}
        >
          Login
        </Button>

      </Toolbar>

    </AppBar>

  );
}