import { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip, MenuItem, Rating
} from "@mui/material";

import Stars from "../components/Stars";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

const API = "http://localhost:5173/api/vendors"; // dotnet

export default function AdminVendors() {

  const [vendors, setVendors] = useState([]);

  const [form, setForm] = useState({
    name: "",
    service_type: "",
    price: "",
    city: "",
    phone: "",
    email: "",
    address: "",
    description: "",
    rating: 0
  });

  const [selectedVendor, setSelectedVendor] = useState(null);

  const load = () => {
    axios.get(API).then(res => {
      setVendors(res.data);
    });
  };

  useEffect(load, []);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addVendor = async () => {
    try {
      await axios.post(API, {

  Name: form.name,
  Service_Type: form.service_type,
  Price: Number(form.price),

  Email: form.email,
  Phone: form.phone,
  Address: form.address,
  City: form.city,
  Description: form.description,

  Rating: Number(form.rating),

  Status: 1,
  Active: true

});

      toast.success("Vendor added successfully!");
      load();
    } catch (error) {
      toast.error("Failed to add vendor. Please try again.");
      console.log("Error adding vendor:", error.response?.data || error.message);
    }

  };

  // color for category

  const colorByType = (type) => {

  const map = {
    Catering: "#4caf50",
    Decoration: "#ff9800",
    Photography: "#2196f3",
    Videography: "#9c27b0",
    "Music / DJ": "#e91e63",
    Lighting: "#ffc107",
    "Sound System": "#00bcd4",
    "Makeup & Styling": "#f06292",
    Security: "#795548",
    "Event Planner": "#3f51b5"
  };

  return map[type] || "#9e9e9e";
};

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

const serviceTypes = [
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

  const handleVendorClick = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <AdminNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        {/* ---------- ADD ---------- */}

        <Typography variant="h4" fontWeight="bold" mb={2}>
          Add Vendor
        </Typography>

        <Paper sx={{ p: 2, mb: 4, background: "#232427" }}>

          <Grid container spacing={2}>

            <Grid item xs={4}>
              <Typography sx={{ color: "white", mb: 1 }}>Name</Typography>
              <TextField
                label="Name"
                name="name"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: "white", mb: 1 }}>Service Type</Typography>
              <TextField
                select
                label="Service Type"
                name="service_type"
                fullWidth
                value={form.service_type}
                onChange={handleChange}
                sx={{ background: "white", minWidth: 200 }}
              >
                {serviceTypes.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: "white", mb: 1 }}>Price</Typography>
              <TextField
                label="Price"
                name="price"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: "white", mb: 1 }}>City</Typography>
              <TextField
                select
                label="City"
                name="city"
                fullWidth
                value={form.city}
                onChange={handleChange}
                sx={{ background: "white", minWidth: 200 }}
              >
                {cities.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>

            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: "white", mb: 1 }}>Phone</Typography>
              <TextField
                label="Phone"
                name="phone"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={4}>
              <Typography sx={{ color: "white", mb: 1 }}>Email</Typography>
              <TextField
                label="Email"
                name="email"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ color: "white", mb: 1 }}>Address</Typography>
              <TextField
                label="Address"
                name="address"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ color: "white", mb: 1 }}>Description</Typography>
              <TextField
                label="Description"
                name="description"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Box>
              <Typography color="white">
                Rating
              </Typography>

  <Rating 
    name="rating"
    size="large"
    value={form.rating || 0}
    precision={0.5}
    onChange={(e, newValue) => {
      setForm({
        ...form,
        rating: newValue
      });
    }}
  />
</Box>

          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#ff3d00" }}
            onClick={addVendor}
          >
            Add New Vendor
          </Button>

        </Paper>


        {/* ---------- TABLE ---------- */}

        <Typography variant="h4" fontWeight="bold" mt={10} mb={2}>
          Our Vendors
        </Typography>

        <Paper sx={{ background: "#232427" }}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Type</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {vendors.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <Typography
                      sx={{ cursor: "pointer", color: "#1976d2" }}
                      onClick={() => handleVendorClick(v)}
                    >
                      {v.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={v.service_Type || "N/A"}
                      sx = {{ backgroundColor: colorByType(v.service_Type), color: "white"  }}
                      //onClick={() => console.log(v)}
                      
                    />

                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {v.city}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    ₹ {v.price}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    <Rating
                      value={v.rating}
                      precision={0.5}
                      readOnly
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>

        </Paper>

        {/* Vendor Description Modal */}
        {selectedVendor && (
          <Box
            sx={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#828387",
              padding: 3,
              borderRadius: 2,
              boxShadow: 24,
              zIndex: 1300,
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={"bold"}>
              {selectedVendor.name}
            </Typography>
            <Typography>
              {selectedVendor.description || "No description available."}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: "#ff3d00" }}
              onClick={() => setSelectedVendor(null)}
            >
              Close
            </Button>
          </Box>
        )}

      </Box>

    </Box>

  );

}