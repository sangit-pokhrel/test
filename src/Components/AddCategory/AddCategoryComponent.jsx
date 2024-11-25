import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState(""); // Added for description
  const [editingCategory, setEditingCategory] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const categoryData = {
    name: categoryName,
    description: categoryDescription, // Added description to category data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        const editResponse = await axiosInstance.put(
          `/category/update/${categoryId}`,
          categoryData
        );
        console.log(editResponse);
        toast.success(editResponse.data.message);
        setEditingCategory(false); // Reset editing state
      } else {
        const response = await axiosInstance.post(
          "/category/create",
          categoryData
        );
        toast.success(response.data.message);
        setCategoryName("");
        setCategoryDescription(""); // Clear description on new category
      }
      fetchCategories();
    } catch (error) {
      console.error(error.response || error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      setCategories(response.data.categories);
    } catch (error) {
      // console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(true);
    setCategoryName(category.name);
    setCategoryDescription(category.description); // Set description on edit
    setCategoryId(category._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/category/delete/${id}`);
      console.log(response);
      toast.success(response.data.message);
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.response?.data?.msg || "Failed to delete category");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <ToastContainer />
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="mb-1">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            required
            placeholder="Enter category name"
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="description" className="mb-1">
            Category Description
          </label>
          <textarea
            name="description"
            id="description"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded"
            placeholder="Enter category description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>
      <div>
        <h2 className="text-xl font-semibold mb-2">Category List</h2>
        <ul>
          {categories.length === 0 ? (
            <p className="text-gray-500">No Categories added yet</p>
          ) : (
            categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center border-b border-gray-300 py-2"
              >
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(category)}
                    className="mr-2 text-blue-500"
                  >
                    <AiFillEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-500"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryComponent;
