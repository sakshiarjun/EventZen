import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function AdminDashboard() {

  const nav = useNavigate();

  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        position: "relative"
      }}
    >

      <Stars />
      <Stars />

      <DashboardNavbar />

      {/* MAIN LAYOUT */}

      <Box
        sx={{
          pt: 12,
          px: 3,
          display: "flex",
          gap: 3
        }}
      >

        {/* SIDE PANEL */}

        <Paper
          sx={{
            width: 250,
            background: "#232427",
            color: "white",
            p: 2,
            height: "80vh"
          }}
        >

          <Typography
            variant="h6"
            mb={2}
          >
            Admin Panel
          </Typography>


          <Button
            fullWidth
            sx={{ mb: 1 }}
            variant="contained"
            onClick={() => nav("/admin/events")}
          >
            Manage Events
          </Button>


          <Button
            fullWidth
            sx={{ mb: 1 }}
            variant="contained"
            onClick={() => nav("/admin/venues")}
          >
            Manage Venues
          </Button>


          <Button
            fullWidth
            sx={{ mb: 1 }}
            variant="contained"
            onClick={() => nav("/admin/vendors")}
          >
            Manage Vendors
          </Button>


          <Button
            fullWidth
            sx={{ mb: 1 }}
            variant="contained"
            onClick={() => nav("/admin/bookings")}
          >
            Manage Bookings
          </Button>

        </Paper>


        {/* RIGHT CONTENT */}

        <Box
          sx={{
            flex: 1,
            background: "#232427",
            p: 3,
            borderRadius: 2
          }}
        >

          <Typography variant="h4">
            Welcome Admin
          </Typography>

          <Typography>
            Select an option from the panel
          </Typography>

        </Box>

      </Box>

    </Box>

  );

}