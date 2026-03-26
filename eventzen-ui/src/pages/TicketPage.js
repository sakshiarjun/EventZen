import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { spring } from "../services/api";

export default function TicketPage() {

  const { bookingId, index } = useParams();

  const [event, setEvent] = useState(null);
  const [attendee, setAttendee] = useState(null);

  useEffect(() => {

    spring.get("/bookings").then(res => {

      const b = res.data.find(
        x => x.booking.id === Number(bookingId)
      );

      if (!b) return;

      setEvent(b.event);

      setAttendee(
        b.attendees[Number(index)]
      );

    });

  }, [bookingId, index]);


  if (!event || !attendee) {

    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        Loading...
      </Box>
    );
  }


  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <Paper
        sx={{
          p: 4,
          background: "#232427",
          color: "white",
          minWidth: 350
        }}
      >

        <Typography variant="h4" fontWeight="bold">
          {event.name}
        </Typography>

        <Typography mt={1}>
          {event.city}
        </Typography>

        <Typography>
          {new Date(event.event_date).toDateString()}
        </Typography>

        <Typography>

          {event.start_time} - {event.end_time}

        </Typography>

        <Typography mt={2} fontWeight="bold">
          Attendee:
        </Typography>

        <Typography>
          {attendee.name}
        </Typography>

      </Paper>

    </Box>

  );

}