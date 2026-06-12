const Repair = require("../models/Repair");

exports.getRepairs = (req, res) => {
    Repair.getAll((err, rows) => {
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

exports.createRepair = (req, res) => {
    Repair.create(req.body, function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Repair Added"
        });
    });
};
exports.updateRepairStatus = (req, res) => {

    const { status } = req.body;

    Repair.updateStatus(
        req.params.id,
        status,
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Repair Status Updated"
            });

        }
    );
};

exports.deleteRepair = (req, res) => {

    Repair.delete(
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
                message: "Repair Deleted"
            });

        }
    );
};