import { useEffect, useState } from "react";
import { node } from "../services/api";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TextField,
  Grid
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function AdminEvents() {

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    city: "",
    category: "",
    event_date: "",
    price: "",
    organizer: ""
  });

  const load = () => {
    node.get("/events").then(res => {
      setEvents(res.data);
    });
  };

  useEffect(() => {
    load();
  }, []);


  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };


  const addEvent = async () => {

    await node.post("/events", {
      ...form,
      status: 1,
      active: 1,
      created_by_role: "ADMIN",
      created_by_name: "ADMIN"
    });

    load();
  };


  const approve = async (id) => {

    await node.put("/events/" + id, {
      status: 1
    });

    load();
  };


  const userEvents =
    events.filter(e =>
      e.created_by_role === "USER"
    );

  const adminEvents =
    events.filter(e =>
      e.created_by_role === "ADMIN"
    );

    console.log("USER EVENTS", userEvents);
    console.log("ADMIN EVENTS", adminEvents);


  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <DashboardNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        {/* ---------------- ADD EVENT ---------------- */}

        <Typography variant="h4" mb={2}>
          Add New Event
        </Typography>

        <Paper sx={{ p: 2, mb: 4, background: "#232427" }}>

          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="City"
                name="city"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Category"
                name="category"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                type="date"
                name="event_date"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Price"
                name="price"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Organizer"
                name="organizer"
                fullWidth
                onChange={handleChange}
                sx={{ background: "white" }}
              />
            </Grid>

          </Grid>

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={addEvent}
          >
            Add Event
          </Button>

        </Paper>


        {/* ---------------- USER EVENTS ---------------- */}

        <Typography variant="h4" mb={2}>
          User Created Events (Need Approval)
        </Typography>

        <Paper sx={{ background: "#232427", mb: 4 }}>

          <Table>

            <TableHead>
              <TableRow>

                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>City</TableCell>
                <TableCell sx={{ color: "white" }}>Date</TableCell>
                <TableCell sx={{ color: "white" }}>Requested By</TableCell>
                <TableCell sx={{ color: "white" }}>Price</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>

              </TableRow>
            </TableHead>


            <TableBody>

              {userEvents.map(e => (

                <TableRow key={e.id}>

                  <TableCell sx={{ color: "white" }}>
                    {e.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.city}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.event_date}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.created_by_name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.price}
                  </TableCell>

                  <TableCell>

                    {e.status === 0 && (

                      <Button
                        variant="contained"
                        onClick={() => approve(e.id)}
                      >
                        Approve
                      </Button>

                    )}

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>


        {/* ---------------- ADMIN EVENTS ---------------- */}

        <Typography variant="h4" mb={2}>
          All Events
        </Typography>

        <Paper sx={{ background: "#232427" }}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>City</TableCell>
                <TableCell sx={{ color: "white" }}>Date</TableCell>
                <TableCell sx={{ color: "white" }}>Role</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {events.map(e => (

                <TableRow key={e.id}>

                  <TableCell sx={{ color: "white" }}>
                    {e.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.city}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.event_date}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.created_by_role}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>

      </Box>

    </Box>

  );

}