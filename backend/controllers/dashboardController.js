const db = require("../database/db");

exports.getStats = (req, res) => {

    db.get(
        `
        SELECT
        (SELECT COUNT(*) FROM customers) as customers,
        (SELECT COUNT(*) FROM products) as products,
        (SELECT COUNT(*) FROM repairs) as repairs,
        (SELECT COUNT(*) FROM sales) as sales
        `,
        [],
        (err, row) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            db.get(
                `
                SELECT COUNT(*) as lowStockCount
                FROM products
                WHERE quantity <= 3
                `,
                [],
                (err2, lowStock) => {

                    if (err2) {
                        return res.status(500).json({
                            success: false,
                            message: err2.message
                        });
                    }

                    res.json({
                        success: true,
                        data: {
                            totalCustomers:
                                row.customers,

                            totalProducts:
                                row.products,

                            totalRepairs:
                                row.repairs,

                            totalSales:
                                row.sales,

                            lowStockCount:
                                lowStock.lowStockCount
                        }
                    });

                }
            );

        }
    );

};