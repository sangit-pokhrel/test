const mongoose = require("mongoose");

// schema for exercises

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  rest: {
    type: Number,
    required: true,
  },
  exerciseImage: {
    type: String,
    // default: null,
  },
});

// schema for workout plan details

const workoutPlanDetails = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, // duration in minutes
    required: true,
  },
  frequency: {
    type: String,
    required: true, // e.g., '3 times a week'
  },
});

const workoutSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkoutType", // Reference to WorkoutTypeModel
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Advanced"],
    // required: true,
  },
  plan: {
    type: String,
    required: true,
  },
  exercises: [exerciseSchema],
  workoutPlanDetails: [workoutPlanDetails],
  // workoutImage: {
  //   type: String,
  // },
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
