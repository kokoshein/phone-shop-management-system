const express = require("express");

const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");
const productController =
    require("../controllers/productController");
const authMiddleware = require(
    "../middleware/authMiddleware"
);

const router = express.Router();

router.get("/", getProducts);

router.post("/", createProduct);
router.get(
    "/low-stock",
    productController.getLowStock
);
router.put(
    "/restock/:id",
    productController.restockProduct
);
router.put(
    "/:id",
    authMiddleware,
    updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);

module.exports = router;