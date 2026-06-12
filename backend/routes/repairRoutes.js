const express = require("express");

const {
    getRepairs,
    createRepair,
    updateRepairStatus,
    deleteRepair
} = require("../controllers/repairController");
const router = express.Router();

router.get("/", getRepairs);

router.post("/", createRepair);

router.put("/:id", updateRepairStatus);

router.delete("/:id", deleteRepair);

module.exports = router;