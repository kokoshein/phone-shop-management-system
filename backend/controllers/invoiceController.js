const Invoice =
    require("../models/Invoice");

exports.getInvoices =
    (req, res) => {

        Invoice.getAll(
            (err, rows) => {

                if (err) {

                    return res
                        .status(500)
                        .json({
                            success: false,
                            message:
                                err.message
                        });

                }

                res.json({
                    success: true,
                    data: rows
                });

            }
        );

    };

exports.createInvoice =
    (req, res) => {

        Invoice.create(
            req.body,
            function (err) {

                if (err) {

                    return res
                        .status(500)
                        .json({
                            success: false,
                            message:
                                err.message
                        });

                }

                res.status(201)
                    .json({
                        success: true,
                        message:
                            "Invoice Created"
                    });

            }
        );

    };