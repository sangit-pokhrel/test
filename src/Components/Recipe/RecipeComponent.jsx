import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";
import RecipeCard from "./RecipeCard";
const RecipeComponent = () => {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);
  const fetchRecipes = async () => {
    try {
      const response = await axiosInstance.get(`/recipes`);
      console.log("Recipe response:", response.data.data.recipes);
      // Log the first recipe's image path to verify the data
      if (response.data.data.recipes.length > 0) {
        console.log(
          "First recipe image path:",
          response.data.data.recipes[0].recipeImage
        );
      }
      setRecipes(response.data.data.recipes);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);
  return (
    <>
      {recipes.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <>
          <RecipeCard recipeData={recipes} />
        </>
      )}
    </>
  );
};

export default RecipeComponent;
