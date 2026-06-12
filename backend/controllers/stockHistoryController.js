const StockHistory =
    require("../models/StockHistory");

exports.getHistory = (req, res) => {

    StockHistory.getAll(
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