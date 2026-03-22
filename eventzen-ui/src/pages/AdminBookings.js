import { useEffect, useState } from "react";
import { spring } from "../services/api";

import {
  Box, Typography, Table, TableHead,
  TableRow, TableCell, TableBody,
  Paper, Button
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  const load = () => {
    spring.get("/bookings").then(res => {
      setBookings(res.data);
    });
  };

  useEffect(load, []);


  const approve = async (id) => {

    await spring.put("/bookings/" + id, {
      status: 1
    });

    load();
  };


  return (

    <Box sx={{ minHeight: "100vh", background: "black", color: "white" }}>

      <Stars />
      <DashboardNavbar />

      <Box sx={{ pt: 12, px: 3 }}>

        <Typography variant="h4">
          Manage Bookings
        </Typography>

        <Paper sx={{ background: "#232427" }}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "white" }}>ID</TableCell>
                <TableCell sx={{ color: "white" }}>User</TableCell>
                <TableCell sx={{ color: "white" }}>Event</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {bookings.map((b, i) => (

                <TableRow key={i}>

                  <TableCell sx={{ color: "white" }}>
                    {b.booking.id}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {b.booking.userId}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {b.event?.name}
                  </TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      onClick={() =>
                        approve(b.booking.id)
                      }
                    >
                      Approve
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>

      </Box>

    </Box>

  );

}