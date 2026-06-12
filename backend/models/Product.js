const db = require("../database/db");

const Product = {
    getAll(callback) {
        db.all(
            "SELECT * FROM products ORDER BY id DESC",
            [],
            callback
        );
    },

    create(data, callback) {
        db.run(
            `
      INSERT INTO products
      (
        product_name,
        category,
        brand,
        quantity,
        purchase_price,
        selling_price
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
            [
                data.product_name,
                data.category,
                data.brand,
                data.quantity,
                data.purchase_price,
                data.selling_price
            ],
            callback
        );
    },

    update(id, data, callback) {
        db.run(
            `
      UPDATE products
      SET
      product_name=?,
      category=?,
      brand=?,
      quantity=?,
      purchase_price=?,
      selling_price=?
      WHERE id=?
      `,
            [
                data.product_name,
                data.category,
                data.brand,
                data.quantity,
                data.purchase_price,
                data.selling_price,
                id
            ],
            callback
        );
    },
    getByName(name, callback) {

        db.get(
            `
        SELECT *
        FROM products
        WHERE product_name=?
        `,
            [name],
            callback
        );

    },
    decreaseStock(id, qty, callback) {

        db.run(
            `
        UPDATE products
        SET quantity = quantity - ?
        WHERE id = ?
        `,
            [qty, id],
            callback
        );

    },
    delete(id, callback) {
        db.run(
            "DELETE FROM products WHERE id=?",
            [id],
            callback
        );
    },
    increaseStock(id, qty, callback) {

        db.run(
            `
        UPDATE products
        SET quantity = quantity + ?
        WHERE id = ?
        `,
            [qty, id],
            callback
        );
    
    },
};


module.exports = Product;