require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");

const eventRoutes = require("./routes/eventRoutes");
const venueRoutes = require("./routes/venueRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/events", eventRoutes);
app.use("/api/venues", venueRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});