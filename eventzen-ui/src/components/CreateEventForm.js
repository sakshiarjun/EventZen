import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

import { node } from "../services/api";
import { Bold } from "lucide-react";
import { toast } from "react-toastify";

export default function CreateEventForm() {

  const [form, setForm] = useState({
    name: "",
    description: "",
    event_date: "",
    city: "",
    category: "",
    price: "",
    venue_id: "",
    venue_name: "",
    start_time: "",
    end_time: "",
    organizer: "",
    image: null,
  });

  const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Chandigarh",
  "Indore",
  "Bhopal",
  "Nagpur",
  "Kochi",
  "Coimbatore",
  "Visakhapatnam",
  "Patna",
  "Goa"
];

  const categories = [
  "Music",
  "Concert",
  "Festival",
  "Party",
  "Business",
  "Conference",
  "Workshop",
  "Seminar",
  "Education",
  "Tech",
  "Hackathon",
  "Sports",
  "Cultural",
  "Food",
  "Travel"
];
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Add constraint for event_date
    if (name === "event_date") {
      const today = new Date();
      const selectedDate = new Date(value);

      // Prevent selecting today's or past dates
      if (selectedDate <= today) {
        toast.error("Event date must be from the next day onwards.");
        return;
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };


  const handleImage = (e) => {
    setForm({
      ...form,
      image: e.target.files[0],
    });
  };


  const handleSubmit = async () => {

  const user =
    JSON.parse(localStorage.getItem("user"));

  try {

    await node.post("/events", {

      ...form,

      status: 0,
      active: 1,

      organizer: user.name,

      created_by_role: "USER",
      created_by_name: user.name

    });

    toast.success("Event sent for approval");

  } catch (err) {

    toast.error("Failed");

  }

};

  const inputStyle = {
    mb: 2,
    backgroundColor: "white",
    borderRadius: 1,
  };

  const [venues, setVenues] = useState([]);
  useEffect(() => {

    if (!form.city) return;

    node.get("/venues/by-city", {
      params: {
        city: form.city
      }
    })
    .then(res => setVenues(res.data));

  }, [form.city]);

  return (
    <Card
      sx={{
        background: "#232427",
        p: 4,
        borderRadius: 3,
        width: "100%", // Adjusted to take full horizontal space
        maxWidth: "none", // Removed maxWidth constraint
      }}
    >

      <Typography variant="h5" mb={4} 
       sx={{
        marginTop: -2,
        background: "linear-gradient(90deg,#ff3d00,#ff9100,#00e5ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold"
       }}>
        Register your next Event with us!
      </Typography>

      <Grid container spacing={3} sx={{ width: "100%" }}> {/* Ensures the grid spans full width */}

        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Event Name
          </Typography>
          <TextField
            label="Enter Event Name"
            name="name"
            fullWidth
            onChange={handleChange}
            sx={{ ...inputStyle, width: 500 }}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            City
          </Typography>
          <TextField
            select
            label="Select City"
            name="city"
            fullWidth
            onChange={handleChange}
            sx={{ ...inputStyle, minWidth: 200 }} // Increased width for better usability
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}
              sx={{ color: "black" }}>
                {city}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Event Date
          </Typography>
          <TextField
            type="date"
            name="event_date"
            fullWidth
            onChange={handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Estimated Cost (₹)
          </Typography>
          <TextField
            label="Enter Estimated Cost"
            name="price"
            fullWidth
            onChange={handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Description
          </Typography>
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            onChange={handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Category
          </Typography>
          <TextField
            select
            label="Select Category"
            name="category"
            fullWidth
            onChange={handleChange}
            sx={{ ...inputStyle, minWidth: 200 }} // Increased width for better usability
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}
              sx={{ color: "black" }}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

   <Grid item xs={12}>

  <Typography variant="subtitle1" color="white">
    Venue
  </Typography>

  <TextField
    select
    label="Venue"
    name="venue_id"
    value={form.venue_id || ""}
    fullWidth
    onChange={(e) => {

      const id = e.target.value;

      const selectedVenue =
        venues.find(v => v.id === id);

      setForm({
        ...form,
        venue_id: id,
        venue_name: selectedVenue?.name || ""
      });

    }}
    onMouseDown={(e) => {
      if (!form.city) {
        e.preventDefault();
        toast.warning("Please select city first");
      }
    }}
    sx={{
      ...inputStyle,
      "& .MuiInputBase-input": { color: "black" },
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white"
      }
    }}
  >

    {venues.map((v) => (
      <MenuItem
        key={v.id}
        value={v.id}
        sx={{ color: "black" }}
      >
        {v.name}
      </MenuItem>
    ))}

  </TextField>

</Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Start Time
          </Typography>
          <TextField
            type="time"
            name="start_time"
            fullWidth
            onChange={handleChange}
            sx={inputStyle}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            End Time
          </Typography>
          <TextField
            type="time"
            name="end_time"
            fullWidth
            onChange={handleChange}
            sx={inputStyle}
          />
        </Grid>

        

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            sx={{ background: "#ff6a00", fontWeight: "bold" }}
            onClick={handleSubmit}
          >
            Create Event
          </Button>
        </Grid>

      </Grid>

    </Card>
  );
}