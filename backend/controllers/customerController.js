const Customer = require("../models/Customer");

exports.getCustomers = (req, res) => {
    Customer.getAll((err, rows) => {
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

exports.createCustomer = (req, res) => {
    Customer.create(req.body, function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Customer created"
        });
    });
};

exports.updateCustomer = (req, res) => {
    Customer.update(
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
                message: "Customer updated"
            });
        }
    );
};

exports.deleteCustomer = (req, res) => {
    Customer.delete(
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
                message: "Customer deleted"
            });
        }
    );
};