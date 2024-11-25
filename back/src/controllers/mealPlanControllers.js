const { MealPlan } = require("../models/mealPlanModel");

// Get meal plan by ID with populated recipes
const getMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findById(req.params.id).populate('meals'); // Populate meals
    if (!mealPlan) {
      return res.status(404).json({ status: "fail", msg: "Meal plan not found" });
    }
    return res.status(200).json({ status: "success", data: { mealPlan } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get all meal plans with populated recipes
const getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find().populate('meals'); // Populate meals
    return res.status(200).json({ status: "success", data: { mealPlans } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Create meal plan
const createMealPlan = async (req, res) => {
  try {
    const newMealPlan = await MealPlan.create(req.body);
    res.status(201).json({ status: "success", data: { mealPlan: newMealPlan } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Update meal plan
const updateMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('meals'); // Populate meals
    if (!mealPlan) {
      return res.status(404).json({ status: "fail", message: "Meal plan not found" });
    }
    res.status(200).json({ status: "success", data: { mealPlan } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete meal plan
const deleteMealPlan = async (req, res) => {
  try {
    const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
    if (!mealPlan) {
      return res.status(404).json({ status: "fail", message: "Meal plan not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

module.exports = { getMealPlan, getMealPlans, createMealPlan, updateMealPlan, deleteMealPlan };
