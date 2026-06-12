const db = require("./db");

db.run(`
CREATE TABLE IF NOT EXISTS stock_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    product_name TEXT,
    action_type TEXT,
    quantity INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`, (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("stock_history table created");
    }

    process.exit();
});