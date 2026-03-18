const venueModel = require('../models/venueModel');

exports.getAllVenues = (req, res) => {
    venueModel.getAllVenues((err, venues) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching venues.' });
        }
        res.json(venues);
    });
};

exports.createVenue = (req, res) => {
    const venueData = req.body;
    venueModel.createVenue(venueData, (err, venueId) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating venue.' });
        }
        res.status(201).json({ id: venueId });
    });
};

exports.deleteVenue = (req, res) => {
    const venueId = req.params.id;
    venueModel.deleteVenue(venueId, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting venue.' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Venue not found.' });
        }
        res.json({ message: 'Venue deleted successfully.' });
    });
};