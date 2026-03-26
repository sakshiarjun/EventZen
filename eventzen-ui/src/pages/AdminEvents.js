import { useEffect, useState } from "react";
import { dotnet, node, spring } from "../services/api";
import axios from "axios";
import CreateEventForm from "../components/CreateEventForm";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

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
  TextField, Chip,
  Grid, MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab, Autocomplete
} from "@mui/material";

import Stars from "../components/Stars";
import AdminNavbar from "../components/AdminNavbar";
import { format } from "date-fns";

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

  node.get("/events").then(res => {
    setEvents(res.data);
  });

  spring.get("/bookings").then(res => {
    setBookings(res.data);
  });

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

  setSelectedEvent(null);

  toast.success("Event approved");

};

  const deleteEvent = async (id) => {

  if (!window.confirm("Delete this event?")) return;

  try {

    await node.delete("/events/" + id);

    load();

    setSelectedEvent(null);

    toast.success("Event deleted");

  } catch (err) {

    console.log(err);

    toast.error("Delete failed");

  }

};


  const userEvents =
    events.filter(e =>
      e.created_by_role === "USER"
    );

  const adminEvents =
    events.filter(e =>
      e.created_by_role === "ADMIN"
    );

  const eventsNeedingApproval =
    events.filter(e =>
      e.status === 0
    );

    //console.log("USER EVENTS", userEvents);
    //console.log("ADMIN EVENTS", adminEvents);
    //console.log("EVENTS NEEDING APPROVAL", eventsNeedingApproval);

   const statusColor = (s) => {

    if (s === 0) return "warning";
    if (s === 1) return "success";

    return "default";
  };

  const [bookings, setBookings] = useState([]);
  const getAttendeeCount = (eventId) => {

  let total = 0;

  bookings.forEach(b => {

    if (b.booking.eventId === eventId) {

      total += b.booking.attendeeCount;

    }

  });

  return total;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "EEEE, MMMM do, yyyy");
};

const [vendors, setVendors] = useState([]);
const [selectedType, setSelectedType] = useState("");
const [selectedVendors, setSelectedVendors] = useState([]);
const [selectedEvent, setSelectedEvent] = useState(null);
const [eventVendors, setEventVendors] = useState([]);
const [search, setSearch] = useState("");
const [allVendors, setAllVendors] = useState([]);
const [vendorToAdd, setVendorToAdd] = useState(null);

const filteredEvents = events.filter(e =>
  e.name
    .toLowerCase()
    .includes(search.toLowerCase())
);

const isVendorAdded = (vendorId) => {

  return eventVendors.some(
    v => v.vendor_id === vendorId
  );


};
//console.log("EVENT VENDORS", eventVendors);

const openEvent = async (event) => {

  setSelectedEvent(event);

  try {

    // -------------------
    // event vendors
    // -------------------

    const evRes = await node.get(
      "/event-vendors/event/" + event.id
    );

    const eventVendorList = evRes.data;

    setEventVendors(eventVendorList);


    // -------------------
    // venue
    // -------------------

    let venuePrice = 0;
    let venueCapacity = 0;

    if (event.venue_id) {

      const vRes = await node.get(
        "/venues/" + event.venue_id
      );

      venuePrice = vRes.data.price || 0;
      venueCapacity = vRes.data.capacity || 0;
    }


    // -------------------
    // vendors (.NET)
    // -------------------

   const venRes = await fetch(
  "http://localhost:5173/api/vendors"
);

const allVendorsData = await venRes.json();

// filter by city
const cityVendors = allVendorsData.filter(
  v => v.city === event.city
);

// if vendors don't have city, use this instead:
// const cityVendors = allVendorsData;

setAllVendors(cityVendors);

const allVendors = allVendorsData;

    

    let vendorTotal = 0;

    const vendorDetails = eventVendorList.map(ev => {

      const found =
        allVendors.find(
          v => v.id === ev.vendor_id
        );

      const price = found?.price || 0;

      vendorTotal += price;
      

      return {
        name: ev.vendor_name,
        service_type: ev.service_type,
        price
      };

    });


    // -------------------
    // ticket
    // -------------------

    const ticketPrice =
      Number(event.price || 0);

    const ticketTotal =
      ticketPrice * venueCapacity;


    // -------------------
    // final total
    // -------------------

    const total =
      venuePrice +
      vendorTotal;


    setBudget({

      venuePrice,
      venueCapacity,
      ticketPrice,
      ticketTotal,
      vendors: vendorDetails,
      vendorTotal,
      total

    });

  } catch (err) {

    console.log(err);

  }

};

