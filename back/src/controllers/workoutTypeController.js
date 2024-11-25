const WorkoutType = require("../models/workoutTypeModel");

// create workout type
const createWorkoutType = async (req, res) => {
  try {
    const { name } = req.body;
    // console.log(req.body)
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const workoutType = await WorkoutType.findOne({ name });
    if (workoutType) {
      return res.status(400).json({ message: "Workout type already exists" });
    }
    const newWorkoutType = new WorkoutType({ name });
    const workoutTypeResponse = await newWorkoutType.save();
    return res
      .status(201)
      .json({ message: "Workout type created", workoutType: workoutTypeResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upade workout type
const updateWorkoutType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const workoutType = await WorkoutType.findById(id);
    if (!workoutType) {
      return res.status(404).json({ message: "Workout type not found" });
    }
    workoutType.name = name;
    const updatedWorkoutType = await workoutType.save();
    return res
      .status(200)
      .json({
        message: "Workout type updated",
        workoutType: updatedWorkoutType,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all workout types

const getWorkoutTypes = async (req, res) => {
  try {
    const workoutTypes = await WorkoutType.find();
    res.json(workoutTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get workout type by id
const getWorkoutTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const workoutType = await WorkoutType.findById(id);
    if (!workoutType) {
      return res.status(404).json({ message: "Workout type not found" });
    }
    return res.status(200).json({ workoutType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete workout type
const deleteWorkoutType = async (req, res) => {
  try {
    const { id } = req.params;
    const workoutType = await WorkoutType.findById(id);
    if (!workoutType) {
      return res.status(404).json({ message: "Workout type not found" });
    }
    await WorkoutType.findByIdAndDelete(id);
    return res.status(200).json({ message: "Workout type deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createWorkoutType,
  deleteWorkoutType,
  updateWorkoutType,
  getWorkoutTypeById,
  getWorkoutTypes,
};
