import { useEffect, useState } from "react";
import { spring } from "../services/api";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper
} from "@mui/material";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function Bookings() {

  const [bookings, setBookings] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    if (!user) return;

    spring.get("/bookings")
  .then(res => {

    console.log("BOOKINGS API:", res.data);

    const myBookings =
  res.data.filter(
    b => b.booking.userId === user.id
  );

    console.log("FILTERED:", myBookings);

    setBookings(myBookings);

  });

  }, []);


  const statusColor = (s) => {

    if (s === 0) return "warning";
    if (s === 1) return "success";

    return "default";
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
      <DashboardNavbar />

      <Box
        sx={{
          pt: 12,
          px: 3,
          maxWidth: 1200,
          margin: "auto"
        }}
      >

        <Typography variant="h4" mb={3} fontWeight={"bold"}>
          My Bookings
        </Typography>

<Paper sx={{ background: "#232427" }}>

  <Table>

    <TableHead>

      <TableRow>

        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Event</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" }}>City</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Attendees</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>

      </TableRow>

    </TableHead>


    <TableBody>

      {bookings.map((b, i) => {

        const booking = b.booking;
        const attendees = b.attendees;
        const event = b.event;

        return (

          <TableRow key={i}>

            <TableCell sx={{ color: "white" }}>
              {event.name}
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              {event.city}
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              {event.event_date}
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              {booking.attendeeCount}
            </TableCell>

            <TableCell>

              <Chip
                label={
                  booking.status === 0
                    ? "Pending"
                    : "Approved"
                }
                color={statusColor(booking.status)}
              />

            </TableCell>

          </TableRow>

        );

      })}

    </TableBody>

  </Table>

</Paper>

      </Box>

    </Box>

  );

}