const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');

router.get('/', controller.getAllEvents);
router.get("/:id", controller.getEventById);
router.post('/', controller.createEvent);
router.delete('/:id', controller.deleteEvent);
router.put("/:id", controller.updateEvent);

module.exports = router;