import { Box, Typography, Grid } from "@mui/material";
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

      <Grid container spacing={3}>

        {events.map((e) => (
          <Grid item xs={12} sm={6} md={4} key={e.id}>
            <EventCard event={e} />
          </Grid>
        ))}

      </Grid>

    </Box>

  );

}