const Sale = require("../models/Sale");
const Product =
    require("../models/Product");
const Invoice =
    require("../models/Invoice");
const StockHistory =
    require("../models/StockHistory");
exports.getSales = (req, res) => {

    Sale.getAll((err, rows) => {

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

exports.createSale = (req, res) => {
    console.log(
        "Searching Product:",
        req.body.product_name
    );
    Product.getByName(
        req.body.product_name,
        (err, product) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }
            if (
                product.quantity <
                req.body.quantity
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Not enough stock"
                });
            }
            const costPrice =
                product.purchase_price;
            const productId =
                product.id;
            const profit =
                req.body.total_amount -
                (costPrice * req.body.quantity);
            const unitPrice =
                req.body.total_amount /
                req.body.quantity;
            req.body.cost_price =
                costPrice;

            req.body.profit =
                profit;
            req.body.unit_price =
                unitPrice;
            Sale.create(
                req.body,
                function (saleErr) {

                    if (saleErr) {
                        return res.status(500).json({
                            success: false,
                            message: saleErr.message
                        });
                    }

                    const invoiceNo =
                        "INV-" + Date.now();

                    Invoice.create(
                        {
                            invoice_no: invoiceNo,
                            customer_name:
                                req.body.customer_name,

                            product_name:
                                req.body.product_name,

                            quantity:
                                req.body.quantity,

                            total_amount:
                                req.body.total_amount
                        },
                        function (invoiceErr) {

                            if (invoiceErr) {
                                return res.status(500).json({
                                    success: false,
                                    message:
                                        invoiceErr.message
                                });
                            }

                            Product.decreaseStock(
                                productId,
                                req.body.quantity,
                                (stockErr) => {

                                    if (stockErr) {
                                        return res.status(500).json({
                                            success: false,
                                            message: stockErr.message
                                        });
                                    }

                                    res.status(201).json({
                                        success: true,
                                        message: "Sale Created",
                                        invoice_no: invoiceNo
                                    });

                                }
                            );
                            StockHistory.create(
                                {
                                    product_id: product.id,
                                    product_name: product.product_name,
                                    action_type: "SALE",
                                    quantity: req.body.quantity
                                },
                                () => { }
                            );
                        }
                    );

                }
            );
        }
    );
};