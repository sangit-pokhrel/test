import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeForm = () => {
  const [mealplan, setMealplan] = useState([]);
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "", unit: "" },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    mealplan: "",
    ingredients: [],
    instructions: "",
    servingSize: 1,
    recipeImage: "",
  });

  console.log("inf", formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle file changes for recipe image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      recipeImage: file,
    });
  };

  // console.log("fd ", formData);
  // Handle input change for dynamic ingredient fields
  const handleIngredientChange = (index, event) => {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [event.target.name]: event.target.value };
      }
      return ingredient;
    });

    setIngredients(newIngredients);

    // Sync the formData's ingredients with the updated ingredients state
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  // Add new ingredient field
  const addIngredient = () => {
    const updatedIngredients = [
      ...ingredients,
      { name: "", quantity: "", unit: "" },
    ];
    setIngredients(updatedIngredients);

    // Sync with formData
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  // Remove an ingredient field
  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);

    // Sync with formData
    setFormData({
      ...formData,
      ingredients: newIngredients,
    });
  };

  // Handle form submission
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const recipeData = new FormData();

  //     recipeData.append("title", recipeData.title);
  //     recipeData.append("mealplan", recipeData.mealplan);
  //     recipeData.append("instructions", recipeData.instructions);
  //     recipeData.append("servingSize", recipeData.servingSize);
  //     recipeData.append("recipeImage", recipeData.recipeImage);

  //     try {
  //       // Post the recipe data to your API endpoint
  //       const response = await axiosInstance.post("/recipes/create", recipeData);
  //       console.log(response);
  //       toast.success(response);
  //       console.log("Recipes created successfully", response);

  //       //   await axios.post("http://localhost:5000/recipes", recipeData);
  //       //   alert("Recipe added successfully!");
  //     } catch (error) {
  //       console.error("Error adding recipe:", error);
  //       //   alert("Failed to add recipe.");
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = new FormData();
    recipeData.append("title", formData.title);
    recipeData.append("mealplan", formData.mealplan);
    recipeData.append("instructions", formData.instructions);
    recipeData.append("servingSize", formData.servingSize);
    // recipeData.append("recipeImage", formData.recipeImage);

    ingredients.forEach((ingredient, index) => {
      recipeData.append(`ingredients[${index}][name]`, ingredient.name);
      recipeData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
      recipeData.append(`ingredients[${index}][unit]`, ingredient.unit);
    });
    // console.log("rd", recipeData);
    if (formData.recipeImage) {
      recipeData.append("recipeImage", formData.recipeImage);
    }
    try {
      // console.log("130",recipeData)
      const response = await axiosInstance.post("/recipes/create", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // console.log("rep", response);
      toast.success("Recipe created successfully!", response.data.success);
    } catch (error) {
      toast.error("Failed to create recipe");
    }
  };

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axiosInstance.get("/mealplan");
        // console.log(response);
        const mealplans = response.data.data.mealPlans;
        setMealplan(mealplans);

        // Set default category to the first one if available
        if (mealplans.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            mealplan: mealplans[0]._id,
          }));
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };
    fetchMealPlan();
  }, []);
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add a New Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ToastContainer />
        {/* Recipe Title */}
        <div className="flex flex-col">
          <label className="text-lg font-medium">Recipe Title</label>
          <input
            type="text"
            name="title"
            className="border border-gray-300 p-2 rounded-lg mt-2 focus:outline-none focus:border-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter recipe title"
          />
        </div>
        {/* Mealplan */}
        <div className="flex flex-col">
          <label className="text-lg font-medium">Mealplan</label>
          <select
            name="mealplan"
            className="border border-gray-300 p-2 rounded-lg mt-2 focus:outline-none focus:border-blue-500"
            value={formData.mealplan}
            required
            onChange={handleChange}
            placeholder="Enter meal plan"
          >
            {mealplan.map((meal) => (
              <option key={meal._id} value={meal._id}>
                {meal.name}
              </option>
            ))}
          </select>
        </div>
        {/* Ingredients Section */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-4 items-center mb-4">
              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name} // Access ingredient name correctly
                onChange={(event) => handleIngredientChange(index, event)}
                className="border border-gray-300 p-2 rounded-lg w-1/3 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity} // Access ingredient quantity correctly
                onChange={(event) => handleIngredientChange(index, event)}
                className="border border-gray-300 p-2 rounded-lg w-1/3 focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                name="unit"
                placeholder="Unit (e.g., tsp, cup)"
                value={ingredient.unit} // Access ingredient unit correctly
                onChange={(event) => handleIngredientChange(index, event)}
                className="border border-gray-300 p-2 rounded-lg w-1/3 focus:outline-none focus:border-blue-500"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 font-bold text-lg"
                >
                  &times;
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold mt-2 hover:bg-blue-600"
          >
            Add Ingredient
          </button>
        </div>
        {/* Instructions */}
        <div className="flex flex-col">
          <label className="text-lg font-medium">Instructions</label>
          <textarea
            className="border border-gray-300 p-2 rounded-lg mt-2 focus:outline-none focus:border-blue-500"
            value={formData.instructions}
            onChange={handleChange}
            name="instructions"
            required
            placeholder="Enter instructions"
          />
        </div>
        {/* Serving Size */}
        <div className="flex flex-col">
          <label className="text-lg font-medium">Serving Size</label>
          <input
            type="number"
            name="servingSize"
            className="border border-gray-300 p-2 rounded-lg mt-2 focus:outline-none focus:border-blue-500"
            value={formData.servingSize}
            onChange={handleChange}
            required
          />
        </div>
        {/* Recipe Image */}
        <div className="flex flex-col">
          <label className="text-lg font-medium">Recipe Image</label>
          <input
            type="file"
            name="recipeImage"
            onChange={handleFileChange}
            // required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold w-full hover:bg-green-600"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
