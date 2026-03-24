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


  const validateAttendees = () => {
    for (const attendee of attendees) {
      if (!attendee.name || !attendee.email || !attendee.phone) {
        return false;
      }
    }
    return true;
  };

  //BOOK EVENT FUNCTION
  const book = async () => {

    const user =  
      JSON.parse(localStorage.getItem("user"));

    if (attendees.length !== tickets) {
    toast.warning("Enter attendee details");
    return;
  }


    for (let i = 0; i < attendees.length; i++) 
    {

    if (
      !attendees[i].name ||
      !attendees[i].email ||
      !attendees[i].phone
    ) {
      toast.warning(
        `Please fill all details for Attendee ${i + 1}`
      );
      return;
    }
    if ( !attendees[i].phone || attendees[i].phone.length !== 10) 
      {
        toast.warning(`Phone must be 10 digits for Attendee ${i + 1}`);
        return;
      }
      const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(attendees[i].email)) {
    toast.warning(
      `Invalid email for Attendee ${i + 1}`
    );
    return;
  }

  }
    

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

            <Typography variant="h4" fontWeight={"bold"}>
              {event.name}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              {event.description}
            </Typography>

            <Typography variant="h5" mt={2}>
              ₹ {event.price}
            </Typography>

            <Typography variant="h5">
          {event.city} -{" "}
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
          }).format(new Date(event.event_date))}
        </Typography>

            <Typography variant="h5">

  {new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(
    new Date(`1970-01-01T${event.start_time}`)
  )}

  {" "}to{" "}

  {new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  }).format(
    new Date(`1970-01-01T${event.end_time}`)
  )}

</Typography>

 


            {/* tickets */}

            <Typography sx={{ mt: 5 }}>
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
                  required
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
  required
  type="email"
  fullWidth
  sx={{
    background: "white",
    mb: 1
  }}
  inputProps={{
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
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
  required
  fullWidth
  type="tel"
  sx={{
    background: "white"
  }}
  inputProps={{
    maxLength: 10,
    pattern: "[0-9]{10}"
  }}
  onChange={e =>
    changeAttendee(
      i,
      "phone",
      e.target.value.replace(/\D/g, "")
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