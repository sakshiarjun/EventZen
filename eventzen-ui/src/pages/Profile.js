import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import DashboardNavbar from "../components/DashboardNavbar";
import Stars from "../components/Stars";

export default function Profile() {

  const navigate = useNavigate();

  // get user from storage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const name = user.name || localStorage.getItem("name");
  const role = user.role || localStorage.getItem("role");
  const email = user.email || localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        position: "relative"
      }}
    >
      <DashboardNavbar />

      <Box sx={{ p: 4, display: "flex", justifyContent: "flex-start", flexDirection: "column", alignItems: "flex-start" }}>
    
         <Typography
            variant="h2"
            sx={{
              mt: 5,
              fontWeight: 900,
              background:
                "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
          Hello, {user?.name}
        </Typography>

          <Typography mb={2} align="left">
            <b>Name:</b> {name || "N/A"}
          </Typography>

          <Typography mb={2} align="left">
            <b>Email:</b> {email || "N/A"}
          </Typography>

          <Typography mb={2} align="left">
            <b>Role:</b> {role || "N/A"}
          </Typography>

          <Box mt={4} sx={{ width: "100%" }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ background: "#ff6a00", fontWeight: "bold", mb: 2 }}
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>

            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ fontWeight: "bold" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        
      </Box>

      <Stars />      <Stars />

    </Box>
  );
}