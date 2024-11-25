const express = require("express");
const router = express.Router();
const {
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  createWorkout,
} = require("../controllers/workoutController");

const { authMiddleware } = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");
const {
  uploadWorkoutImage,
  uploadExerciseImage,
} = require("../middleware/uploadMiddleware");
// const maxCount = 8; // Maximum number of exercises
// const uploadFields = Array.from({ length: maxCount }, (_, i) => ({
//   name: `exercises[${i}][exerciseImage]`,
//   maxCount: 8,
// }));
/**
 * @description To get all workouts
 * @api /api/workout
 * @access public
 * @type GET
 * @return response
 */
router.get("/", getWorkouts);

/**
 * @description To get a workout by ID
 * @api /api/workout/:id
 * @access public
 * @type GET
 * @return response
 */
router.get("/:id", getWorkout);

/**
 * @description To create a new workout
 * @api /api/workout/create
 * @access private (admin)
 * @type POST
 * @return response
 */
router.post(
  "/create",
  authMiddleware,
  authorizeRole("admin"), // Only admins can create workout
  // uploadExerciseImage.fields([
  //   { name: "exercises[exerciseImage]", maxCount: 8 },
  // ]), // Updated to allow 8 images
  uploadExerciseImage.any(),
  createWorkout
);

/**
 * @description To update a workout by ID
 * @api /api/workout/:id
 * @access private (admin)
 * @type PUT
 * @return response
 */
router.put(
  "/:id",
  authMiddleware,
  authorizeRole("admin"), // Only admins can update workouts
  // uploadExerciseImage.fields([
  //   // { name: "workoutImage", maxCount: 1 }, // For workout image
  //   { name: "exercises[exerciseImage]", maxCount: 8 }, // For up to 8 exercise images dynamically
  // ]),
  uploadExerciseImage.any(),

  updateWorkout
);

/**
 * @description To delete a workout by ID
 * @api /api/workout/:id
 * @access private (admin)
 * @type DELETE
 * @return response
 */
router.delete(
  "/:id",
  authMiddleware,
  authorizeRole("admin"), // Only admins can delete workouts
  deleteWorkout
);

module.exports = router;
