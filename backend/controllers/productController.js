const Product = require("../models/Product");
const db = require("../database/db");
exports.getProducts = (req, res) => {
    Product.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            data: rows
        });
    });
};

exports.createProduct = (req, res) => {
    Product.create(req.body, function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Product created"
        });
    });
};

exports.updateProduct = (req, res) => {
    Product.update(
        req.params.id,
        req.body,
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Product updated"
            });
        }
    );
};

exports.deleteProduct = (req, res) => {
    Product.delete(
        req.params.id,
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Product deleted"
            });
        }
    );
};
exports.getLowStock = (req, res) => {

    db.all(
        `
        SELECT *
        FROM products
        WHERE quantity <= 3
        ORDER BY quantity ASC
        `,
        [],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                data: rows
            });

        }
    );

};
exports.restockProduct = (req, res) => {

    const { quantity } = req.body;

    Product.increaseStock(
        req.params.id,
        quantity,
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Stock updated"
            });

        }
    );

};