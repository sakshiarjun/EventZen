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

    console.log("Create event:", eventData);

    eventModel.createEvent(eventData, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error creating event"
            });
        }

        res.status(201).json({
            message: "Event created",
            id: result.insertId
        });

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

exports.getEventById = (req, res) => {
    const eventId = req.params.id;

    eventModel.getEventById(eventId, (err, event) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching event.' });
        }
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.json(event);
    });

};

exports.updateEvent = (req, res) => {

  const id = req.params.id;
  const { status } = req.body;

  const sql =
    "UPDATE events SET status=? WHERE id=?";

  db.query(
    sql,
    [status, id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Event updated"
      });

    }
  );
};