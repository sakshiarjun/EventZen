import { useEffect, useState } from "react";
import { node } from "../services/api";
import { useNavigate } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";
import EventRow from "../components/EventRow";

export default function Dashboard() {

  const [events, setEvents] = useState([]);
  const [cityFilter, setCityFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);

  const nav = useNavigate();

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

  const toggleCity = (city) => {
  setCityFilter(prev =>
    prev.includes(city)
      ? prev.filter(c => c !== city)
      : [...prev, city]
  );
};

const toggleCategory = (cat) => {
  setCategoryFilter(prev =>
    prev.includes(cat)
      ? prev.filter(c => c !== cat)
      : [...prev, cat]
  );
};

  const filteredEvents = events.filter(e => {

  const cityMatch =
    cityFilter.length === 0 ||
    cityFilter.includes(e.city);

  const categoryMatch =
    categoryFilter.length === 0 ||
    categoryFilter.includes(e.category);

  return cityMatch && categoryMatch;

});

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
    display: "flex",
    gap: 3,
    position: "relative",
    zIndex: 1
  }}
>
  <Box
  sx={{
    width: 250,
    minWidth: 250,
    background: "rgba(255,255,255,0.05)",
    borderRadius: 3,
    p: 2
  }}
>

  <Typography variant="h6">
    Filters
  </Typography>

  {/* CITY */}

  <Typography sx={{ mt: 2 }}>
    City
  </Typography>

  {[
    "Mumbai",
    "Delhi",
    "Pune",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata"
  ].map(city => (

    <label key={city}>

      <input
        type="checkbox"
        onChange={() => toggleCity(city)}
      />

      {city}

      <br />

    </label>

  ))}

  {/* CATEGORY */}

  <Typography sx={{ mt: 2 }}>
    Category
  </Typography>

  {[
    "Music",
    "Workshop",
    "Popular",
    "Business",
    "Festival",
    "Tech"
  ].map(cat => (

    <label key={cat}>

      <input
        type="checkbox"
        onChange={() => toggleCategory(cat)}
      />

      {cat}

      <br />

    </label>

  ))}

</Box>
<Box sx={{ flex: 1 }}>


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

        {/* upcoming bookings */}

        <EventRow
          title="Music Events"
          events={filteredEvents.filter(
          e => e.category === "Music"
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

      </Box>
      </Box>
    </Box>

  );
}