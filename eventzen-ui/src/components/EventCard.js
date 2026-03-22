import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {

  const nav = useNavigate();

  const openEvent = () => {
    console.log("clicked", event.id); // debug
    nav("/event/" + event.id);
  };

  return (

    <Card
      onClick={openEvent}
      sx={{
        cursor: "pointer",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.3)",
        borderRadius: 2,
        height: 320,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.04)"
        }
      }}
    >

      <CardMedia
        component="img"
        height="160"
        image={event.image_url || "https://picsum.photos/300"}
        alt={event.name}
      />

      <CardContent>

        <Typography sx={{ color: "white" }}>
          {event.name}
        </Typography>

        <Typography sx={{ color: "white" }}>
          {event.city}
        </Typography>

        <Typography sx={{ color: "white" }}>
          ₹ {event.price}
        </Typography>

      </CardContent>

    </Card>
  );
}