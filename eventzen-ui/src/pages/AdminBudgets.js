import { useEffect, useState } from "react";
import axios from "axios";
import { node } from "../services/api";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  TextField,
  MenuItem, Dialog, DialogTitle, DialogContent, Autocomplete
} from "@mui/material";

import AdminNavbar from "../components/AdminNavbar";
import Stars from "../components/Stars";
import { toast } from "react-toastify";

const API = "http://localhost:5180/api/budgets";

export default function AdminBudgets() {

  const [budgets, setBudgets] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventVendors, setEventVendors] = useState([]);
  const [venuePrice, setVenuePrice] = useState(0);
  const [venueCapacity, setVenueCapacity] = useState(0);
  const [ticketPrice, setTicketPrice] = useState(0);

 const openEvent = async (event) => {

  setSelectedEvent(event);

  setTicketPrice(event.price || 0);

  // venue
  if (event.venue_id) {

    const vRes = await node.get(
      "/venues/" + event.venue_id
    );

    setVenueCapacity(
      vRes.data.capacity || 0
    );

    setVenuePrice(
      vRes.data.price || 0
    );
  }

  // ✅ get event vendors (NODE)
  const evRes = await node.get(
    "/event-vendors/event/" + event.id
  );

  const eventVendorList = evRes.data;

  console.log("EVENT VENDORS", eventVendorList);

  // ✅ get all vendors (DOTNET)
  const venRes = await axios.get(
    "http://localhost:5180/api/vendors"
  );

  const allVendors = venRes.data;
  console.log("ALL VENDORS", allVendors);
  console.log("selected event", event);

  const list = eventVendorList.map(ev => {

    const found =
      allVendors.find(
        v => v.id === ev.vendor_id
      );

    return {
      name: ev.vendor_name,
      price: found?.price || 0
    };

  });

  setEventVendors(list);

};


  const [form, setForm] = useState({
    event_id: "",
    total_amount: ""
  });

  const load = () => {

    axios.get(API).then(res => {
      setBudgets(res.data);
    });

    node.get("/events").then(res => {
      setEvents(res.data);
    });

  };

  useEffect(load, []);

  const change = e => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const addBudget = async () => {

  let vendorTotal = 0;

  eventVendors.forEach(v => {
    vendorTotal += Number(v.price || 0);
  });

  const venue = Number(venuePrice || 0);

  const total = venue + vendorTotal;

  const rev =
    Number(ticketPrice || 0) *(Number(venueCapacity || 0)/2);

  const profit = rev - total;

  await axios.post(API, {

    event_id: selectedEvent.id,

    total_cost: total,

    estimated_revenue: rev,

    profit: profit

  });
  toast.success("Budget saved successfully!");
  load();

};

  const [open, setOpen] = useState(false);
  const vendorCost = eventVendors.reduce(
  (sum, v) => sum + Number(v.price),
  0
);

const venueCost = Number(venuePrice);
const totalCost = venueCost + vendorCost;
const estimatedRevenue = ticketPrice * (venueCapacity/2);
const estimatedProfit = estimatedRevenue - totalCost;

  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <AdminNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        <Typography variant="h4" mb={5} sx={{ fontWeight: "bold" }}>
          Budget Management
        </Typography>


       

       
<Box sx={{ maxWidth: 1300, mx: "auto" }}>

  {/* ---------- SEARCH ---------- */}

  <Autocomplete
    options={events}
    getOptionLabel={(option) => option.name || ""}
    onChange={(e, value) => {
      if (value) {
        openEvent(value);
      }
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search Event"
        fullWidth
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          mb: 3
        }}
      />
    )}
  />



  {/* ---------- EVENT INFO ---------- */}

  {selectedEvent && (

    <Box
      sx={{
        background: "#232427",
        p: 3,
        borderRadius: 2,
        mb: 3
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={2}
      >
        {selectedEvent.name} - {selectedEvent.id}
      </Typography>
      <Typography mb={2}>
        Venue Price: ₹ {venuePrice}
      </Typography>

      <Typography>
        Ticket price: ₹ {ticketPrice}
      </Typography>

      <Typography>
        Venue capacity: {venueCapacity}
      </Typography>

      <Typography>
        Max revenue: ₹ {ticketPrice * venueCapacity}
      </Typography>

    </Box>

  )}



  {/* ---------- VENDORS ---------- */}

  {selectedEvent && (

    <Box
      sx={{
        background: "#232427",
        p: 3,
        borderRadius: 2,
        mb: 3
      }}
    >

      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Vendors
      </Typography>


      {eventVendors.length === 0 ? (

        <Typography color="gray">
          No vendors assigned
        </Typography>

      ) : (

        eventVendors.map(v => (

          <Box
            key={v.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              background: "#333",
              p: 1,
              mb: 1,
              borderRadius: 1
            }}
            >

            <Typography>
              {v.name}
            </Typography>

            <Typography>
              ₹ {v.price}
            </Typography>

          </Box>

        ))
        

      )}

    </Box>

  )}

  <Box
      sx={{
        background: "#232427",
        p: 3,
        borderRadius: 2
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Budget Summary
      </Typography>

      <Typography mb={2}>
        Venue Cost: ₹ {venueCost}
      </Typography>

      <Typography mb={2}>
        Vendor Cost: ₹ {vendorCost}
      </Typography>

      <Typography mb={2}>
        Total Cost: ₹ {totalCost}
      </Typography>

      <Typography mb={2}>
        Estimated Revenue: ₹ {estimatedRevenue}
      </Typography>

      <Typography mb={2}>
        Estimated Profit: ₹ {estimatedProfit}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={addBudget}
        disabled={!selectedEvent}
      >
        Save Budget
      </Button>

    </Box>

</Box>
      {/* ---------- ALL BUDGETS ---------- */}

<Typography
  variant="h5"
  mt={5}
  mb={2}
  fontWeight="bold"
>
  All Budgets
</Typography>

<Paper
  sx={{
    background: "#232427",
    color: "white"
  }}
>

  <Table>

    <TableHead>

      <TableRow>

        <TableCell sx={{ color: "white" }}>
          Event ID
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          Total Cost
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          Estimated Revenue
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          Profit
        </TableCell>

        <TableCell sx={{ color: "white" }}>
          Status
        </TableCell>

      </TableRow>

    </TableHead>


    <TableBody>

      {budgets.map(b => (

        <TableRow key={b.id}>

          <TableCell sx={{ color: "white" }}>
            {b.event_Id}
          </TableCell>

          <TableCell sx={{ color: "white" }}>
            ₹ {b.total_Cost}
          </TableCell>

          <TableCell sx={{ color: "white" }}>
            ₹ {b.estimated_Revenue}
          </TableCell>

          <TableCell sx={{ color: "white" }}>
            ₹ {b.profit}
          </TableCell>

          <TableCell sx={{ color: "white" }}>
            {b.status}
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