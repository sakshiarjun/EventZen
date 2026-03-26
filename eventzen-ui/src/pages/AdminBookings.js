import { useEffect, useState } from "react";
import { spring } from "../services/api";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,Dialog,
  DialogTitle, Checkbox,
  DialogContent,
  Button
} from "@mui/material";

import Stars from "../components/Stars";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

export default function AdminBookings() {

  const [bookings, setBookings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const approveBooking = async (id) => {

  await spring.put(
    "/bookings/" + id,
    {
      status: 1
    }
  );
  toast.success("Booking approved");
  load();

};

const cancelBooking = async (id) => {

  await spring.put(
    "/bookings/" + id,
    {
      status: 0
    }
  );
  toast.error("Booking cancelled");
  load();
};
  const load = () => {
    spring.get("/bookings").then(res => {
      setBookings(res.data);
    });
  };

  useEffect(load, []);

  const statusColor = (s) => {
    if (s === 0) return "warning";
    if (s === 1) return "success";
    return "default";
  };

  // group by eventId

  const eventsMap = {};

  bookings.forEach(b => {

    const eventId = b.booking.eventId;

    if (!eventsMap[eventId]) {
      eventsMap[eventId] = {
        event: b.event,
        bookings: []
      };
    }

    eventsMap[eventId].bookings.push(b);
    console.log(b);
  });

  const eventsList = Object.values(eventsMap);

  // pending events

  const pendingEvents = eventsList.filter(e =>
    e.bookings.some(
      b => b.booking.status === 0
    )
  );

  const scrollToBookings = () => {
    const bookingsSection = document.getElementById("bookings-section");
    if (bookingsSection) {
      bookingsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <AdminNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        <Typography variant="h4" fontWeight="bold">
          Manage Bookings
        </Typography>


        {/* ---------- PENDING ---------- */}

        <Typography variant="h5" mt={4} fontWeight={"bold"}>
          Pending Approvals
        </Typography>

        <Grid container spacing={2} mt={1}>

          {pendingEvents.map((e, i) => (

            <Grid item key={i}>

              <Card
                sx={{
                  width: 250,
                  height: 350, // Set a fixed height for all cards
                  cursor: "pointer",
                  background: "#232427",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between" // Ensure content is spaced evenly
                }}
                onClick={() => {
                  setSelectedEvent(e);
                  scrollToBookings();
                }}
              >
                <CardMedia
                    component="img"
                    height="160"
                    image={e.event?.image_url || "https://picsum.photos/300"}
                    alt={e.event?.name}
                />
                <CardContent>

                  <Typography sx={{ fontWeight: "bold" }}>
                    {e.event?.name}
                  </Typography>

                  <Typography>
                    Pending: {
                      e.bookings.filter(
                        b => b.booking.status === 0
                      ).length
                    } 
                    </Typography>
                    <Typography>
                    Approved: {
                      e.bookings.filter(
                        b => b.booking.status === 1
                      ).length
                    }
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>


        {/* ---------- ALL EVENTS ---------- */}

        <Typography variant="h5" mt={4} fontWeight={"bold"}>
          All Events with Bookings
        </Typography>

        <Grid container spacing={2} mt={1}>

          {eventsList.map((e, i) => (

            <Grid item key={i}>

              <Card
                sx={{
                  width: 250,
                  height: 300, // Set a fixed height for all cards
                  cursor: "pointer",
                  background: "#232427",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between" // Ensure content is spaced evenly
                }}
                onClick={() => {
                  setSelectedEvent(e);
                  scrollToBookings();
                }}
              >
                <CardMedia
                    component="img"
                    height="160"
                    image={e.event?.image_url || "https://picsum.photos/300"}
                    alt={e.event?.name}
                />
        

                <CardContent>

                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                    {e.event?.name}
                  </Typography>

                  <Typography>
                    Total bookings: {e.bookings.length}
                  </Typography>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>


        {/* ---------- TABLE ---------- */}

        {selectedEvent && (
          <Box mt={4} id="bookings-section">
            <Typography variant="h5" fontWeight={"bold"}>
              Bookings for {selectedEvent.event?.name}
            </Typography>

            <Paper sx={{ background: "#232427", mt: 2 }}>

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell sx={{ color: "white" }}> Booking ID </TableCell>

                    <TableCell sx={{ color: "white" }}> User </TableCell>

                    <TableCell sx={{ color: "white" }}> Attendees </TableCell>

                    <TableCell sx={{ color: "white" }}> Status </TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {selectedEvent.bookings.map((b, i) => (

                    <TableRow
                      key={i}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => setSelectedBooking(b)}
                    >

                      <TableCell sx={{ color: "white" }}>
                        {b.booking.id}
                      </TableCell>

                      <TableCell sx={{ color: "white" }}>
                        {b.attendees[0]?.booked_by || "N/A"}
                      </TableCell>

                      <TableCell sx={{ color: "white" }}>
                        {b.booking.attendeeCount}
                      </TableCell>

                      <TableCell>

                        <Chip
                          label={
                            b.booking.status === 0
                              ? "Pending"
                              : "Approved"
                          }
                          color={statusColor(b.booking.status)}
                        />

                      </TableCell>

                    </TableRow>

                  ))}

                  {selectedBooking && (

  <Dialog
  open={Boolean(selectedBooking)}
  onClose={() => setSelectedBooking(null)}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    style: {
      backgroundColor: "#c7bbb4", // Change dialog background color
      color: "white" // Ensure text is visible
    }
  }}
>

    <DialogTitle color="black" fontWeight={"bold"}>
      Attendees for Booking {selectedBooking.booking.id}
    </DialogTitle>

    <DialogContent>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell fontWeight={"bold"}>Name</TableCell>
            <TableCell fontWeight={"bold"}>Email</TableCell>
            <TableCell fontWeight={"bold"}>Phone</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {selectedBooking.attendees.map((a, i) => (

            <TableRow key={i}>

              <TableCell>
                {a.name}
              </TableCell>

              <TableCell>
                {a.email}
              </TableCell>

              <TableCell>
                {a.phone}
              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

      <Button variant="contained"
        color="success"
        disabled={selectedBooking.booking.status === 1}
        sx={{ mt: 2}}
        onClick={() => approveBooking(selectedBooking.booking.id)}
      >
        Approve Booking
      </Button>

      <Button variant="contained"
        color="error"
        disabled={selectedBooking.booking.status === 0}
        sx={{ mt: 2, ml: 2, }}
        onClick={() => cancelBooking(selectedBooking.booking.id)}
      >
        Cancel Booking
      </Button>

    </DialogContent>

  </Dialog>

)}

                </TableBody>

              </Table>

            </Paper>

          </Box>

        )}

      </Box>

    </Box>

  );

}