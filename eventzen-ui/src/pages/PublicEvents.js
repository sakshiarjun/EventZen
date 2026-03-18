import { useEffect, useState } from "react";
import { node } from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia
} from "@mui/material";

export default function PublicEvents() {

  const [events, setEvents] = useState([]);

  const nav = useNavigate();

  useEffect(() => {

    node.get("/events")
      .then(res => setEvents(res.data));

  }, []);

  return (

    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" gutterBottom>
        Events
      </Typography>

      <Grid container spacing={2}>

        {events.map(e => (

          <Grid item xs={12} md={4} key={e.id}>

            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => nav("/event/" + e.id)}
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

                <Typography variant="h6">
                  {e.name}
                </Typography>

                <Typography>
                  {e.city}
                </Typography>

                <Typography>
                  ₹ {e.price}
                </Typography>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Container>

  );
}