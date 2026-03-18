import Slider from "react-slick";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function FeaturedSlider() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false
  };

  const events = [
    { name: "Music Fest" },
    { name: "Tech Expo" },
    { name: "Comedy Show" },
    { name: "Workshop" },
    { name: "Festival" }
  ];
}