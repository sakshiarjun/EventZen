import { useEffect, useState } from "react";
import { node } from "../services/api";

import {
  Box, Typography, Table, TableHead,
  TableRow, TableCell, TableBody,
  Paper, Button
} from "@mui/material";

import Stars from "../components/Stars";
import DashboardNavbar from "../components/DashboardNavbar";

export default function AdminVenues() {

  const [venues, setVenues] = useState([]);

  const load = () => {
    node.get("/vendors").then(res => {
      setVenues(res.data);
    });
  };

  useEffect(load, []);


  const approve = async (id) => {

    await node.put("/vendors/" + id, {
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
          Manage Vendors
        </Typography>

        <Paper sx={{ background: "#232427" }}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "white" }}>Name</TableCell>
                <TableCell sx={{ color: "white" }}>City</TableCell>
                <TableCell sx={{ color: "white" }}>Action</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {venues.map(v => (

                <TableRow key={v.id}>

                  <TableCell sx={{ color: "white" }}>
                    {v.name}
                  </TableCell>

                  <TableCell sx={{ color: "white" }}>
                    {v.city}
                  </TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      onClick={() => approve(v.id)}
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