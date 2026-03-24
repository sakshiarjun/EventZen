const express = require("express");
const router = express.Router();
const controller = require("../controllers/venueController");
const db = require("../config/db");

router.get("/", controller.getVenues);
router.get("/by-city", controller.getVenuesByCity);
router.get("/:id", controller.getVenueById);
router.post("/", controller.createVenue);
router.delete("/:id", controller.deleteVenue);
router.put("/:id", controller.updateVenue);

module.exports = router;