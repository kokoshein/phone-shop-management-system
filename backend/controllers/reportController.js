const db = require("../database/db");
exports.getReport = (req, res) => {

    db.get(
        `
        SELECT IFNULL(SUM(total_amount),0) as totalSales
        FROM sales
        `,
        [],
        (err, row) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                data: {
                    totalSales: row.totalSales
                }
            });
        }
    );
};


exports.getAdvancedReport = (req, res) => {

    db.get(
        `
        SELECT IFNULL(SUM(total_amount),0) as todaySales
        FROM sales
        WHERE DATE(created_at)=DATE('now')
        `,
        [],
        (err, today) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            db.get(
                `
                SELECT IFNULL(SUM(total_amount),0) as monthlySales
                FROM sales
                WHERE strftime('%Y-%m',created_at)=strftime('%Y-%m','now')
                `,
                [],
                (err2, monthly) => {

                    if (err2) {
                        return res.status(500).json({
                            success: false,
                            message: err2.message
                        });
                    }

                    db.get(
                        `
                        SELECT IFNULL(SUM(repair_cost),0) as repairIncome
                        FROM repairs
                        WHERE status='Completed'
                        `,
                        [],
                        (err3, repairs) => {

                            if (err3) {
                                return res.status(500).json({
                                    success: false,
                                    message: err3.message
                                });
                            }

                            db.all(
                                `
                                SELECT
                                product_name,
                                COUNT(*) as soldCount
                                FROM sales
                                GROUP BY product_name
                                ORDER BY soldCount DESC
                                LIMIT 5
                                `,
                                [],
                                (err4, topProducts) => {

                                    if (err4) {
                                        return res.status(500).json({
                                            success: false,
                                            message: err4.message
                                        });
                                    }

                                    db.get(
                                        `
                                        SELECT
                                        IFNULL(
                                            SUM(
                                                (selling_price - purchase_price)
                                                * quantity
                                            ),
                                            0
                                        ) as estimatedProfit
                                        FROM products
                                        `,
                                        [],
                                        (err5, profit) => {

                                            if (err5) {
                                                return res.status(500).json({
                                                    success: false,
                                                    message: err5.message
                                                });
                                            }

                                            db.get(
                                                `
    SELECT
    IFNULL(SUM(profit),0)
    as netProfit
    FROM sales
    `,
                                                [],
                                                (err6, netProfitData) => {

                                                    if (err6) {
                                                        return res.status(500).json({
                                                            success: false,
                                                            message: err6.message
                                                        });
                                                    }

                                                    res.json({
                                                        success: true,
                                                        data: {
                                                            todaySales: today.todaySales,
                                                            monthlySales: monthly.monthlySales,
                                                            repairIncome: repairs.repairIncome,
                                                            topProducts: topProducts,
                                                            estimatedProfit: profit.estimatedProfit,
                                                            netProfit: netProfitData.netProfit
                                                        }
                                                    });

                                                }
                                            );

                                        }
                                    );

                                }
                            );

                        }
                    );

                }
            );
        }
    );
};