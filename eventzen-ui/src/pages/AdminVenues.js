import { useEffect, useState } from "react";
import { node } from "../services/api";

import {
  Box, Typography, Table, TableHead,
  TableRow, TableCell, TableBody,
  Paper, Button, Chip, Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton, MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Stars from "../components/Stars";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

export default function AdminVenues() {

  const [venues, setVenues] = useState([]);

  const [selectedVenue, setSelectedVenue] = useState(null);
  const [editVenue, setEditVenue] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const [openAdd, setOpenAdd] = useState(false);

  const [newVenue, setNewVenue] = useState({
  name: "",
  city: "",
  capacity: "",
  price: ""
});
  const handleNewChange = (e) => {

  setNewVenue({
    ...newVenue,
    [e.target.name]: e.target.value
  });

};

  const addVenue = async () => {

  await node.post("/venues", {
    ...newVenue,
    status: 0,
    active: 1
  });

  load();

  setOpenAdd(false);
  toast.success("Venue added successfully!");
};

  const load = () => {
    node.get("/venues")
      .then(res => {
        setVenues(res.data);
      })
      .catch(err => {
        console.error("Error loading venues:", err.response?.data || err.message);
      });
  };

  console.log("Loaded venues:", venues);

  useEffect(() => {
    load();
  }, []);

  const filteredVenues = venues.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const approve = async (id) => {
    try {
      await node.put(`/venues/${id}`, {
        status: 1
      });
      load();
    } catch (err) {
      console.error(`Error approving venue with id ${id}:`, err.response?.data || err.message);
    }
  };

  const statusColor = (s) => {

    if (s === 0) return "warning";
    if (s === 1) return "success";

    return "default";
  };
  const handleChange = (e) => {
  setEditVenue({
    ...editVenue,
    [e.target.name]: e.target.value
  });
};


  const updateVenue = async () => {

  await node.put(
    "/venues/" + editVenue.id,
    {
      ...editVenue,
      status: 1
    }
  );

  load();

  setSelectedVenue(null);

};
  const deleteVenue = async (id) => {

  await node.put("/venues/" + id, {
    ...editVenue,
    status: 0
  });

  load();

  setSelectedVenue(null);

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


  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <AdminNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        <Box
  sx={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2
  }}
>

  <Typography variant="h4" fontWeight="bold">
    Manage Venues
  </Typography>

  <Button
    variant="contained"
    sx={{
      backgroundColor: "#ed6f3e", fontWeight: "bold", 
      "&:hover": { backgroundColor: "#ff7a50" },
      
    }}
    onClick={() => setOpenAdd(true)}
  >
    + Add New Venue
  </Button>

</Box>

        <TextField
          variant="outlined"
          placeholder="Search by name or city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2, backgroundColor: "white", borderRadius: 1, width: "100%" }}
        />

        <Paper sx={{ background: "#232427" }}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Capacity</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>
              {filteredVenues.map(v => (

                <TableRow
                  key={v.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedVenue(v);
                    setEditVenue(v);
                    }}
                >

                  <TableCell sx={{ color: "white" }}>
                    {v.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {v.city}
                  </TableCell>
                  <TableCell sx={{ color: "white" }}>
                    {v.capacity}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {v.price}
                  </TableCell>
                  <TableCell>

                    <Chip
                label={
                  v.status === 0
                    ? "Pending"
                    : "Approved"
                }
                color={statusColor(v.status)}
              />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>


        <Dialog
  open={Boolean(selectedVenue)}
  onClose={() => setSelectedVenue(null)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: {
      backgroundColor: "#c7bbb4", // Change dialog background color
      color: "white" // Ensure text is visible
    }
  }}
>

  {selectedVenue && (

    <>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          color: "black"
        }}
      >

        Edit Venue

        <IconButton
          onClick={() => setSelectedVenue(null)}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={editVenue.name}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="City"
          name="city"
          value={editVenue.city}
          onChange={handleChange}
          sx={{ mt: 2}}
        />

        <TextField
          fullWidth
          label="Capacity"
          name="capacity"
          value={editVenue.capacity}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          value={editVenue.price}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={updateVenue}
        >
          Save Changes
        </Button>
        
        {editVenue.status === 0 ? (

  <Button
    fullWidth
    variant="contained"
    sx={{ mt: 3, backgroundColor: "#4caf50" }}
    onClick={updateVenue}
  >
    Approve Venue
  </Button>

) : (

  <Button
    fullWidth
    variant="contained"
    color="error"
    sx={{ mt: 3 }}
    onClick={() => deleteVenue(editVenue.id)}
  >
    Delete Venue
  </Button>

)}

      </DialogContent>
    </>

  )}

</Dialog>

<Dialog
  open={openAdd}
  onClose={() => setOpenAdd(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: {
      backgroundColor: "#c7bbb4", // Change dialog background color
      color: "white" // Ensure text is visible
    }
  }}
>

  <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          color: "black"
        }}
      >

        Add New Venue

        <IconButton
          onClick={() => setSelectedVenue(null)}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>

  <DialogContent>

    <Typography sx={{ color: "black", mt: 1 }}>Venue Name</Typography>
    <TextField
      fullWidth
      label="Name"
      name="name"
      //sx={{ mt: 2 }}
      onChange={handleNewChange}
    />

          <Typography sx={{ color: "black", mt: 2 }}>City</Typography>
              <TextField
            select
            label="Select City"
            name="city"
            fullWidth
            onChange={handleNewChange}
            sx={{ minWidth: 200 }} // Increased width for better usability
          >
            {cities.map((city) => (
              <MenuItem key={city} value={city}
              sx={{ color: "black" }}>
                {city}
              </MenuItem>
            ))}
          </TextField>
    <Typography sx={{ color: "black", mt: 2 }}>Venue Capacity</Typography>
    <TextField
      fullWidth
      label="Capacity"
      name="capacity"
      //sx={{ mt: 2 }}
      onChange={handleNewChange}
    />
    <Typography sx={{ color: "black", mt: 2 }}>Price per Day</Typography>
    <TextField
      fullWidth
      label="Price"
      name="price"
      //sx={{ mt: 2 }}
      onChange={handleNewChange}
    />

    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 3 }}
      onClick={addVenue}
    >
      Add Venue
    </Button>

  </DialogContent>

</Dialog>

      </Box>

    </Box>

  );

}