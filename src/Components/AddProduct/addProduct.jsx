import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../config/axiosConfig";
import { motion } from "framer-motion";

const AddProductComponent = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    price: "",
    description: "",
    productImage: "",
    brand: "",
    // rating: "",
    // numReviews: "",
    countInStock: "",
  });

  const [category, setCategory] = useState([]);
  // console.log("cat",category)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      productImage: file,
    });
  };
  console.log(formData);
  console.log("image:", formData.productImage);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("productImage", formData.productImage);
    data.append("brand", formData.brand);
    // data.append("rating", formData.rating);
    // data.append("numReviews", formData.numReviews);
    data.append("countInStock", formData.countInStock);

    console.log("Data:", data);
    console.log("FormData:", formData);

    try {
      const response = await axiosInstance.post("/products/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      console.log("Product added successfully:", response);
      //   make form data empty
      // setFormData({
      //   category: "",
      //   name: "",
      //   price: "",
      //   description: "",
      //   productImage: "",
      //   // brand: "",
      //   // rating: "",
      //   // numReviews: "",
      //   // countInStock: "",
      // });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        console.log(response);
        const categories = response.data.categories;
        setCategory(categories);

        // Set default category to the first one if available
        if (categories.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            category: categories[0]._id,
          }));
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <motion.form
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg m-8"
    >
      <ToastContainer />
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Category:
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {category.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Product Image:
        </label>
        <input
          type="file"
          name="productImage"
          onChange={handleFileChange}
          // required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Brand:
        </label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rating:
        </label>
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          // required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div> */}
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Number of Reviews:
        </label>
        <input
          type="number"
          name="numReviews"
          value={formData.numReviews}
          onChange={handleChange}
          // required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div> */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Count in Stock:
        </label>
        <input
          type="number"
          name="countInStock"
          value={formData.countInStock}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </div>
    </motion.form>
  );
};

export default AddProductComponent;
