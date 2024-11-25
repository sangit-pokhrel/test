const express = require("express");
const router = express.Router();
// const productController = require("../controllers/productControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const { uploadProductImage } = require("../middleware/uploadMiddleware");

/**
 * @description To get all products
 * @api /api/products
 * @access public
 * @type GET
 * @return response
 */
router.get("/", getProducts);

/**
 * @description To get a product
 * @api /api/products/:id
 * @access public
 * @type GET
 * @return response
 */
router.get("/:id", getProduct);

/**
 * @description To create a product
 * @api /api/products
 * @access private admin
 * @type POST
 * @return response
 */
router.post(
  "/create",
  authMiddleware,
  authorizeRole("admin"),
  uploadProductImage.single("productImage"), // For image upload
  createProduct
);

/**
 * @description To update a product
 * @api /api/products/:id
 * @access private (admin)
 * @type PUT
 * @return response
 */
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRole("admin"),
  uploadProductImage.single("productImage"),
  updateProduct
);

/**
 * @description To delete a product
 * @api /api/products/:id
 * @access private (admin)
 * @type DELETE
 * @return response
 */
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRole("admin"),
  deleteProduct
);

module.exports = router;
