        {/* RIGHT CONTENT */}

        <Box
  sx={{
    flex: 1,
    background: "#232427",
    p: 3,
    borderRadius: 2
  }}
>
  <Typography variant="h4" fontWeight={"bold"}>
            Welcome Admin
  </Typography>
  <Typography variant="h4" fontWeight="bold" mb={3}>
    Analytics
  </Typography>

  <Grid container spacing={2}>

    <Grid item xs={3}>
      <Card sx={{ background: "#444", color: "white" }}>
        <CardContent>
          <Typography>Total Events</Typography>
          <Typography variant="h5">
            {totalEvents}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={3}>
      <Card sx={{ background: "#444", color: "white" }}>
        <CardContent>
          <Typography>Total Bookings</Typography>
          <Typography variant="h5">
            {totalBookings}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={3}>
      <Card sx={{ background: "#444", color: "white" }}>
        <CardContent>
          <Typography>Total Venues</Typography>
          <Typography variant="h5">
            {totalVenues}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={3}>
      <Card sx={{ background: "#444", color: "white" }}>
        <CardContent>
          <Typography>Total Vendors</Typography>
          <Typography variant="h5">
            {totalVendors}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={4}>
      <Card sx={{ background: "#444", color: "white" }}>
        <CardContent>
          <Typography>Total Attendees</Typography>
          <Typography variant="h5">
            {totalAttendees}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={4}>
      <Card sx={{ background: "#444", color: "white" }}>
        <CardContent>
          <Typography>Total Revenue</Typography>
          <Typography variant="h5">
            ₹ {totalRevenue}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

  

  </Grid>

        </Box>