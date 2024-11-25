const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrderStatus,
} = require("../controllers/orderControllers");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To create orders
 * @api /api/orders
 * @access private (user)
 * @type post
 * @return response
 */
router.post("/orders", authMiddleware, authorizeRole("user"), createOrder);

/**
 * @description To get orders
 * @api /api/orders
 * @access private (user)
 * @type post
 * @return response
 */
router.post(
  "/orders",
  authMiddleware,
  authorizeRole("user", "admin"),
  getOrders
);

/**
 * @description To get order by id
 * @api /api/orders/:id
 * @access private (user and admin)
 * @type get
 * @return response
 */
router.get(
  "/orders/:id",
  authMiddleware,
  authorizeRole("admin", "user"),
  getOrder
);

/**
 * @description To get order status
 * @api /api/orders/:id/status
 * @access private (admin)
 * @type put
 * @return response
 */
router.put(
  "/orders/:id",
  authMiddleware,
  authorizeRole("admin", "user"),
  updateOrderStatus
);

module.exports = router;
