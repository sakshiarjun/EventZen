import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { spring } from "../services/api";

export default function TicketCard() {

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          background: "#f0f0f0",
          borderRadius: 2,
          boxShadow: 1
        }}
      >
        Loading...
      </Box>
    );
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${suffix}`;
  };

  return (

    <Paper
      sx={{
        p: 4,
        background: "#777268",
        color: "white",
        minWidth: 350,
        borderRadius: 2,
        boxShadow: 3
      }}
    >

      <Typography variant="h4" fontWeight="bold">
        {event.name}
      </Typography>

      <img src={event.image_url} alt={event.name} 
        style={{ width: "100%", borderRadius: 8, marginTop: 16 }} />

      <Typography mt={1}>
        {event.city}
      </Typography>

      <Typography>
        {new Date(event.event_date).toDateString()}
      </Typography>

      <Typography>
        {formatTime(event.start_time)} - {formatTime(event.end_time)}
      </Typography>

      <Typography mt={2} fontWeight="bold">
        Attendee: {attendee.name}
      </Typography>

    </Paper>

  );

}