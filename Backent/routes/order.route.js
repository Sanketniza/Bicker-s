// const express = require("express");
// const router = express.Router();
// const {
//     createOrder,
//     getOrdersByUser,
//     getOrdersByShopOwner,
//     updateOrderStatus,
//     deleteOrder,
// } = require("../controllers/order.controller");

// const authenticate = require("../Middlewares/isAuthenticated");

// // Create a new order
// router.post("/", authenticate, createOrder);
// // router.route("/").post(authenticate, createOrder);

// // Get all orders by user
// router.get("/:userId", authenticate, getOrdersByUser);

// // Get all orders by shop owner
// router.get("/shop-owner", authenticate, getOrdersByShopOwner);

// // Update order status
// router.patch("/:orderId/status", authenticate, updateOrderStatus);

// // Delete an order
// router.delete("/:orderId", authenticate, deleteOrder);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
    createOrder,
    getOrdersByUser,
    getOrdersByShopOwner,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/order.controller");

const authenticate = require("../Middlewares/isAuthenticated");
const optionalAuth = require("../Middlewares/isOptionalAuth"); // Create this middleware

// Create a new order (with optional authentication)
router.post("/", optionalAuth, createOrder);

// Other routes remain the same
router.get("/:userId", authenticate, getOrdersByUser);
router.get("/shop-owner", authenticate, getOrdersByShopOwner);
router.patch("/:orderId/status", authenticate, updateOrderStatus);
router.delete("/:orderId", authenticate, deleteOrder);

module.exports = router;