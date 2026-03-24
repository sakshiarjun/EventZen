const db = require('../config/db');

exports.getAllEvents = (callback) => {

    const sql = `
    SELECT e.*, v.name as venue_name
    FROM events e
    LEFT JOIN venues v
    ON e.venue_id = v.id
    WHERE e.active = 1
    `;

    db.query(sql, callback);
};

exports.createEvent = (data, callback) => {

    const sql =
        `INSERT INTO events
        (name, description, city, category,
         venue_id, venue_name,
         event_date, start_time, end_time,
         price, image_url, organizer,
         status, active,
         created_by_role, created_by_name)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(
        sql,
        [
            data.name,
            data.description,
            data.city,
            data.category,
            data.venue_id,
            data.venue_name,
            data.event_date,
            data.start_time,
            data.end_time,
            data.price,
            data.image_url || null,
            data.organizer,
            data.status,
            1,
            data.created_by_role,
            data.created_by_name
        ],
        callback
    );
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

exports.getEventById = (id, callback) => {

    const sql = `
    SELECT e.*, v.name as venue_name
    FROM events e
    LEFT JOIN venues v
    ON e.venue_id = v.id
    WHERE e.id = ? AND e.active = 1
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
    });
};

exports.updateEvent = (id, data, callback) => {

    const sql =
        `UPDATE events
         SET status=?
         WHERE id=?`;

    db.query(
        sql,
        [
            data.status,
            id
        ],
        callback
    );
};