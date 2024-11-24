const express = require("express");
const {
    createProduct,
    getProductsByCompany,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");
const isAuthenticated = require("../Middlewares/isAuthenticated");
const { productUpload } = require("../Middlewares/multer");

const router = express.Router();

// Create and manage products (requires authentication)
router.post("/create", isAuthenticated, productUpload, createProduct);
router.put("/:productId", isAuthenticated, productUpload, updateProduct);
router.delete("/:productId/:companyId", isAuthenticated, deleteProduct);

// Public routes (no authentication required)
router.get("/company/:companyId", getProductsByCompany);
router.get("/all", getAllProducts);
router.get("/:productId", getProductById);

module.exports = router;