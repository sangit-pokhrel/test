import React from "react";
import { FaStar, FaUtensils, FaClock } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

// Recipe Card Component
const RecipeCard = ({ recipeData }) => {
  const domain = `http://localhost:5000`;
  const defaultImage =
    "https://i.pinimg.com/474x/b3/9f/4f/b39f4f4575a3e376aad55e8af4fb82b8.jpg";
  const navigate = useNavigate();

  // const imgAddress = (item) => {
  //   console.log("Item in imgAddress:", item); // Add this
  //   console.log("Recipe image path:", item.recipeImage); // Add this
  //   if (item.recipeImage) {
  //     const fullPath = `${domain}/${item.recipeImage}`;
  //     console.log("Full image URL:", fullPath); // Add this
  //     return fullPath;
  //   } else {
  //     return item.imgUrl;
  //   }
  // };

  const imgAddress = (item) => {
    console.log("Processing item:", item);
    if (item.recipeImage) {
      const fullPath = `${domain}/${item.recipeImage}`;
      console.log("Generated image path:", fullPath);
      return fullPath;
    }
    // return defaultImage;
  };
  console.log("Received recipe data:", recipeData);
  // return item.productImage ? `${domain}/${item.recipeImage}` : item.imgUrl;

  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="flex flex-wrap gap-6 justify-center p-4">
      {recipeData.map((item, index) => (
        <div
          key={index}
          className="w-full md:w-96 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          onClick={() => handleCardClick(item._id)}
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={imgAddress(item)}
              alt={item.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.log("Image load error for:", e.target.src);
                if (e.target.src !== defaultImage) {
                  e.target.src = defaultImage;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-4 right-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <FaStar />
              <span>{item.rating || "4.5"}</span>
            </div>
          </div>

          {/* Content Container */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <h3 className="font-bold text-2xl text-gray-800 line-clamp-2">
              {item.title}
            </h3>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  Serves: {item.servingSize || "4"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-500" />
                <span className="text-sm text-gray-600">30 mins</span>
              </div>
            </div>

            {/* Category */}
            <div className="py-3 border-y border-gray-200">
              <p className="text-xs text-gray-500">Category</p>
              <p className="font-medium text-gray-700">
                {item.mealplan?.name || "Meal Plan"}
              </p>
            </div>

            {/* Action Buttons */}
            {/* <div
              className="flex gap-3 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                to={`/update/${item._id}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                <MdEdit className="w-5 h-5" />
                <span>Edit</span>
              </Link>
              <button
                onClick={() => console.log("Delete recipe")}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                <MdDeleteOutline className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;

// {
//   function handleLinkClick() {
//     window.scrollTo(0, 0);
//   }

// async function addFavourite() {
//   try {
//     const response = await axiosInstance.post(`/favourite/${id}`);

//     console.log(await response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function editRecipe() {
//   try {
//     const response = await axiosInstance.get(`/update/${id}`);

//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function removeRecipe() {
//   try {
//     const response = await axiosInstance.delete(`/recipes/${id}/delete`);

//     console.log(await response);
//   } catch (error) {
//     console.log(error);
//   }
// }

// import React from "react";
// import { AiFillEdit, AiFillDelete } from "react-icons/ai";

// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const RecipeCard = ({ recipeData, userRole, handleEdit, handleDelete }) => {
//   const domain = `http://localhost:5000`;
//   const imgAddress = (item) => {
//     if (item.recipeImage) {
//       return `${domain}/${item.recipeImage}`;
//     } else {
//       return item.imgUrl;
//     }
//   };

//   return (
//     <div className="flex flex-wrap justify-around items-center my-2 gap-2">
//       {recipeData.map((item) => (
//         <motion.div
//           key={item.id}
//           className="max-w-sm rounded-lg overflow-hidden shadow-lg relative" // Use relative for positioning
//           initial={{ opacity: 0, y: 50 }} // Cards start slightly below and invisible
//           animate={{ opacity: 1, y: 0 }} // Cards animate into position
//           transition={{ duration: 0.5 }} // Animation timing
//         >
//           {/* Edit and Delete Buttons */}
//           {userRole === "admin" && (
//             <div className="absolute top-2 right-2 flex space-x-1">
//               <button
//                 onClick={() => handleEdit(item.category)}
//                 className="text-blue-500 hover:text-blue-700"
//               >
//                 <AiFillEdit />
//               </button>
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <AiFillDelete />
//               </button>
//             </div>
//           )}

//           <img
//             className="w-full h-auto max-h-64 object-contain p-5 rounded"
//             src={`${imgAddress(item)}`}
//             alt={item.name}
//           />

//           <div className="px-6 py-4">
//             <div className="font-bold text-xl mb-2">{item.name}</div>
//             <p className="text-gray-700 text-base mb-2">
//               <strong>Title: {item.title}</strong>
//             </p>
//             <p className="text-gray-700 text-base mb-2">
//               <strong>Brand:</strong> {item.brand}
//             </p>
//             <p className="text-gray-700 text-base mb-2">
//               <strong>Price:</strong> ${item.price}
//             </p>
//             <p className="text-gray-700 text-base mb-2">
//               <strong>Stock Left:</strong> {item.countInStock}
//             </p>
//             <p className="text-gray-700 text-base mb-2">{item.description}</p>
//           </div>

//           <div className="px-6 py-4 text-left flex justify-between">
//             <motion.button
//               className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
//               whileHover={{ scale: 1.05 }}
//             >
//               Add to Cart
//             </motion.button>
//             <motion.button
//               className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors duration-200"
//               whileHover={{ scale: 1.05 }}
//             >
//               Buy Now
//             </motion.button>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default RecipeCard;
