const db = require('../config/db');

exports.getAllVenues = (callback) => {
    const query = 'SELECT * FROM venues WHERE active=1';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

exports.createVenue = (venueData, callback) => {
    const query = 'INSERT INTO venues (name, city, capacity, price, status, active) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [venueData.name, venueData.city, venueData.capacity, venueData.price, 1,1];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

exports.deleteVenue = (id, callback) => {
    const query = 'UPDATE venues SET active=0 WHERE id=?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};