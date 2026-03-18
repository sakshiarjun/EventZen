const express = require("express");
const router = express.Router();
const controller = require("../controllers/venueController");

router.get("/", controller.getAllVenues);
router.post("/", controller.createVenue);
router.delete("/:id", controller.deleteVenue);

module.exports = router;