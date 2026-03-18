import { useEffect, useState } from "react";
import { node } from "../services/api";
import { useNavigate } from "react-router-dom";

import MuiNavbar from "../components/MuiNavbar";

import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      nav("/login");
    }
  }, [nav]);

  useEffect(() => {
    node.get("/events")
      .then(res => setEvents(res.data));
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}