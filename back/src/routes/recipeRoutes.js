const express = require("express");
const router = express.Router();
const {
  deleteRecipe,
  updateRecipe,
  getRecipes,
  getRecipe,
  createRecipe,
} = require("../controllers/recipeControllers");

const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const {
  uploadRecipeImage,
  // uploadRecipeVideo,
} = require("../middleware/uploadMiddleware");

/**
 * @description To get all recipes
 * @api /api/recipes
 * @access public
 * @type GET
 * @return response
 */
router.get("/", getRecipes);

/**
 * @description To get a recipe
 * @api /api/recipes/:id
 * @access public
 * @type GET
 * @return response
 */
router.get("/:id", getRecipe);

/**
 * @description To create a recipe
 * @api /api/recipes/create
 * @access private (user)
 * @type POST
 * @return response
 */
router.post(
  "/create",
  authMiddleware,
  authorizeRole("admin"),
  uploadRecipeImage.single("recipeImage"), // For image upload
  createRecipe
);

/**
 * @description To update a recipe
 * @api /api/recipes/:id
 * @access private (admin)
 * @type PUT
 * @return response
 */
router.put(
  "/update/:id",
  authMiddleware,
  authorizeRole("admin"), // Only admins can update recipes
  uploadRecipeImage.single("recipeImage"), // For image upload

  updateRecipe
);

/**
 * @description To delete a recipe
 * @api /api/recipes/:id
 * @access private (admin)
 * @type DELETE
 * @return response
 */
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRole("admin"), // Only admins can delete recipes
  deleteRecipe
);

module.exports = router;
