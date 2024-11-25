import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecipeEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [mealPlan, setMealPlan] = useState([]);
  const [servingSize, setServingSize] = useState("");
  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axiosInstance.get("/mealplan");
        // console.log(response);
        const mealplans = response.data.data.mealPlans;
        setMealPlan(mealplans);

        // Set default category to the first one if available
        // if (mealplans.length > 0) {
        //   setFormData((prevFormData) => ({
        //     ...prevFormData,
        //     mealplan: mealplans[0]._id,
        //   }));
        // }
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    };
    fetchMealPlan();
  }, []);

  console.log("mealPlan", mealPlan);
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axiosInstance.get(`/recipes/${id}`);
        const recipe = response.data.data.recipe;
        setTitle(recipe.title || "");
        setIngredients(recipe.ingredients || []);
        setInstructions(recipe.instructions || "");
        setMealPlan(recipe.mealplan?.name || "");
        setServingSize(recipe.servingSize || "");
      } catch (error) {
        toast.error("Failed to fetch recipe details");
      }
    };
    fetchRecipeDetails();
  }, [id]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = ingredients.map((ingredient, idx) =>
      idx === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(updatedIngredients);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        title,
        ingredients,
        instructions,
        mealPlan,
        servingSize,
      };
      await axiosInstance.put(`/recipes/update/${id}`, updatedRecipe);
      toast.success("Recipe updated successfully");
      navigate(`/recipe/${id}`);
    } catch (error) {
      toast.error("Failed to update recipe");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col">
            <label htmlFor="ingredients" className="font-semibold mb-2">
              Ingredients
            </label>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient, index) => (
                <div key={index} className="space-y-2 mb-4">
                  <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    placeholder="Ingredient Name"
                    className="border p-2 rounded w-full mb-2"
                    required
                  />
                  <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) =>
                      handleIngredientChange(index, "quantity", e.target.value)
                    }
                    placeholder="Quantity"
                    className="border p-2 rounded w-full mb-2"
                    required
                  />
                  <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    placeholder="Unit"
                    className="border p-2 rounded w-full"
                    required
                  />
                </div>
              ))
            ) : (
              <p>No ingredients listed</p>
            )}
          </div>

          {/* Instructions */}
          <div className="flex flex-col">
            <label htmlFor="instructions" className="font-semibold mb-2">
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border p-2 rounded w-full"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Meal Plan */}
          <div className="flex flex-col">
            <label htmlFor="mealPlan" className="font-semibold mb-2">
              Meal Plan
            </label>
            <select name="mealPlan" id="mealPlan">
              {mealPlan.map((plan) => (
                <option value={plan.id} key={plan.id}>
                  {plan.mealPlan}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              id="mealPlan"
              value={mealPlan}
              onChange={(e) => setMealPlan(e.target.value)}
              className="border p-2 rounded w-full"
            /> */}
          </div>

          {/* Serving Size */}
          <div className="flex flex-col">
            <label htmlFor="servingSize" className="font-semibold mb-2">
              Serving Size
            </label>
            <input
              type="number"
              id="servingSize"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
              className="border p-2 rounded w-full"
              min="1"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeEditPage;
