import React, { useEffect, useState } from "react";
// import CardComponent from "../card/CardComponent";
// import ProductList from "../ProductCard/ProductList";
import axios from "axios";
import ProductCard from "./ProductCard";
import transition from "../../transition";

const domain = "http://localhost:5000";

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${domain}/api/products`);
      console.log("response", response);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const userRole = "admin"; // Replace with actual logic to get the user role

  const handleEdit = (category) => {
    console.log("Editing category:", category);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log("Deleting item with ID:", id);
    // Add your delete logic here
  };

  console.log(products)

  return (
    <>
      {products.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <ProductCard
            datas={products}
            userRole={userRole}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
    </>
  );
};

export default transition(ProductComponent);
