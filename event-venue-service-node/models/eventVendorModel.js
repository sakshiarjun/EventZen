const db = require("../config/db");

exports.addEventVendor = (data, callback) => {

  const { event_id, vendor_id, service_type } = data;

  const sql =
    "INSERT INTO event_vendors (event_id, vendor_id, service_type) VALUES (?,?,?)";

  db.query(
    sql,
    [event_id, vendor_id, service_type],
    callback
  );

};

exports.getVendorsByEventId = (eventId, callback) => {

  const sql = `
    SELECT ev.*, v.name AS vendor_name
    FROM event_vendors ev
    JOIN vendors v ON ev.vendor_id = v.id
    WHERE ev.event_id = ?
  `;

  db.query(sql, [eventId], callback);

};

exports.deleteEventVendor = (id, callback) => {

  const sql = "DELETE FROM event_vendors WHERE id=?";

  db.query(sql, [id], callback);

};

exports.updateEventVendor = (id, service_type, callback) => {

  const sql =
    "UPDATE event_vendors SET service_type=? WHERE id=?";

  db.query(
    sql,
    [service_type, id],
    (err, result) => {

      if (err)
        return callback(err);

      callback(null, result);   
});
};

exports.getAllEventVendors = (callback) => {

  const sql = `
    SELECT ev.*, v.name as vendor_name, v.contact_info
    FROM event_vendors ev
    JOIN vendors v ON ev.vendor_id = v.id
  `;

  db.query(sql, callback);

};