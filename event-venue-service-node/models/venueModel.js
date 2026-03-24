const db = require('../config/db');

exports.getVenues = (callback) => {
    const query = 'SELECT * FROM venues WHERE active=1';
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

exports.getVenueById = (id, callback) => {
    const query = 'SELECT * FROM venues WHERE id=? AND active=1';
    db.query(query, [id], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results[0]);
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

exports.getVenuesByCity = (city, callback) => {
    const query = 'SELECT * FROM venues WHERE city = ? AND active=1';
    db.query(query, [city], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

exports.updateVenue = (
  id,
  name,
  city,
  capacity,
  price,
  status,
  callback
) => {

  const sql =
    `UPDATE venues
     SET name=?, city=?, capacity=?, price=?, status=?
     WHERE id=?`;

  db.query(
    sql,
    [name, city, capacity, price, status, id],
    (err, result) => {

      if (err) return callback(err);

      callback(null, result.affectedRows);
    }
  );
};