import { useEffect, useState } from "react";
import { node } from "../services/api";
import { useNavigate } from "react-router-dom";
import Stars from "../components/Stars";
import LandingNavbar from "../components/LandingNavbar";


import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  Alert,
  Button
} from "@mui/material";

export default function PublicEvents() {

  const [events, setEvents] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);

  const nav = useNavigate();

  useEffect(() => {

    node.get("/events")
      .then(res => setEvents(res.data));

  }, []);


const openEvent = (id) => {
  const user = localStorage.getItem("user");

  if (!user) {
    setOpenSnack(true);

    setTimeout(() => {
      nav("/login");
    }, 3000); // give 3 seconds to read

    return;
  }

  nav("/event/" + id);
};

  return (
  <Box
    sx={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Stars />

    <LandingNavbar />

    {/* Snackbar moved here — higher in the tree, still inside Box */}
    <Snackbar
      open={openSnack}
      autoHideDuration={null}           // we control hide via timeout
      onClose={() => setOpenSnack(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ 
        mt: 8,                           // push it down a bit below navbar if needed
        zIndex: 2000,                    // make sure it's above everything
      }}
    >
      <Alert
        severity="warning"
        variant="filled"
        sx={{
          width: '100%',
          maxWidth: 450,
          backgroundColor: '#ef4444',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 4px 20px rgba(239,68,68,0.5)',
          borderRadius: 2,
        }}
        action={
          <Button 
            color="inherit" 
            size="small" 
            onClick={() => {
              setOpenSnack(false);
              nav("/login");
            }}
          >
            Login
          </Button>
        }
      >
        Please login to view more details
      </Alert>
    </Snackbar>

    <Container sx={{ mt: 10 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 800,
          background: "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
        }}
      >
        Events Near You
      </Typography>

      <Grid container spacing={4}>
        {events.map((e) => (
          <Grid item xs={12} sm={6} md={4} key={e.id}>
            <Card
              sx={{
                marginTop: 3,
                cursor: "pointer",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 2,
                height: 300,
                width: 200,           // consider making this more responsive (e.g. 100%)
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.2s",
                '&:hover': { transform: 'scale(1.04)' }, // nice hover effect
              }}
              onClick={() => openEvent(e.id)}
            >
              <CardMedia
                component="img"
                height="160"
                image={e.image_url || "https://picsum.photos/300"}
                alt={e.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "white" }}>
                  {e.name}
                </Typography>
                <Typography sx={{ color: "white" }}>
                  {e.city}
                </Typography>
                <Typography sx={{ color: "white", fontWeight: 'bold' }}>
                  ₹ {e.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        onClick={() => nav("/login")}
        sx={{
          marginTop: 10 , // Further increase margin to push it lower
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.2)",
          borderRadius: 10,
          px: 5,
          py: 2, // Add padding for better appearance
          color: "white",
          display: "flex",
          justifyContent: "center", // Ensure proper alignment
          margin: "0 auto", // Center horizontally
        }}
      >
        Discover More →
      </Button>
    </Container>
  </Box>
);
}