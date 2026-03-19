import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardNavbar() {

  const nav = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    nav("/");
  };

  return (

    <AppBar
      position="fixed"
      sx={{
        backdropFilter: "blur(10px)",
        background: "rgba(0,0,0,0.6)"
      }}
    >

      <Toolbar>

        {/* left */}

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            cursor: "pointer"
          }}
          onClick={() => nav("/dashboard")}
        >
          EventZen
        </Typography>

        {/* right */}

        <Box>

          <Button
            color="inherit"
            onClick={() => nav("/bookings")}
          >
            Upcoming
          </Button>

          <Button
            color="inherit"
            onClick={() => nav("/profile")}
          >
            {user?.name}
          </Button>

          <Button
            color="inherit"
            onClick={logout}
          >
            Logout
          </Button>

        </Box>

      </Toolbar>

    </AppBar>
  );
}