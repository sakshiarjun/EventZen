import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function MuiNavbar() {

  const nav = useNavigate();

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (

    <AppBar position="static">

      <Toolbar>

        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => nav("/dashboard")}
        >
          EventZen
        </Typography>

        <Button
          color="inherit"
          onClick={() => nav("/bookings")}
        >
          Bookings
        </Button>

        <Button
          color="inherit"
          onClick={logout}
        >
          Logout
        </Button>

      </Toolbar>

    </AppBar>

  );
}