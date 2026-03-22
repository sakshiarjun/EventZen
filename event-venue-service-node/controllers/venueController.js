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

  const id = req.params.id;
  const { status } = req.body;

  const sql =
    "UPDATE venues SET status=? WHERE id=?";

  db.query(
    sql,
    [status, id],
    (err, result) => {

      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Venue updated"
      });

    }
  );
};