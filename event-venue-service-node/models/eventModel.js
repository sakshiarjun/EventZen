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
         venue_id, event_date, start_time, end_time,
         price, image_url, organizer,
         status, active)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

    db.query(
        sql,
        [
            data.name,
            data.description,
            data.city,
            data.category,
            data.venue_id,
            data.event_date,
            data.start_time,
            data.end_time,
            data.price,
            data.image_url,
            data.organizer,
            1,
            1
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