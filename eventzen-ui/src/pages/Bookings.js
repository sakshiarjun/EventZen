import { useEffect, useState } from "react";
import { spring } from "../services/api";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,Box,Typography,Chip, Dialog,
  DialogTitle,
  DialogContent, Button
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";
import { toast } from "react-toastify";

export default function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
const [selectedAttendees, setSelectedAttendees] = useState([]);
const [selectedBooking, setSelectedBooking] = useState(null);
const [selectedEvent, setSelectedEvent] = useState(null);

const handleRowClick = (b) => {

  setSelectedAttendees(b.attendees);
  setSelectedBooking(b.booking);
  setSelectedEvent(b.event);

  setOpen(true);
};

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

  const cancelBooking = async () => {

  try {

    await spring.put(
      `/bookings/${selectedBooking.id}`,
      {
        status: 2
      }
    );
    toast.success("Booking cancelled");

    setOpen(false);

    // refresh list
    const res = await spring.get("/bookings");

    const myBookings =
      res.data.filter(
        b => b.booking.userId === user.id
      );

    setBookings(myBookings);

  } catch (err) {

    toast.error("Cancel failed");

  }

};


  const statusColor = (s) => {

    if (s === 0) return "warning";
    if (s === 1) return "success";
    if (s === 2) return "error";

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

          <TableRow
  key={i}
  hover
  onClick={() => handleRowClick(b)}
  sx={{ cursor: "pointer" }}
>

            <TableCell sx={{ color: "white" }}>
              {event.name}
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              {event.city}
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              {new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              }).format(new Date(event.event_date))}
            </TableCell>

            <TableCell sx={{ color: "white" }}>
              {booking.attendeeCount}
            </TableCell>

            <TableCell>

              <Chip
                label={
                  booking.status === 0
                    ? "Pending"
                    : booking.status === 1
                    ? "Approved"
                    : "Cancelled"
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

  <Dialog open={open} onClose={() => setOpen(false)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: {
      backgroundColor: "#9d9d9d", // Change dialog background color
      color: "white" // Ensure text is visible
    }
  }}
>

  <DialogTitle color="black" fontWeight={"bold"}>
    Booking Details
  </DialogTitle>

  <DialogContent>

    {selectedEvent && (

      <Box mb={2}>

        <Typography variant="h6" fontWeight={"bold"} color="black">
          {selectedEvent.name}
        </Typography>

        <Typography color="black">
          {selectedEvent.city} -{" "}
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          }).format(new Date(selectedEvent.event_date))}
        </Typography>

        <Typography color="black">

  {new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(
    new Date(`1970-01-01T${selectedEvent.start_time}`)
  )}

  {" "}to{" "}

  {new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(
    new Date(`1970-01-01T${selectedEvent.end_time}`)
  )}

</Typography>

        <Typography color="black">
          ₹{selectedEvent.price} per ticket
        </Typography>

        <Typography sx={{ mt: 2 }} color="black">
          {selectedEvent.description}
        </Typography>

      </Box>

    )}

    <Typography variant="h6" fontWeight={"bold"} color="black">
          Attendees:
        </Typography>

    <Table>
      <TableHead>
        <TableRow>

            <TableCell fontWeight={"bold"}>Name</TableCell>
            <TableCell fontWeight={"bold"}>Email</TableCell>
            <TableCell fontWeight={"bold"}>Phone</TableCell>

          </TableRow>
      </TableHead>

      <TableBody>
        {selectedAttendees.map((a, i) => (

          <TableRow key={i}>
            <TableCell>{a.name}</TableCell>
            <TableCell>{a.email}</TableCell>
            <TableCell>{a.phone}</TableCell>
          </TableRow>

        ))}
      </TableBody>

    </Table>

   {selectedBooking?.status === 0 && (

  <Box mt={2}>

    <Button
      variant="contained"
      color="error"
      onClick={cancelBooking}
    >
      Cancel Booking
    </Button>

  </Box>

)}

  </DialogContent>

</Dialog>

      </Box>

    </Box>

  );

}