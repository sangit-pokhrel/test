import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaUtensils } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RecipeDetailPage = () => {
  const domain = `http://localhost:5000`;
  const navigate = useNavigate();

  const imgAddress = (item) => {
    return item?.recipeImage ? `${domain}/${item.recipeImage}` : item?.imgUrl;
  };

  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);

  // const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/recipes/delete/${id}`); 
      console.log(response);
      console.log("deletedexistent recipe")
      toast.success("recipe deleted successfully");
      await fetchRecipeDetails();
      setTimeout(() => {
        navigate("/recipe");
      }, 2000);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error(error.response?.data?.msg || "Failed to delete recipe");
    }
  };
  // console.log(recipeDetails)

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  const fetchRecipeDetails = async () => {
    try {
      const response = await axiosInstance.get(`/recipes/${id}`);
      const recipeData = response.data.data.recipe;
      setRecipeDetails(recipeData);
      // setLoading(false);
    } catch (error) {
      // console.error("Error fetching data", error);
      // setLoading(false);
    }
  };

  // if (loading) return <h1>Loading...</h1>;
  if (!recipeDetails) return <h1>Recipe not found</h1>;

  // console.log(recipeDetails);

  return (
    <div className="min-h-screen text-black bg-gray-100 p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Image - Spans 2 columns */}
        <div className="md:col-span-2 rounded-2xl overflow-hidden h-[400px] bg-white shadow-lg">
          <img
            src={imgAddress(recipeDetails)}
            alt={recipeDetails.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Recipe Info Card */}
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {recipeDetails.title}
          </h1>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-400 w-6 h-6" />
            <span className="text-xl font-semibold">
              {recipeDetails.rating || "No rating available"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaUtensils className="text-gray-500" />
              <span>Serves: {recipeDetails.servingSize || "N/A"}</span>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg text-blue-800">
              {recipeDetails.mealplan?.name || "No meal plan specified"}
            </div>
          </div>
        </div>

        {/* Ingredients Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="space-y-2">
            {recipeDetails.ingredients &&
            recipeDetails.ingredients.length > 0 ? (
              recipeDetails.ingredients.map((ingredient, index) => (
                <li key={index} className="flex flex-col gap-2">
                  <span className="font-semibold">{ingredient.name}</span>
                  <span>Quantity: {ingredient.quantity}</span>
                  <span>Unit: {ingredient.unit}</span>
                </li>
              ))
            ) : (
              <li>No ingredients listed</li>
            )}
          </ul>
        </div>

        {/* Instructions Card */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-gray-700 leading-relaxed">
            {recipeDetails.instructions || "No instructions provided"}
          </p>
        </div>

        {/* Meal Plan Details Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Meal Plan</h2>
          <p className="font-semibold">Name: {recipeDetails.mealplan?.name}</p>
          <p>Description: {recipeDetails.mealplan?.description}</p>
          <p>Duration: {recipeDetails.mealplan?.duration} days</p>
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-3 flex gap-4 justify-end">
          <Link
            to={`/edit-recipe/${id}`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <MdEdit className="w-5 h-5" />
            <span>Edit Recipe</span>
          </Link>
          <button
            onClick={() => handleDelete(id)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <MdDeleteOutline className="w-5 h-5" />
            <span>Delete Recipe</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
