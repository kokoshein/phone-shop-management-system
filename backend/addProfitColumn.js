const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./phone_shop.db");

db.run(
    "ALTER TABLE sales ADD COLUMN cost_price REAL DEFAULT 0",
    (err) => {
        console.log(err ? err.message : "cost_price added");
    }
);

db.run(
    "ALTER TABLE sales ADD COLUMN profit REAL DEFAULT 0",
    (err) => {
        console.log(err ? err.message : "profit added");
    }
);

db.close();