const db = require("../database/db");

const Sale = {

    getAll(callback) {

        db.all(
            "SELECT * FROM sales ORDER BY id DESC",
            [],
            callback
        );

    },

    create(data, callback) {

        db.run(
            `
            INSERT INTO sales
(
    customer_name,
    product_name,
    quantity,
    unit_price,
    total_amount,
    cost_price,
    profit
)
VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                data.customer_name,
                data.product_name,
                data.quantity,
                data.unit_price,
                data.total_amount,
                data.cost_price,
                data.profit
            ],
            callback
        );

    }

};


module.exports = Sale;