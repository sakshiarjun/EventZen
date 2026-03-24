const venueModel = require('../models/venueModel');

exports.getAllVenues = (req, res) => {
    venueModel.getAllVenues((err, venues) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching venues.' });
        }
        res.json(venues);
    });
};

exports.getVenueById = (req, res) => {
    const venueId = req.params.id;

    venueModel.getVenueById(venueId, (err, venue) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching venue.' });
        }
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found.' });
        }
        res.json(venue);
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
exports.getVenues = (req, res) => {
    venueModel.getVenues((err, venues) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching venues.' });
        }
        res.json(venues);
    });
};
exports.getVenuesByCity = (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ message: 'City query parameter is required.' });
    }

    venueModel.getVenuesByCity(city, (err, venues) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching venues by city.' });
        }
        res.json(venues);
    });
};

exports.updateVenue = (req, res) => {

  const venueId = req.params.id;

  const {
    name,
    city,
    capacity,
    price,
    status
  } = req.body;

  venueModel.updateVenue(
    venueId,
    name,
    city,
    capacity,
    price,
    status,
    (err, affectedRows) => {

      if (err) {
        return res
          .status(500)
          .json({ message: "Error updating venue" });
      }

      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Venue not found" });
      }

      res.json({
        message: "Venue updated"
      });

    }
  );
};