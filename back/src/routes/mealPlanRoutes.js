const express = require("express");
const {
  getMealPlans,
  getMealPlan,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan,
} = require("../controllers/mealPlanControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const router = express.Router();

// FOR MEAL PLANS

/**
 * @description To get all meal plans
 * @api /api/mealPlans
 * @access public
 * @type GET
 * @return response
 */
router.get("/", getMealPlans);

/**
 * @description To get a meal plans
 * @api /api/mealPlans/:id
 * @access public
 * @type GET
 * @return response
 */
router.get("/:id", getMealPlan);

/**
 * @description To create a meal plans
 * @api /api/mealPlans
 * @access public
 * @type POST
 * @return response
 */
router.post(
  "/create",
  authMiddleware,
  authorizeRole("admin"),
  createMealPlan
);

/**
 * @description To update a meal plans
 * @api /api/mealPlans/:id
 * @access private
 * @type PUT
 * @return response
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  updateMealPlan
);

/**
 * @description To delete a meal plans
 * @api /api/mealPlans/:id
 * @access private
 * @type DELETE
 * @return response
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("admin"),
  deleteMealPlan
);
module.exports = router;
