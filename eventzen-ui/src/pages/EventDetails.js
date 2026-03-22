import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { node, spring } from "../services/api";
import {toast } from "react-toastify";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  TextField
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function EventDetails() {

  const { id } = useParams();
  const nav = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [attendees, setAttendees] = useState([]);

  // fetch event
  useEffect(() => {

    node.get("/events/" + id)
      .then(res => setEvent(res.data));

  }, [id]);


  // generate attendees
  useEffect(() => {

    const arr = [];

    for (let i = 0; i < tickets; i++) {

      arr.push({
        name: "",
        email: "",
        phone: ""
      });

    }

    setAttendees(arr);

  }, [tickets]);


  const changeAttendee = (i, field, value) => {

    const copy = [...attendees];

    copy[i][field] = value;

    setAttendees(copy);

  };


  const book = async () => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login to book");
      nav("/login");
      return;
    }

    await spring.post("/bookings", {

      userId: user.id,
      userName: user.name,
      eventId: event.id,
      eventName: event.name,
      attendeeCount: tickets,
      attendees

    });

    toast.success("Your booking will be confirmed shortly!");
    

  };


  if (!event) return null;


  return (

    <Box
      sx={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        position: "relative"
      }}
    >

      <Stars />
      <Stars />
      <DashboardNavbar />

      <Box
        sx={{
          pt: 12,
          px: 3,
          display: "flex",
          justifyContent: "center"
        }}
      >

        <Card
          sx={{
            maxWidth: 800,
            width: "100%",
            background: "#232427",
            color: "white"
          }}
        >

          <CardMedia
            component="img"
            height="300"
            image={
              event.image_url ||
              "https://picsum.photos/600"
            }
          />

          <CardContent>

            <Typography variant="h4">
              {event.name}
            </Typography>

            <Typography>
              {event.city}
            </Typography>

            <Typography>
              ₹ {event.price}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {event.description}
            </Typography>


            {/* tickets */}

            <Typography sx={{ mt: 3 }}>
              Number of Tickets
            </Typography>

            <TextField
              type="number"
              value={tickets}
              onChange={(e) =>
                setTickets(Number(e.target.value))
              }
              sx={{
                background: "white",
                borderRadius: 1,
                mt: 1
              }}
            />


            {/* attendees */}

            {attendees.map((a, i) => (

              <Box key={i} sx={{ mt: 2 }}>

                <Typography sx={{ mt: 3 }}>
                  Details for Attendee {i + 1}
                </Typography>

                <TextField
                  placeholder="Name"
                  fullWidth
                  sx={{
                    background: "white",
                    mb: 1
                  }}
                  onChange={e =>
                    changeAttendee(
                      i,
                      "name",
                      e.target.value
                    )
                  }
                />

                <TextField
                  placeholder="Email"
                  fullWidth
                  sx={{
                    background: "white",
                    mb: 1
                  }}
                  onChange={e =>
                    changeAttendee(
                      i,
                      "email",
                      e.target.value
                    )
                  }
                />

                <TextField
                  placeholder="Phone"
                  fullWidth
                  sx={{
                    background: "white"
                  }}
                  onChange={e =>
                    changeAttendee(
                      i,
                      "phone",
                      e.target.value
                    )
                  }
                />

              </Box>

            ))}


            <Button
              variant="contained"
              sx={{
                mt: 3,
                background: "#ff6a00"
              }}
              onClick={book}
            >
              Book Event
            </Button>

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

}