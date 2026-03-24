import { useEffect, useState } from "react";
import { node } from "../services/api";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function MyEvents() {

  const [events, setEvents] = useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const load = () => {

    node.get("/events")
      .then(res => {

        const myEvents =
          res.data.filter(
            e =>
              e.created_by_name ===
              user.name
          );

        setEvents(myEvents);

      });

  };

  useEffect(load, []);


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
        color: "white"
      }}
    >

      <Stars />

      <DashboardNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
        >
          My Events
        </Typography>


        <Grid container spacing={2}>

          {events.map(e => (

            <Grid item key={e.id}>

              <Card
                sx={{
                  width: 260,
                  background: "#232427",
                  color: "white"
                }}
              >

                <CardMedia
                  component="img"
                  height="160"
                  image={
                    e.image_url ||
                    "https://picsum.photos/300"
                  }
                />

                <CardContent>

                  <Typography
                    fontWeight="bold"
                  >
                    {e.name}
                  </Typography>

                  <Typography>
                    {e.city}
                  </Typography>

                  <Typography>
                    ₹ {e.price}
                  </Typography>

                  <Typography>
                            {new Intl.DateTimeFormat("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            }).format(new Date(e.event_date))}
                    </Typography>
                  
                    <Typography>
                  
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    }).format(
                      new Date(`1970-01-01T${e.start_time}`)
                    )}
                  
                    {" "}to{" "}
                  
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    }).format(
                      new Date(`1970-01-01T${e.end_time}`)
                    )}
                  
                  </Typography>

                  <Chip
                    sx={{ mt: 1 }}
                    label={
                      e.status === 1
                        ? "Approved"
                        : "Pending"
                    }
                    color={
                      statusColor(
                        e.status
                      )
                    }
                  />

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Box>

    </Box>

  );

}