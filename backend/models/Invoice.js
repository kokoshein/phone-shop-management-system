const db = require("../database/db");

const Invoice = {

    getAll(callback) {

        db.all(
            `
            SELECT *
            FROM invoices
            ORDER BY id DESC
            `,
            [],
            callback
        );

    },

    create(data, callback) {

        db.run(
            `
            INSERT INTO invoices
            (
                invoice_no,
                customer_name,
                product_name,
                quantity,
                total_amount
            )
            VALUES (?, ?, ?, ?, ?)
            `,
            [
                data.invoice_no,
                data.customer_name,
                data.product_name,
                data.quantity,
                data.total_amount
            ],
            callback
        );

    }

};

module.exports = Invoice;