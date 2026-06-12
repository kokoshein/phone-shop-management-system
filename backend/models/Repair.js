const db = require("../database/db");

const Repair = {
    getAll(callback) {
        db.all(
            "SELECT * FROM repairs ORDER BY id DESC",
            [],
            callback
        );
    },

    create(data, callback) {
        db.run(
            `
            INSERT INTO repairs
            (
                customer_name,
                phone_model,
                imei,
                issue,
                repair_cost,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                data.customer_name,
                data.phone_model,
                data.imei,
                data.issue,
                data.repair_cost,
                data.status || "Pending"
            ],
            callback
        );
    },

    updateStatus(id, status, callback) {
        db.run(
            `
        UPDATE repairs
        SET status=?
        WHERE id=?
        `,
            [status, id],
            callback
        );
    },

    delete(id, callback) {
        db.run(
            "DELETE FROM repairs WHERE id=?",
            [id],
            callback
        );
    },
    
    }



module.exports = Repair;