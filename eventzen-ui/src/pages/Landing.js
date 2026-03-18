import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Stars from "../components/Stars";
import LandingNavbar from "../components/LandingNavbar";
import FeaturedSlider from "../components/FeaturedSlider";

export default function Landing() {

  const nav = useNavigate();

  return (

    <Box
      sx={{
        background: "black",
        color: "white",
        minHeight: "200vh",
        position: "relative",
        overflow: "hidden"
      }}
    >

      <Stars />

      <LandingNavbar />

      {/* HERO */}

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: 1
        }}
      >
        <Stars />
        <Stars />

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >

          <Typography variant="h4">
            Welcome to
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              background:
                "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            EventZen
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Discover • Plan • Book Events
          </Typography>

          <Button
            onClick={() => nav("/events")}
            sx={{
              mt: 4,
              backdropFilter: "blur(10px)",
              background:
                "rgba(255,255,255,0.2)",
              borderRadius: 10,
              px: 5,
              color: "white"
            }}
          >
            See Events →
          </Button>

        </Box>

      </Box>


      {/* FEATURED */}

      <Box
        sx={{
          p: 6,
          textAlign: "center",
          position: "relative",
          zIndex: 1
        }}
      >

        <Typography variant="h4">
          Featured Events
        </Typography>

        <Box sx={{ mt: 4 }}>
          <FeaturedSlider />
        </Box>

      </Box>

    </Box>

  );
}