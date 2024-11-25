const { Recipe } = require("../models/recipeModel");
// const { Mealplan } = require("../models/mealPlanModel");

// Get recipe by ID with population
const getRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    // Find the recipe and populate the mealplan field
    const recipe = await Recipe.findById(id).populate("mealplan");

    if (!recipe) {
      return res.status(404).json({ status: "fail", msg: "Recipe not found" });
    }

    const isSubscribed = req.user && req.user.role === "subscribed";

    const recipeData = {
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      servingSize: recipe.servingSize,
      recipeImage: recipe.recipeImage,
      // Only include video if the user is subscribed
      video: isSubscribed ? recipe.video : undefined,
      mealplan: recipe.mealplan,
    };

    return res
      .status(200)
      .json({ status: "success", data: { recipe: recipeData } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    // Fetch the user's role from the request object (assuming it's added by your authentication middleware)
    // const userRole = req.user.userRole; // Example: 'normal' or 'subscribed'

    // Fetch recipes and populate mealplan
    const recipes = await Recipe.find().populate("mealplan").exec();

    // Check user role and conditionally filter recipe data
    const modifiedRecipes = recipes.map((recipe) => {
      const recipeData = {
        _id: recipe._id,
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        servingSize: recipe.servingSize,
        mealplan: recipe.mealplan, // Include mealplan details if needed
        recipeImage: recipe.recipeImage, // Always include image
        // video: userRole === "subscribed" || "admin" ? recipe.video : undefined, // Include video only for subscribed users and admin
      };
      return recipeData;
    });

    return res
      .status(200)
      .json({ status: "success", data: { recipes: modifiedRecipes } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Create recipe
const createRecipe = async (req, res) => {
  try {
    const { title, instructions, servingSize, mealplan } = req.body;
    const ingredients = req.body.ingredients.map((ing) => ({
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
    }));
    if (!title || !instructions || !servingSize || !mealplan || !ingredients) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    // const mealplanExists = await Mealplan.findById(mealplan);
    // if (!mealplanExists) {
    //   return res.status(400).json({ message: "Mealplan does not exist" });
    // }

    const recipeData = {
      title,
      ingredients,
      instructions,
      servingSize,
      mealplan,
    };
    if (req.file) {
      recipeData.recipeImage = `uploads/recipeImg/${req.file.filename}`;
    }
    const newRecipe = new Recipe({
      ...recipeData,
    });
    // const newRecipe = new Recipe({
    //   title,
    //   ingredients,
    //   instructions,
    //   servingSize,
    //   mealplan,
    //   recipeImage:
    //     req.files && req.files.recipeImage
    //       ? req.files.recipeImage[0].path
    //       : undefined, // Handle image upload if present
    //   // video: req.files && req.files.video ? req.files.video[0].path : undefined,
    // });

    const recipeResponse = await newRecipe.save();
    res.status(201).json({
      status: "success",
      data: {
        message: "Recipe created successfully",
        recipe: recipeResponse,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Update recipe
const updateRecipe = async (req, res) => {
  try {

    const { id } = req.params;

    const { ingredients, ...rest } = req.body;

    // Handle dynamic ingredients array only if ingredients are provided
    const parsedIngredients = ingredients
      ? ingredients.map((ing) => ({
          name: ing.name,
          quantity: ing.quantity,
          unit: ing.unit,
        }))
      : undefined;

    // Combine parsed ingredients with other updates
    const updateData = {
      ...rest,
      ...(parsedIngredients && { ingredients: parsedIngredients }), // Add ingredients if they exist
      recipeImage: req.file ? req.file.path : undefined, // Handle new image upload if present
    };

    // Check if there's an image file in the request and add it to updateData
    if (req.file) {
      updateData.recipeImage = `uploads/recipeImg/${req.file.filename}`;
    }

    // Update the recipe in the database
    const recipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!recipe) {
      return res
        .status(404)
        .json({ status: "fail", message: "Recipe not found" });
    }

    // Send the updated recipe back in the response
    res.status(200).json({ status: "success", data: { recipe } });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ status: "fail", message: "Recipe not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

module.exports = {
  getRecipe,
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
