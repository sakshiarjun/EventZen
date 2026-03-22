import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

export default function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <DashboardNavbar />

      <Box
        sx={{
          background: "#0b0f19",
          minHeight: "100vh",
          color: "white",
          p: 4,
        }}
      >

        {/* Welcome */}
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome User,
        </Typography>

        <Typography color="gray" mb={4}>
          Manage your events with ease.
        </Typography>


        {/* TOP CARDS */}
        <Grid container spacing={3}>

          {/* CREATE EVENT */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "#111827",
                borderRadius: 3,
                p: 2,
                height: "100%",
              }}
            >
              <CardContent>

                <Typography variant="h5" fontWeight="bold">
                  Create Your Own Event
                </Typography>

                <Typography color="gray" mb={3}>
                  Plan and organize your own event easily.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => navigate("/create-event")}
                  sx={{
                    background: "#ff6a00",
                    fontWeight: "bold",
                  }}
                >
                  Create Event
                </Button>

              </CardContent>
            </Card>
          </Grid>


          {/* BOOK EVENTS */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "#111827",
                borderRadius: 3,
                p: 2,
                height: "100%",
              }}
            >
              <CardContent>

                <Typography variant="h5" fontWeight="bold">
                  Book Public Events
                </Typography>

                <Typography color="gray" mb={3}>
                  Find and book upcoming public events.
                </Typography>

                <Button
                  variant="contained"
                  onClick={() => navigate("/events")}
                  sx={{
                    background: "#ff6a00",
                    fontWeight: "bold",
                  }}
                >
                  Browse Events
                </Button>

              </CardContent>
            </Card>
          </Grid>

        </Grid>



        {/* MY BOOKINGS CARD */}
        <Box mt={4}>

          <Card
            sx={{
              background: "#111827",
              borderRadius: 3,
              p: 2,
            }}
          >
            <CardContent>

              <Typography variant="h5" fontWeight="bold">
                My Bookings
              </Typography>

              <Typography color="gray" mb={2}>
                View events you have booked
              </Typography>

              <Button
                variant="contained"
                onClick={() => navigate("/my-bookings")}
                sx={{
                  background: "#ff6a00",
                  fontWeight: "bold",
                }}
              >
                View Bookings
              </Button>

            </CardContent>
          </Card>

        </Box>

      </Box>
    </>
  );
}