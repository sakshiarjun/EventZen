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
            cursor: "pointer",
            fontWeight: 900, 
            background:
                "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
          }}
          onClick={() => nav("/admin")}
        >
          EventZen
        </Typography>

        {/* right */}

        <Box>

          <Button
            color="inherit"
            onClick={() => nav("/admin/events")}
          >
            Events
          </Button>

          <Button
            color="inherit"
            onClick={() => nav("/admin/venues")}
          >
            Venues
          </Button>

          <Button
            color="inherit"
            onClick={() => nav("/admin/vendors")}
          >
            Vendors
          </Button>

          <Button
            color="inherit"
            onClick={() => nav("/admin/bookings")}
          >
            Bookings
          </Button>

          <Button
            color="inherit"
            onClick={() => nav("/admin/budgets")}
          >
            Budgets
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