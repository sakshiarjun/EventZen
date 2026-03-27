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

  const [vendors, setVendors] = useState([]);
  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorType, setVendorType] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);

  useEffect(() => {

  fetch("http://localhost:5173/api/vendors")
    .then(res => res.json())
    .then(data => setVendors(data));

}, []);

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

const service_Types = [
  "Catering",
  "Decoration",
  "Photography",
  "Videography",
  "Music / DJ",
  "Lighting",
  "Sound System",
  "Makeup & Styling",
  "Security",
  "Event Planner"
];

const filteredVendors = vendors.filter(v => {

  const cityMatch =
    form.city &&
    v.city === form.city;

  const typeMatch =
    !vendorType ||
    v.service_Type === vendorType;

  const searchMatch =
    v.name
      ?.toLowerCase()
      .includes(
        vendorSearch.toLowerCase()
      );

  return cityMatch && typeMatch && searchMatch;

});
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Add constraint for event_date
    if (name === "event_date") {
      const today = new Date();
      const selectedDate = new Date(value);

      // Prevent selecting today's or past dates
      if (selectedDate <= today) {
        toast.error("Cannot book for today or past dates");
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

    // ✅ create event

    const res = await node.post(
      "/events",
      {
        ...form,

        status: user.role === "ADMIN" ? 1 : 0,
        active: 1,

        organizer: user.name,

        created_by_role: user.role,
        created_by_name: user.name
      }
    );

    const eventId = res.data.id;

    console.log("Event id:", eventId);


    // ✅ save vendors

    for (let vId of selectedVendors) {

      const vendor =
        vendors.find(
          v => v.id === vId
        );

      await node.post(
        "/event-vendors",
        {
          event_id: eventId,
          vendor_id: vId,
          service_type:
            vendor.service_Type
        }
      );

    }

    toast.success(
      "Event sent for approval"
    );

  } catch (err) {

    console.log(err);

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

 const generateDesc = async () => {

  try {

    const res = await node.post(
      "/events/generateDescription",
      {
        name: form.name,
        city: form.city,
        category: form.category
      }
    );

    setForm({
      ...form,
      description: res.data
    });

  } catch {

    toast.error("AI failed");

  }

};

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    // Check if end_time is earlier than start_time
    if (name === "end_time" && form.start_time) {
      const startTime = form.start_time;
      if (value <= startTime) {
        toast.error("End time cannot be earlier than or equal to start time");
        return;
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

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

      <Grid container spacing={3} sx={{ width: "100%" }}> {/* Ensures the grid spans full width */}

        <Grid item xs={6}>
              <Typography sx={{ color: "white", mb: 1 }}>Event Name</Typography>
              <TextField
                label="Name"
                name="name"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white",  backgroundColor: "gray",}}
              />
            </Grid>

        <Grid item xs={6}>
              <Typography sx={{ color: "white", mb: 1, }}>City</Typography>
              <TextField
            select
            label="Select City"
            name="city"
            fullWidth
            onChange={handleChange}
            sx={{ minWidth: 200, backgroundColor: "gray" }} // Increased width for better usability
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}
              sx={{ color: "black" }}>
                {city}
              </MenuItem>
            ))}
          </TextField>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ color: "white", mb: 1 }}>Category</Typography>
              <TextField
            select
            label="Select Category"
            name="category"
            fullWidth
            onChange={handleChange}
            sx={{  minWidth: 200, backgroundColor: "gray" }} // Increased width for better usability
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}
              sx={{ color: "black" }}>
                {category}
              </MenuItem>
            ))}
          </TextField>
            </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Event Date
          </Typography>
          <TextField
            type="date"
            name="event_date"
            fullWidth
            onChange={handleChange}
            sx={{inputStyle, backgroundColor: "gray",}}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Ticket Price (₹)
          </Typography>
          <TextField
            label="Enter Ticket Price"
            name="price"
            fullWidth
            onChange={handleChange}
            sx={{inputStyle, backgroundColor: "gray",}}
          />
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Description
          </Typography>
          <TextField
            name="Description"
            value={form.description}
            fullWidth
            multiline
            rows={5}
            onChange={handleChange}
            sx={{inputStyle, backgroundColor: "gray",}}
          />
          <Button
            variant="outlined"
            sx={{ mt: 1.5 }}
            onClick={generateDesc}
          >
            Generate with AI
          </Button>
        </Grid>


   <Grid item xs={6}>

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
        backgroundColor: "gray", minWidth: 200
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
      <Typography variant="subtitle1" color="white">
        Capacity
      </Typography>
      <Box sx={{ backgroundColor: 'gray', padding: '8px', borderRadius: '4px' }}>
        <Typography variant="subtitle1" color="black" 
        sx={{ minWidth: 100, minHeight: 40, display: "flex", alignItems: "center",  }}>
          {venues.find(v => v.id === form.venue_id)?.capacity || "N/A"}
        </Typography>
      </Box>
    </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1" color="white" gutterBottom>
            Start Time
          </Typography>
          <TextField
            type="time"
            name="start_time"
            fullWidth
            onChange={handleTimeChange}
            slotProps={{
              input: {
                step: 1800, // 30 minutes
              },
            }}
            sx={{ inputStyle, backgroundColor: "gray" }}
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
            onChange={handleTimeChange}
            slotProps={{
              input: {
                step: 1800, // 30 minutes
              },
            }}
            sx={{ inputStyle, backgroundColor: "gray" }}
          />
        </Grid>
      </Grid>
      <Typography variant="h5" mt={3} mb={1} color="white" fontWeight={"bold"} >
        Add Vendors for your event
      </Typography>
      <Typography mt={3} mb={1} color="white">
        Select Categories to filter vendors
    </Typography>

    <Box mt={2}>

  {/* FILTERS */}

  <Grid container spacing={2} mb={2}>

    <Grid item xs={6}>

      <TextField
        label="Search Vendor"
        //disabled={!form.city}
        onMouseDown={(e) => {
          if (!form.city) {
            e.preventDefault();
            toast.warning("Select city first to view vendors");
          }
        }}
        fullWidth
        value={vendorSearch}
        onChange={(e) =>
          setVendorSearch(e.target.value)
        }
        sx={{ background: "white", backgroundColor: "gray", }}
      />

    </Grid>

    <Grid item xs={6}>

      <TextField
        select
        label="Service Type"
        
        onMouseDown={(e) => {
          if (!form.city) {
            e.preventDefault();
            toast.warning("Select city first to view vendors");
          }
        }}
        disabled={!form.city}
        fullWidth
        value={vendorType}
        onChange={(e) =>
          setVendorType(e.target.value)
        }
        sx={{ background: "white", minWidth: 200, backgroundColor: "gray", }}
      >

        <MenuItem value="">
          All
        </MenuItem>

        {service_Types.map(t => (

          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>

        ))}

      </TextField>

    </Grid>

  </Grid>


  {/* TABLE */}

  <Box
  onMouseDown={(e) => {
    if (!form.city) {
      e.preventDefault();
      toast.warning("Select city first to view vendors");
    }
  }}

  sx={{
    maxHeight: 300,
    overflow: "auto",
    background: form.city
      ? "#1b1c1e"
      : "#555",
    opacity: form.city ? 1 : 0.5,
    pointerEvents: form.city
      ? "auto"
      : "none",
    p: 2,
    borderRadius: 2
  }}
  >

    <table
      style={{
        width: "100%",
        color: "white",
        textAlign: "left" // Default alignment for the table
      }}
    >

      <thead
        style={{
          textAlign: "left" // Center align the header
        }}
      >

        <tr>

          <th>Select</th>
          <th>Name</th>
          <th>Type</th>
          <th>City</th>
          <th>Price</th>

        </tr>

      </thead>

      <tbody>

        {filteredVendors.map(v => (

          <tr key={v.id}>

            <td>

              <input
                type="checkbox"

                checked={
                  selectedVendors.includes(v.id)
                }

                onChange={() => {

                  if (
                    selectedVendors.includes(v.id)
                  ) {

                    setSelectedVendors(
                      selectedVendors.filter(
                        x => x !== v.id
                      )
                    );

                  } else {

                    setSelectedVendors([
                      ...selectedVendors,
                      v.id
                    ]);

                  }

                }}
              />

            </td>

            <td>{v.name}</td>

            <td>{v.service_Type}</td>

            <td>{v.city}</td>

            <td>₹ {v.price}</td>

          </tr>

        ))}

      </tbody>

    </table>

  </Box>

</Box>

    <Button
      variant="contained"
      fullWidth
      sx={{ background: "#ff6a00", fontWeight: "bold", mt: 3 }}
      onClick={handleSubmit}
    >
      Create Event
    </Button>

    </Card>
  );
}