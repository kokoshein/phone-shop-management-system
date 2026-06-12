require("dotenv").config();
const repairRoutes =
    require("./routes/repairRoutes");

const saleRoutes =
    require("./routes/saleRoutes");

const dashboardRoutes =
    require("./routes/dashboardRoutes");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const productRoutes = require("./routes/productRoutes");
const invoiceRoutes =
    require("./routes/invoiceRoutes");
const reportRoutes =
    require("./routes/reportRoutes");
const app = express();   // <-- ဒီ line က app.use ထက် အရင်လာရမယ်

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Phone Shop API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use(
    "/api/repairs",
    repairRoutes
);

app.use(
    "/api/sales",
    saleRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use(
    "/api/invoices",
    invoiceRoutes
);
app.use(
    "/api/reports",
    reportRoutes
);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});