useEffect(() => {

  axios.get("http://localhost:5173/api/vendors")
    .then(res => setVendors(res.data));

  /*dotnet.get("/vendors").then(res => {
    setVendors(res.data);
  });*/

}, []);

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

  return map[type] || "#999";
};

const [budget, setBudget] = useState({
  venuePrice: 0,
  venueCapacity: 0,
  ticketPrice: 0,
  ticketTotal: 0,
  vendors: [],
  vendorTotal: 0,
  total: 0
});

const calculateTotalCost = (budget) => {
  const vendorTotal = Number.parseFloat(budget.vendorTotal) || 0;
  //const ticketPrice = parseFloat(budget.ticketPrice) || 0;
  //const ticketTotal = parseFloat(budget.ticketTotal) || 0;
  const venuePrice = Number.parseFloat(budget.venuePrice) || 0;
  return vendorTotal + venuePrice;
};

const totalCost = calculateTotalCost(budget);

const addVendorToEvent = async (vendor) => {

  await node.post("/event-vendors", {

    event_id: selectedEvent.id,
    vendor_id: vendor.id,
    vendor_name: vendor.name,
    service_type: vendor.service_type

  });

  openEvent(selectedEvent);

};

const removeVendor = async (id) => {

  await node.delete(
    "/event-vendors/" + id
  );

  openEvent(selectedEvent);

};


  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <AdminNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        {/* ---------------- ADD EVENT ---------------- */}

        <Typography variant="h4" mb={2} fontWeight={"bold"}>
          Add New Event
        </Typography>
        <CreateEventForm />
         {/* ---------------- EVENTS NEEDING APPROVAL ---------------- */}

        <Typography variant="h4" mt={4} mb={2} fontWeight={"bold"}>
          Events Needing Approval
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
                <TableCell sx={{ color: "white" }}>Status</TableCell>

              </TableRow>
            </TableHead>


            <TableBody>

              {eventsNeedingApproval.map(e => (

                <TableRow
                  key={e.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => openEvent(e)}
                >

                  <TableCell sx={{ color: "white" }}>
                    {e.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.city}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {formatDate(e.event_date)}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.created_by_name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.price}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={e.status === 0 ? "Pending" : "Approved"}
                      color={statusColor(e.status)}
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>


        {/* ---------------- USER EVENTS ---------------- */}

        <Typography variant="h4" mt={4} mb={2} fontWeight={"bold"}>
          User Created Events 
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
                <TableCell sx={{ color: "white" }}>Status</TableCell>

              </TableRow>
            </TableHead>


            <TableBody>

              {userEvents.map(e => (

                <TableRow
                  key={e.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => openEvent(e)}
                >

                  <TableCell sx={{ color: "white" }}>
                    {e.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.city}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {formatDate(e.event_date)}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.created_by_name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.price}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={e.status === 0 ? "Pending" : "Approved"}
                      color={statusColor(e.status)}
                    />

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>
<Dialog
  open={Boolean(selectedEvent)}
  onClose={() => setSelectedEvent(null)}
  maxWidth="md"
  fullWidth
  PaperProps={{
    sx: {
      background: "#2b2c30",
      color: "white",
      backdropFilter: "blur(10px)",
      borderRadius: 3
    }
  }}
>

  {selectedEvent && (

    <>

      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          color: "#ff6a00"
        }}
      >

        {selectedEvent.name}

        <IconButton
          onClick={() => setSelectedEvent(null)}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>

      </DialogTitle>


      <DialogContent dividers>


        <Typography>
          Category: {selectedEvent.category}
        </Typography>

        <Typography>
          Date: {formatDate(selectedEvent.event_date)}
        </Typography>

        <Typography>
          Start: {selectedEvent.start_time}
        </Typography>

        <Typography>
          End: {selectedEvent.end_time}
        </Typography>

        <Typography>
          Price: ₹ {selectedEvent.price}
        </Typography>

        <Typography>
          Organizer: {selectedEvent.organizer}
        </Typography>

        <Typography>
          Venue: {selectedEvent.venue_name}
        </Typography>

        <Typography>
          Created By: {selectedEvent.created_by_name}
        </Typography>


        {/* -------- Vendors -------- */}

<Typography mt={2} fontWeight="bold">
  Vendors
</Typography>

{allVendors?.map(vendor => {
  console.log("aaaaa", vendor);

  const added = isVendorAdded(vendor.id);

  const evVendor =
    eventVendors.find(
      ev => ev.vendor_id === vendor.id
    );

  return (

    <Box
      key={vendor.id}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: added
          ? "#538a56"
          : "#444",
        p: 1,
        mt: 1,
        borderRadius: 1
      }}
    >

      <Box>

        <Typography>
          {vendor.name} , {vendor.city}
        <Chip 
          label={vendor.service_Type}
          sx={{
            ml: 5,
            backgroundColor:
              colorByType(
                vendor.service_Type
              ),
            color: "white"
          }}
        />
        
        </Typography>

      </Box>


      <Box>

        <Button
          size="small"
          variant="contained"
          disabled={added}
          sx={{
            mr: 1,
            background: "#4caf50"
          }}
          onClick={() =>
            addVendorToEvent(vendor)
          }
        >
          Add
        </Button>


        <Button
          size="small"
          variant="contained"
          color="error"
          disabled={!added}
          onClick={() =>
            removeVendor(evVendor.id)
          }
        >
          Remove
        </Button>

      </Box>

    </Box>

  );

})}

        {/* -------- Budget -------- */}

        <Typography mt={2} fontWeight="bold">
          Budget
        </Typography>

        <Box
          sx={{
            mt: 1,
            background: "#333",
            p: 2,
            borderRadius: 1
          }}
        >

          <Typography>
            Venue cost: ₹ {budget.venuePrice}
          </Typography>
          <hr></hr>

          {budget.vendors.map((v, i) => (

            <Typography key={i}>
              {v.name}: ₹{v.price}
            </Typography>

          ))}

          <Typography fontWeight="bold">
            Vendors total: ₹ {budget.vendorTotal}
          </Typography>
          <hr></hr>
          <Typography fontWeight="bold" color="#ff9800">
            Total Cost: ₹ {totalCost}
          </Typography>
          <hr></hr>
          <Typography>
            Ticket price: ₹ {budget.ticketPrice}
          </Typography>

          <Typography>
            Capacity: {budget.venueCapacity}
          </Typography>
          <hr></hr>
          <Typography fontWeight="bold" color="#ff9800">
            Revenue: ₹ {budget.ticketTotal}
          </Typography>
          <hr></hr>
          <Typography variant="h5" fontWeight="bold" color="#4caf50">
            Estimated Profit: ₹ {budget.ticketTotal - totalCost}
          </Typography>

        </Box>

        {selectedEvent.status === 0 && (

  <Button
    variant="contained"
    fullWidth
    sx={{
      mt: 2,
      backgroundColor: "#4caf50",
      fontWeight: "bold"
    }}
    onClick={() => approve(selectedEvent.id)}
  >
    Approve Event
  </Button>

)}
        {selectedEvent.status === 1 && (

  <Button
    variant="contained"
    fullWidth
    sx={{
      mt: 2,
      backgroundColor: "#cb0e0e",
      fontWeight: "bold"
    }}
    onClick={() => deleteEvent(selectedEvent.id)}
  >
    Delete Event
  </Button>

)}

      </DialogContent>

    </>

  )}

</Dialog>


        {/* ---------------- ALL EVENTS ---------------- */}

        <Typography variant="h4" mb={2} fontWeight={"bold"}>
          All Events
        </Typography>
        <TextField
  fullWidth
  placeholder="Search event by name..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  sx={{
    mb: 5,
    background: "white",
    borderRadius: 1
  }}
/>


        <Paper sx={{ background: "#232427" }}>
          
          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Registrations</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filteredEvents.map(e => (

                <TableRow
                  key={e.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => openEvent(e)}
                >

                  <TableCell sx={{ color: "white" }}>
                    {e.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {e.city}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {formatDate(e.event_date)}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {getAttendeeCount(e.id)}
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