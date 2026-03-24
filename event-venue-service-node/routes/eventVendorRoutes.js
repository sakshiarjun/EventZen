const express = require("express");
const router = express.Router();
const controller = require("../controllers/eventVendorController");

router.post("/", controller.addEventVendor);
router.get("/event/:eventId", controller.getVendorsByEventId);
router.delete("/:id", controller.deleteEventVendor);
router.put("/:id", controller.updateEventVendor);
router.get("/", controller.getAllEventVendors);


module.exports = router;