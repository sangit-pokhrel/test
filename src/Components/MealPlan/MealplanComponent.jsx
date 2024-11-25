import React, { useEffect, useState } from "react";
import CardComponent from "../card/CardComponent";
// import ProductList from "../ProductCard/ProductList";
import axios from "axios";

const domain = "http://localhost:5000";

const MealPlanComponent = () => {


  const [mealplan, setmealplan] = useState([]);
//   console.log(mealplan)
  const fetchmealplan = async () => {
    try {
      const response = await axios.get(`${domain}/api/mealplan`);
      console.log("response", response);
      setmealplan(response.data.data.mealPlans);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchmealplan();
  }, []);

  return (
    <>
      {mealplan.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <CardComponent datas={mealplan} />
      )}
    </>
  );
};

export default MealPlanComponent;
