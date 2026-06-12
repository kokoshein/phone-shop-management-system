const db = require("../database/db");

const Customer = {
    getAll(callback) {
        db.all(
            "SELECT * FROM customers ORDER BY id DESC",
            [],
            callback
        );
    },

    getById(id, callback) {
        db.get(
            "SELECT * FROM customers WHERE id = ?",
            [id],
            callback
        );
    },

    create(data, callback) {
        db.run(
            `
      INSERT INTO customers
      (name, phone, email, address)
      VALUES (?, ?, ?, ?)
      `,
            [
                data.name,
                data.phone,
                data.email,
                data.address
            ],
            callback
        );
    },

    update(id, data, callback) {
        db.run(
            `
      UPDATE customers
      SET
      name=?,
      phone=?,
      email=?,
      address=?
      WHERE id=?
      `,
            [
                data.name,
                data.phone,
                data.email,
                data.address,
                id
            ],
            callback
        );
    },

    delete(id, callback) {
        db.run(
            "DELETE FROM customers WHERE id=?",
            [id],
            callback
        );
    }
};

module.exports = Customer;