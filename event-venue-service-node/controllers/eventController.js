const eventModel = require('../models/eventModel');

exports.getAllEvents = (req, res) => {
    eventModel.getAllEvents((err, events) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching events.' });
        }
        res.json(events);
    });
};

exports.createEvent = (req, res) => {
    const eventData = req.body;
    eventModel.createEvent(eventData, (err, eventId) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating event.' });
        }
        res.status(201).json({ id: eventId });
    });
};

exports.deleteEvent = (req, res) => {
    const eventId = req.params.id;
    eventModel.deleteEvent(eventId, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting event.' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json({ message: 'Event deleted successfully.' });
    });
};