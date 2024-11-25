import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosConfig";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion"; // Import Framer Motion

const ProductCard = ({ datas, userRole, handleEdit, handleDelete }) => {
  const domain = `http://localhost:5000`;
  const imgAddress = (item) => {
    if (item.productImage) {
      return `${domain}/${item.productImage}`;
    } else {
      return item.imgUrl;
    }
  };
  const [category, setCategory] = useState([]);
  // console.log(category)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category");
        console.log(response);
        const categories = response.data.categories.name;
        setCategory(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-around items-center my-2 gap-2">
      {datas.map((item) => (
        <motion.div
          key={item.id}
          className="max-w-sm rounded-lg overflow-hidden shadow-lg relative" // Use relative for positioning
          initial={{ opacity: 0, y: 50 }} // Cards start slightly below and invisible
          animate={{ opacity: 1, y: 0 }} // Cards animate into position
          transition={{ duration: 0.5 }} // Animation timing
        >
          {/* Edit and Delete Buttons */}
          {userRole === "admin" && (
            <div className="absolute top-2 right-2 flex space-x-1">
              <button
                onClick={() => handleEdit(item.category)}
                className="text-blue-500 hover:text-blue-700"
              >
                <AiFillEdit />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <AiFillDelete />
              </button>
            </div>
          )}

          <img
            className="w-full h-auto max-h-64 object-contain p-5 rounded"
            src={`${imgAddress(item)}`}
            alt={item.name}
          />

          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.name}</div>
            <p className="text-gray-700 text-base mb-2">
              <strong>Category:</strong> {item.category}
              {category}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Brand:</strong> {item.brand}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Price:</strong> ${item.price}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Stock Left:</strong> {item.countInStock}
            </p>
            <p className="text-gray-700 text-base mb-2">{item.description}</p>
          </div>

          <div className="px-6 py-4 text-left flex justify-between">
            <motion.button
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Add to Cart
            </motion.button>
            <motion.button
              className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              Buy Now
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductCard;
