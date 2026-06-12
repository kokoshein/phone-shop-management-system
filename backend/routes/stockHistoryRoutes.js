const express = require("express");

const {
    getHistory
} = require(
    "../controllers/stockHistoryController"
);

const router = express.Router();

router.get("/", getHistory);

module.exports = router;