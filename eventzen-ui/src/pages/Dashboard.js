import { useEffect, useState } from "react";
import { node } from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";

import Stars from "../components/Stars";
import LandingNavbar from "../components/LandingNavbar";

export default function Dashboard() {

  const [events, setEvents] = useState([]);
  const nav = useNavigate();

  // protect dashboard
  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) {
      nav("/login");
    }

  }, [nav]);

  // load events
  useEffect(() => {

    node.get("/events")
      .then(res => setEvents(res.data));

  }, []);

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

      {/* content */}

      <Box
        sx={{
          pt: 10,
          px: 4,
          position: "relative",
          zIndex: 1
        }}
      >

        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 800,
            background:
              "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Events Dashboard
        </Typography>


        <Grid container spacing={3}>

          {events.map(e => (

            <Grid item xs={12} md={4} key={e.id}>

              <Card
                onClick={() => nav("/event/" + e.id)}
                sx={{
                  cursor: "pointer",
                  backdropFilter: "blur(10px)",
                  background:
                    "rgba(255,255,255,0.1)",
                  border:
                    "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 3,
                  color: "white"
                }}
              >

                <CardMedia
                  component="img"
                  height="160"
                  image={
                    e.image_url ||
                    "https://picsum.photos/300"
                  }
                />

                <CardContent>

                  <Typography variant="h6">
                    {e.name}
                  </Typography>

                  <Typography>
                    {e.city}
                  </Typography>

                  <Typography>
                    ₹ {e.price}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </Box>

  );
}