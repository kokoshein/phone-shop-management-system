const db = require("../database/db");

const StockHistory = {

    create(data, callback) {

        db.run(
            `
            INSERT INTO stock_history
            (
                product_id,
                product_name,
                action_type,
                quantity
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                data.product_id,
                data.product_name,
                data.action_type,
                data.quantity
            ],
            callback
        );

    },

    getAll(callback) {

        db.all(
            `
            SELECT *
            FROM stock_history
            ORDER BY id DESC
            `,
            [],
            callback
        );

    }

};

module.exports = StockHistory;