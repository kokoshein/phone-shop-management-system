const express = require("express");

const {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer
} = require("../controllers/customerController");

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const router = express.Router();

router.get("/", getCustomers);

router.post("/", createCustomer);

router.put(
    "/:id",
    authMiddleware,
    updateCustomer
);

router.delete(
    "/:id",
    authMiddleware,
    deleteCustomer
);

module.exports = router;