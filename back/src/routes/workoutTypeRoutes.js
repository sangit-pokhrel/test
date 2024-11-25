const express = require("express");
const router = express.Router();
const {
  createWorkoutType,
  getWorkoutTypes,
  updateWorkoutType,
  deleteWorkoutType,
  getWorkoutTypeById,
} = require("../controllers/workoutTypeController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To get all workout types
 * @api /api/workoutTypes
 * @access public
 * @type GET
 * @return response
 */
router.get("/", getWorkoutTypes);

/**
 * @description To get a workout type by ID
 * @api /api/workoutTypes/:id
 * @access public
 * @type GET
 * @return response
 */
router.get("/:id", getWorkoutTypeById);

/**
 * @description To create a new workout type
 * @api /api/workoutTypes
 * @access private (admin)
 * @type POST
 * @return response
 */
router.post(
  "/create",
  authMiddleware,
  authorizeRole("admin"),
  createWorkoutType
);

/**
 * @description To update a workout type by ID
 * @api /api/workoutTypes/:id
 * @access private (admin)
 * @type PUT
 * @return response
 */
router.put("/update/:id", authMiddleware, authorizeRole("admin"), updateWorkoutType);

/**
 * @description To delete a workout type by ID
 * @api /api/workoutTypes/:id
 * @access private (admin)
 * @type DELETE
 * @return response
 */
router.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRole("admin"),
  deleteWorkoutType
);

module.exports = router;
