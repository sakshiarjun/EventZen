const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventController');

router.get('/', controller.getAllEvents);
router.post('/', controller.createEvent);
router.delete('/:id', controller.deleteEvent);

module.exports = router;