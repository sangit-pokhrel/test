// models/WorkoutTypeModel.js
const mongoose = require("mongoose");

const workoutTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // description: {
  //   type: String,
  // },
});

const workoutType= mongoose.model("WorkoutType", workoutTypeSchema);
module.exports = workoutType;