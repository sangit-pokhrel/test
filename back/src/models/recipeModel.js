const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema for ingredients

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

// Schema for Recipes
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  mealplan: {
    type: Schema.Types.ObjectId,
    ref: "MealPlan", // Reference to the MealPlan model
  },
  ingredients: [ingredientSchema],
  instructions: {
    type: String,
    required: true,
  },
  servingSize: {
    type: Number,
    required: true,
  },
  recipeImage: {
    type: String,
    required: false,
  },
  // video: {
  //   type: String,
  // },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = { Recipe };
