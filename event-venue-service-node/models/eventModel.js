const db = require('../config/db');

exports.getAllEvents = (callback) => {
    const query = 'SELECT * FROM events WHERE active=1';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

exports.createEvent = (eventData, callback) => {
    const query = 'INSERT INTO events (name, description, event_date, status, active) VALUES (?, ?, ?, ?, ?)';
    const values = [eventData.name, eventData.description, eventData.event_date, 1,1];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

exports.deleteEvent = (id, callback) => {
    const query = 'UPDATE events SET active=0 WHERE id=?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.affectedRows);
    });
};