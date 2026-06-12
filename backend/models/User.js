const db = require("../database/db");

const User = {
    create(data, callback) {
        db.run(
            `
      INSERT INTO users
      (
        full_name,
        username,
        password,
        role
      )
      VALUES
      (?, ?, ?, ?)
      `,
            [
                data.full_name,
                data.username,
                data.password,
                data.role
            ],
            callback
        );
    },

    findByUsername(username, callback) {
        db.get(
            `
      SELECT *
      FROM users
      WHERE username = ?
      `,
            [username],
            callback
        );
    }
};

module.exports = User;