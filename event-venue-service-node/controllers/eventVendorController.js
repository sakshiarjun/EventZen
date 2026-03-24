const eventVendorModel = require("../models/eventVendorModel");

exports.addEventVendor = (req, res) => {

  eventVendorModel.addEventVendor(
    req.body,
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Event-Vendor association created",
        id: result.insertId
      });

    }
  );

};

exports.getVendorsByEventId = (req, res) => {
    eventVendorModel.getVendorsByEventId(req.params.eventId, (err, vendors) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching vendors for event.' });
        }
        res.json(vendors);
    });
};

exports.deleteEventVendor = (req, res) => {
    eventVendorModel.deleteEventVendor(req.params.id, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting event-vendor association.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event-Vendor association not found.' });
        }
        res.json({ message: 'Event-Vendor association deleted successfully.' });
    });
};

exports.updateEventVendor = (req, res) => {
    const id = req.params.id;
    const { service_type } = req.body;

    eventVendorModel.updateEventVendor(id, service_type, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating event-vendor association.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event-Vendor association not found.' });
        }
        res.json({ message: 'Event-Vendor association updated successfully.' });
    });
};

exports.getAllEventVendors = (req, res) => {
    eventVendorModel.getAllEventVendors((err, eventVendors) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching event-vendor associations.' });
        }
        res.json(eventVendors);
    });
};