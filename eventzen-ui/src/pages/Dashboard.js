import { useEffect, useState } from "react";
import { node } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { motion } from "framer-motion";

import { Box, Typography, Button, CardContent, Grid,Card, TextField} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";
import EventRow from "../components/EventRow";
import EventCard from "../components/EventCard";
import CreateEventForm from "../components/CreateEventForm";

export default function Dashboard() {

  const [events, setEvents] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const nav = useNavigate();
  const eventsRef = useRef(null);
  const createRef = useRef(null);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) nav("/login");

  }, [nav]);

  useEffect(() => {

    node.get("/events")
      .then(res => setEvents(res.data));

  }, []);

  const user =
    JSON.parse(localStorage.getItem("user"));

  const filteredEvents = events.filter((e) => {

  const cityMatch =
    cityFilter.length === 0 ||
    cityFilter.includes(e.city);

  const categoryMatch =
    categoryFilter.length === 0 ||
    categoryFilter.includes(e.category);

  const searchMatch =
    !search ||
    e.name?.toLowerCase().includes(search) ||
    e.city?.toLowerCase().includes(search) ||
    e.category?.toLowerCase().includes(search);

  return cityMatch && categoryMatch && searchMatch;

});

  
const handleSearch = (e) => {
  setSearch(e.target.value.toLowerCase());
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

      <Stars />
      <Stars />
      <Stars />
      <DashboardNavbar />

      <Box
  sx={{
    pt: 12,
    px: 2,
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "center"
  }}
>

<Box
  component={motion.div}
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  sx={{
  width: "100%",
  maxWidth: {
    xs: "100%",
    sm: "100%",
    md: 1000,
    lg: 1200,
  }
}}
>

        <Stars />
        <Typography
            variant="h2"
            sx={{
              mt: -2,
              fontWeight: 900,
              background:
                "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
          Welcome, {user?.name}
        </Typography>
          
        <Box sx={{ width: "100%", mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "#232427",
                borderRadius: 3,
                p: 2,
                minHeight: { xs: 100, sm: 150, md: 150 },
                width: "100%",
                
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" color="white">
                  Create Your Own Event
                </Typography>

                <Typography color="gray" mb={3}>
                  Plan and organize your own event easily.
                </Typography>

                <Box
                    component="img"
                    src="/images/create-event-placeholder.png"
                    alt="Create Event Placeholder"
                    sx={{
                      width: "45%",
                      height: "45%",
                      borderRadius: 2,
                      mb: 2,
                      mx: "auto",
                      display: "block",
                    }}
                />

                <Box
                  sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: "auto", // Push the button to the bottom of the card
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      createRef.current?.scrollIntoView({
                    behavior: "smooth", });
                    }}
                    sx={{
                      background: "#ff6a00",
                      fontWeight: "bold",
                    }}>
                  Create Event
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "#232427",
                borderRadius: 3,
                p: 2,
                minHeight: { xs: 100, sm: 150, md: 150 },
                width: "100%",
                
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" color="white">
                  Book Public Events
                </Typography>

                <Typography color="gray" mb={3}>
                  Find and book upcoming public events.
                </Typography>

                <Box
                    component="img"
                    src="/images/book-events-placeholder.png"
                    alt="Book Events Placeholder"
                    sx={{
                      width: "45%",
                      height: "45%",
                      borderRadius: 2,
                      mb: 2,
                      mx: "auto",
                      display: "block",
                    }}
                />

                <Box
                  sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: "auto", // Push the button to the bottom of the card
                  }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      eventsRef.current?.scrollIntoView({
                    behavior: "smooth", });
                    }}
                    sx={{
                      background: "#ff6a00",
                      fontWeight: "bold",
                    }}>
                  Browse Events
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          
          
        </Grid>
        </Box>

        
        {/* upcoming bookings */}

          <Box mt={40} ref={eventsRef}>

  <Box sx={{ mb: 4 }}>
    <TextField
      label="Search for Events by name, city, category"
      fullWidth
      onChange={handleSearch}
      sx={{
        backgroundColor: "white",
        borderRadius: 1
      }}
    />
  </Box>


  {/* ✅ WHEN SEARCHING → SHOW CARDS */}

  {search ? (

    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2
      }}
    >

      {filteredEvents.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}

    </Box>

  ) : (

    /* ✅ NO SEARCH → SHOW ROWS */

    <>
      <EventRow
        title="Technology"
        events={filteredEvents.filter(
          e => e.category === "Tech"
        )}
      />

      <EventRow
        title="Business Events"
        events={filteredEvents.filter(
          e => e.category === "Business"
        )}
      />

      <EventRow
        title="Conferences"
        events={filteredEvents.filter(
          e => e.category === "Conference"
        )}
      />
    </>

  )}

</Box>
        
        {/* Create Events Form */}
        <Box mt={30} ref={createRef}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Create Event
          </Typography>

        {/* your create event form here */}

        <Card
          sx={{
          background: "#232427",
          p: 3,
          borderRadius: 3,
          }}>

          <CreateEventForm />

        </Card>

      </Box>
        

      </Box>
      </Box>
    </Box>

  );
}