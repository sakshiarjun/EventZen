import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function EventRow({ title, events }) {

  const nav = useNavigate();

  return (

    <Box sx={{ mb: 5 }}>

      <Typography
        variant="h4"
        sx={{ mt: 4, mb: 2 }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1
        }}
      >

        {events.map(e => (

          <Card
            key={e.id}
            sx={{
              minWidth: 300,
              backdropFilter: "blur(10px)",
              background:
                "rgba(255,255,255,0.1)",
              border:
                "1px solid rgba(255,255,255,0.3)",
              color: "white",
              cursor: "pointer",
              height: 300
            }}
            onClick={() =>
              nav("/event/" + e.id)
            }
          >

            <CardMedia
              component="img"
              height="200"
              image={
                e.image_url ||
                "https://picsum.photos/300"
              }
            />

            <CardContent>

              <Typography>
                {e.name}
              </Typography>

            </CardContent>

          </Card>

        ))}

      </Box>

    </Box>

  );
}