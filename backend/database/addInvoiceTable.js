const db = require("./db");

db.serialize(() => {

    db.run(`
        DROP TABLE IF EXISTS invoices
    `);

    db.run(`
        CREATE TABLE invoices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,

            invoice_no TEXT UNIQUE,

            customer_name TEXT NOT NULL,

            product_name TEXT NOT NULL,

            quantity INTEGER DEFAULT 1,

            total_amount REAL DEFAULT 0,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {

        if (err) {
            console.log(err.message);
            return;
        }

        console.log(
            "Invoice Table Recreated"
        );

    });

});