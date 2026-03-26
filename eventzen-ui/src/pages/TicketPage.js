import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";

export default function TicketPage() {

  const { bookingId, index } = useParams();

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
          minWidth: 300
        }}
      >

        <Typography variant="h4" fontWeight="bold">
          Event Ticket
        </Typography>

        <Typography mt={2}>
          Booking ID: {bookingId}
        </Typography>

        <Typography>
          Ticket #: {index}
        </Typography>

      </Paper>

    </Box>

  );
}