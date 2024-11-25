const Workout = require("../models/workoutModel");
const WorkoutType = require("../models/workoutTypeModel");

// create a new workout (admin access)
const createWorkout = async (req, res) => {
  try {
    // Destructure required fields from request body
    const { type, difficulty, plan, exercises } = req.body;

    // Map exercises to include exercise images
    const mappedExercises = exercises.map((ex, index) => {
      const exerciseImageFile = req.files.find(
        (file) => file.fieldname === `exercises[${index}][exerciseImage]`
      );

      return {
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        rest: ex.rest,
        exerciseImage: exerciseImageFile
          ? `uploads/exerciseImg/${exerciseImageFile.filename}`
          : null, // Store image path or null if no image provided
      };
    });

    // Validate required fields
    if (
      !type ||
      !Array.isArray(req.body.workoutPlanDetails) ||
      !plan ||
      !mappedExercises.length
    ) {
      return res.status(400).json({
        message:
          "All fields are required, including exercises and workout plan details.",
      });
    }

    // Check if workout type exists
    let workoutType = await WorkoutType.findById(type);
    if (!workoutType) {
      // If the workout type does not exist, create a new one
      workoutType = new WorkoutType({ name: type });
      await workoutType.save();
    }

    // Prepare workout data
    const workoutData = {
      type,
      difficulty,
      plan,
      workoutPlanDetails: req.body.workoutPlanDetails.map((wp) => ({
        description: wp.description,
        duration: wp.duration,
        frequency: wp.frequency,
      })),
      exercises: mappedExercises,
    };

    // Create new workout instance
    const newWorkout = new Workout(workoutData);

    // Save new workout to database
    const workoutResponse = await newWorkout.save();
    res.status(201).json({
      status: "success",
      data: {
        message: "Workout created successfully",
        workout: workoutResponse,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err.message || "An error occurred",
    });
  }
};

// get a single workout by ID
const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.pasams.id);
    if (!workout) {
      return res.status(404).json({
        msg: "Workout not found",
        err: err.message,
      });
    }

    return res.status(200).json({
      data: {
        workout,
      },
    });
  } catch (err) {
    return res.status(400).json({
      msg: "workout couldn't be found",
    });
  }
};

//get all workouts

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().populate("type", "name");
    res.status(200).json({
      status: "success",
      data: workouts,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

//update a workout by ID (admin access)

const updateWorkout = async (req, res) => {
  try {
    console.log("Request Files:", req.files); // Log request files
    console.log("Request Body:", req.body); // Log request body

    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({
        status: "fail",
        msg: "Workout not found",
      });
    }

    // Map over exercises and update image if provided
    const updatedExercises = workout.exercises.map((exercise, index) => ({
      ...exercise,
      exerciseImage:
        req.files && req.files[`exercises[${index}][exerciseImage]`]
          ? `uploads/exerciseImg/${
              req.files[`exercises[${index}][exerciseImage]`][0].filename
            }`
          : exercise.exerciseImage,
    }));

    workout.exercises = updatedExercises;
    workout.type = req.body.type || workout.type;
    workout.difficulty = req.body.difficulty || workout.difficulty;

    // Handle workout image if it was updated
    if (req.files && req.files["workoutImage"]) {
      workout.workoutImage = `uploads/workoutImg/${req.files["workoutImage"][0].filename}`;
    }

    const updatedWorkout = await workout.save();

    return res.status(200).json({
      status: "success",
      data: {
        workout: updatedWorkout,
      },
    });
  } catch (err) {
    console.error("Error in updateWorkout:", err); // Log the error
    return res.status(500).json({
      status: "fail",
      message: err.message || "An unexpected error occurred",
    });
  }
};

// delete a workout by ID (admin access)

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id);
    if (!workout) {
      return res.status(404).json({
        status: "fail",
        msg: "workout not found",
      });
    }
    return res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      err: err.msg,
    });
  }
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
