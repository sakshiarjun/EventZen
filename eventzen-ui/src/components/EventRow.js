import { Box, Typography } from "@mui/material";
import EventCard from "./EventCard";

export default function EventRow({ title, events }) {

  return (

    <Box sx={{ mb: 5 }}>

      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 2 }}
        fontWeight="bold"
      >
        {title}
      </Typography>

      <Box sx={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap", gap: 3, pb: 2 }}>
        {events.map((e) => (
          <Box key={e.id} sx={{ flex: "0 0 auto" }}>
            <EventCard event={e} />
          </Box>
        ))}
      </Box>

    </Box>

  );

}