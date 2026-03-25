import { Box, Button, Typography, Paper,
  Grid, Card, CardMedia, CardContent,
 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { node, spring } from "../services/api";
import axios from "axios";

import Stars from "../components/Stars";
import AdminNavbar from "../components/AdminNavbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AdminDashboard() {

  const COLORS = [
  "#ff3d00",
  "#4caf50",
  "#2196f3",
  "#ff9800",
  "#9c27b0",
  "#00bcd4",
  "#e91e63",
  "#ffc107"
];

  const nav = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [vendors, setVendors] = useState([]);

 useEffect(() => {

  node.get("/events").then(res => {
    setEvents(res.data);
  });

  spring.get("/bookings").then(res => {
    setBookings(res.data);
  });

  node.get("/venues").then(res => {
    setVenues(res.data);
  });

  axios
    .get("http://localhost:5173/api/vendors")
    .then(res => {
      setVendors(res.data);
    });

}, []);

  const totalEvents = events.length;

  const totalBookings = bookings.length;

  const totalVenues = venues.length;

  const totalVendors = vendors.length;

let totalAttendees = 0;

bookings.forEach(b => {
  totalAttendees += b.booking.attendeeCount;
});

let totalRevenue = 0;

bookings.forEach(b => {

  if (b.booking.status === 1) {

    totalRevenue +=
      b.booking.attendeeCount *
      (b.event?.price || 0);

  }

});

const bookingsPerEvent = [];

events.forEach(e => {

  let count = 0;

  bookings.forEach(b => {
    if (b.booking.eventId === e.id) {
      count += b.booking.attendeeCount;
    }
  });

  if (count > 0) {

    const shortName =
      e.name.length > 10
        ? e.name.substring(0, 10) + "..."
        : e.name;

    bookingsPerEvent.push({
      name: shortName,
      fullName: e.name,
      bookings: count
    });

  }

});

const CustomTooltip = ({ active, payload }) => {

  if (active && payload && payload.length) {

    const data = payload[0].payload;

    return (
      <div
        style={{
          background: "#222",
          color: "white",
          padding: 10,
          borderRadius: 5
        }}
      >
        <div>{data.fullName}</div>
        <div>Bookings: {data.bookings}</div>
      </div>
    );
  }

  return null;
};

const revenuePerEvent = [];

events.forEach(e => {

  let attendees = 0;

  bookings.forEach(b => {

    if (
      b.booking.eventId === e.id &&
      b.booking.status === 1
    ) {
      attendees += b.booking.attendeeCount;
    }

  });

  if (attendees > 0) {

    const price = e.price || 0;

    const revenue = attendees * price;

    const shortName =
      e.name.length > 10
        ? e.name.substring(0, 10) + "..."
        : e.name;

    revenuePerEvent.push({
      name: shortName,
      fullName: e.name,
      attendees,
      price,
      revenue
    });

  }

});

const cityMap = {};

events.forEach(e => {

  if (!cityMap[e.city]) {
    cityMap[e.city] = 0;
  }

  cityMap[e.city]++;

});

const eventsPerCity =
  Object.keys(cityMap).map(c => ({
    name: c,
    value: cityMap[c]
  }));

  const pendingApproved = [

  {
    name: "Pending",
    value:
      events.filter(
        e => e.status === 0
      ).length
  },

  {
    name: "Approved",
    value:
      events.filter(
        e => e.status === 1
      ).length
  }

];

const catMap = {};

events.forEach(e => {

  if (!catMap[e.category]) {
    catMap[e.category] = 0;
  }

  catMap[e.category]++;

});

const eventsPerCategory =
  Object.keys(catMap).map(c => ({
    name: c,
    value: catMap[c]
  }));

  const serviceMap = {};

vendors.forEach(v => {

  const type =
    v.service_Type || v.service_type;

  if (!serviceMap[type]) {
    serviceMap[type] = 0;
  }

  serviceMap[type]++;

});

const vendorsPerService =
  Object.keys(serviceMap).map(s => ({
    name: s,
    value: serviceMap[s]
  }));

const RevenueTooltip = ({ active, payload }) => {

  if (active && payload && payload.length) {

    const d = payload[0].payload;



    return (
      <div
        style={{
          background: "#222",
          color: "white",
          padding: 10,
          borderRadius: 5
        }}
      >
        <div>
          {d.fullName}
        </div>

        <div>
          Tickets sold: {d.attendees}
        </div>

        <div>
          Ticket price: ₹ {d.price}
        </div>

        <div>
          Revenue: ₹ {d.revenue}
        </div>

      </div>
    );
  }

  return null;
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

      <AdminNavbar />

      {/* MAIN LAYOUT */}

      <Box
        sx={{
          pt: 12,
          px: 3,
          display: "flex",
          gap: 3
        }}
      >

        {/* SIDE PANEL */}

        <Paper
          sx={{
            width: 220,
            background: "#232427",
            color: "white",
            p: 2,
            height: "80vh"
          }}
        >

          <Typography
            variant="h6"
            mb={4} fontWeight={"bold"}
          >
            Admin Panel
          </Typography>


          <Button
            fullWidth
            sx={{ mb: 2,
              color: "white",
              backgroundColor: "#ff3d00",
            }}
            variant="contained"
            onClick={() => nav("/admin/events")}
          >
            Manage Events
          </Button>


          <Button
            fullWidth
            sx={{ mb: 2,
              color: "white",
              backgroundColor: "#ff3d00",
            }}
            variant="contained"
            onClick={() => nav("/admin/venues")}
          >
            Manage Venues
          </Button>


          <Button
            fullWidth
            sx={{ mb: 2,
              color: "white",
              backgroundColor: "#ff3d00",
            }}
            variant="contained"
            onClick={() => nav("/admin/vendors")}
          >
            Manage Vendors
          </Button>


          <Button
            fullWidth
            sx={{ mb: 2,
              color: "white",
              backgroundColor: "#ff3d00",
            }}
            variant="contained"
            onClick={() => nav("/admin/bookings")}
          >
            Manage Bookings
          </Button>

          <Button
  fullWidth
  sx={{
    mb: 2,
    color: "white",
    backgroundColor: "#ff3d00",
  }}
  variant="contained"
  onClick={() => nav("/admin/budgets")}
>
  Manage Budgets
</Button>

        </Paper>


        {/* RIGHT CONTENT */}
<Box
  sx={{
    flex: 1,
    background: "#232427",
    p: 3,
    borderRadius: 2,
    overflow: "auto"
  }}
>

  <Typography variant="h4" fontWeight="bold" mb={3}>
    Analytics
  </Typography>


  {/* ---------- STATS CARDS ---------- */}

  <Grid container spacing={2} mb={3}>

    <Grid item xs={3}>
      <Card sx={{ background: "#070707", color: "white", width: "100%" }}>
        <CardContent sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
          <Typography>Total Events</Typography>
          <Typography variant="h5">{totalEvents}</Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={3}>
      <Card sx={{ background: "#070707", color: "white", width: "100%" }}>
        <CardContent sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
          <Typography>Total Venues</Typography>
          <Typography variant="h5">{totalVenues}</Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={3}>
      <Card sx={{ background: "#070707", color: "white", width: "100%" }}>
        <CardContent sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
          <Typography>Total Vendors</Typography>
          <Typography variant="h5">{totalVendors}</Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={3}>
      <Card sx={{ background: "#070707", color: "white", width: "100%" }}>
        <CardContent sx={{alignItems: "center", display: "flex", flexDirection: "column"}}>
          <Typography>Total Bookings</Typography>
          <Typography variant="h5">{totalBookings}</Typography>
        </CardContent>
      </Card>
    </Grid>

  </Grid>



  {/* ---------- ROW 1 ---------- */}

  <Grid container spacing={2} mt={10}>

    <Grid item xs={6}>

      <Typography mb={3} fontWeight={"bold"}> Bookings per Event </Typography>

      {bookingsPerEvent.length > 0 && (

      <BarChart
        width={500}
        height={300}
        data={bookingsPerEvent}
      >

      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Bar
        dataKey="bookings"
        fill="#ff3d00"
      />
    </BarChart>
  )}

</Grid>


    <Grid item xs={6}>

  <Typography fontWeight={"bold"} mb={3}> Revenue per Event </Typography>

  {revenuePerEvent.length > 0 && (

    <BarChart
      width={500}
      height={300}
      data={revenuePerEvent}
    >

      <XAxis dataKey="name" />

      <YAxis />

      <Tooltip content={<RevenueTooltip />} />

      <Bar
        dataKey="revenue"
        fill="#4caf50"
      />

    </BarChart>

  )}

</Grid>

  </Grid>



  {/* ---------- ROW 2 ---------- */}

  <Grid container spacing={2} mt={5}>

    <Grid item xs={6} mr={10}>
      <Typography fontWeight={"bold"}>Events per City</Typography>

      {eventsPerCity.length > 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={eventsPerCity}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#2196f3"
            label
          />
          <Tooltip />
        </PieChart>
      )}

    </Grid>

     <Grid item xs={6}>

  <Typography fontWeight={"bold"}> Vendors by Service Type </Typography>

  {vendorsPerService.length > 0 && (

    <PieChart
      width={450}
      height={300}
    >

      <Pie
  data={vendorsPerService}
  dataKey="value"
  nameKey="name"
  cx="50%"
  cy="50%"
  outerRadius={100}
  label
>
  {vendorsPerService.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

      <Tooltip />

    </PieChart>

  )}

</Grid>

  </Grid>



  {/* ---------- ROW 3 ---------- */}

  <Grid container spacing={2} mt={2}>

    <Grid item xs={6} mr={10}>
      <Typography fontWeight={"bold"}>Events per Category</Typography>

      {eventsPerCategory.length > 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={eventsPerCategory}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#9c27b0"
            label
          />
          <Tooltip />
        </PieChart>
      )}

    </Grid>

    <Grid item xs={6}>
      <Typography fontWeight={"bold"}>Pending vs Approved Events</Typography>

      {pendingApproved.length > 0 && (
        <PieChart width={400} height={300}>
          <Pie
            data={pendingApproved}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            fill="#ff9800"
            label
          />
          <Tooltip />
        </PieChart>
      )}

    </Grid>

  </Grid>



</Box>

    </Box>

    </Box>
    

  );

}