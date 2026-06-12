const fs = require("fs");
const path = require("path");
require("dotenv").config();

const db = require("./db");

const schemaPath = path.join(__dirname, "schema.sql");

const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    console.log("Database Initialized Successfully");
    process.exit(0);
});