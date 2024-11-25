import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const WorkoutCardComponent = ({ workoutData }) => {
  const domain = `http://localhost:5000`;
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const uniqueWorkoutTypes = Array.from(
    new Set(workoutData.data.map((item) => item.type.name))
  );

  const filteredWorkouts = selectedType
    ? workoutData.data.filter((item) => item.type.name === selectedType)
    : workoutData.data;

  return (
    <div className="p-4 min-h-screen bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Dropdown for workout types */}
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2 text-gray-100">
            Workout Type
          </label>
          <div className="relative">
            <select
              name="workout types"
              className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-600 transition-colors"
              onChange={handleTypeChange}
            >
              <option value="">Select Workout Type</option>
              {uniqueWorkoutTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Render filtered workouts */}
        {filteredWorkouts.map((item) => (
          <div key={item._id} className="mb-8">
            {/* Workout Plan Details */}
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gray-100">
                Workout Plan Details
              </h3>
              <p className="text-gray-400">
                {item.workoutPlanDetails.duration} min
              </p>
            </div>

            {/* Exercise Cards */}
            {item.exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="flex flex-col md:flex-row items-center rounded-xl p-6 mt-6 bg-gray-800 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                {/* Exercise Image */}
                <div className="w-full md:w-1/3 relative mb-6 md:mb-0">
                  <img
                    src={
                      exercise.exerciseImage
                        ? `${domain}/${exercise.exerciseImage}`
                        : "/api/placeholder/400/320"
                    }
                    alt={exercise.name}
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                    style={{ aspectRatio: "16 / 9" }}
                  />
                  <div className="absolute top-2 left-2 bg-blue-600 text-white py-1 px-4 rounded-full text-sm font-medium">
                    {item.difficulty}
                  </div>
                </div>

                {/* Exercise Info */}
                <div className="w-full md:w-2/3 md:pl-8 flex flex-col justify-between space-y-6">
                  <h4 className="text-3xl font-bold text-white">
                    {exercise.name}
                  </h4>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Sets</p>
                      <p className="text-white font-bold text-lg">
                        {exercise.sets}
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Reps</p>
                      <p className="text-white font-bold text-lg">
                        {exercise.reps}
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Rest</p>
                      <p className="text-white font-bold text-lg">
                        {exercise.rest}s
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                      />
                    </svg>
                    <p className="text-sm">Calories Burned: 200</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutCardComponent;

// import React, { useState } from "react";

// const WorkoutCardComponent = ({ workoutData }) => {
//   const domain = `http://localhost:5000`;
//   const [selectedType, setSelectedType] = useState("");

//   const imgAddress = (item) => {
//     if (item.workoutImage) {
//       return `${domain}/${item.workoutImage}`;
//     } else {
//       return item.imgUrl;
//     }
//   };
//   const exerciseimgAddress = (item) => {
//     if (item.exercises.exerciseImage) {
//       return `${domain}/${item.exercises.exerciseImage}`;
//     } else {
//       return item.imgUrl;
//     }
//   };

//   console.log("workoutData", workoutData);
//   // Handle change in workout type dropdown
//   const handleTypeChange = (event) => {
//     setSelectedType(event.target.value);
//   };

//   // Filter workouts based on selected type
//   const filteredWorkouts = selectedType
//     ? workoutData.filter((item) => item.type === selectedType)
//     : workoutData;

//   return (
//     <div className="p-4">
//       {/* Dropdown for workout types */}
//       <div className="mb-6">
//         <label className="block text-lg font-semibold mb-2">Workout Type</label>
//         <select
//           name="workout types"
//           className="w-full p-2 border rounded"
//           onChange={handleTypeChange}
//         >
//           <option value="">Select Workout Type</option>
//           {workoutData &&
//             workoutData.map((type) => (
//               <option key={type._id} value={type.type}>
//                 {type.type}
//               </option>
//             ))}
//         </select>
//       </div>

//       {filteredWorkouts &&
//         filteredWorkouts.map((item) => (
//           <div key={item._id} className="mb-8">
//             {/* Main Workout Card */}
//             <div className="flex flex-col md:flex-row gap-6">
//               {/* Workout Image */}
//               {/* <div className="md:w-3/5 w-full">
//                 <img
//                   src={`${imgAddress(item)}`}
//                   alt="Workout"
//                   className="w-full h-auto rounded-md shadow"
//                 />
//               </div> */}

//               {/* Workout Details */}
//               <div className="md:w-2/5 w-full space-y-4">
//                 <h2 className="text-2xl font-semibold">{item.name}</h2>
//                 <p>{item.workoutPlanDetails.description}</p>
//                 {/* Display Difficulty Level */}
//                 <p className="text-gray-700 font-bold">
//                   Difficulty: {item.difficulty}
//                 </p>
//               </div>
//             </div>

//             {/* Workout Plan Details */}
//             <div className="mt-8">
//               <h3 className="text-xl font-semibold">Workout Plan Details</h3>
//               <p>{item.planDetails}</p>
//             </div>

//             {/* Exercise Cards */}
//             {item.exercises &&
//               item.exercises.map((exercise) => (
//                 <div
//                   key={exercise.id}
//                   className="flex items-center border justify-between rounded-lg p-6 mt-4 shadow-lg bg-gradient-to-r from-gray-100 to-gray-300"
//                 >
//                   {/* Exercise Image */}
//                   <div className="w-1/3 relative">
//                     <img
//                       src={`${imgAddress(item)}` || "/path/to/placeholder.jpg"} // Use actual image URL
//                       // src={`${exerciseimgAddress(item)}`}
//                       alt={exercise.name}
//                       className="w-full h-auto rounded-lg border-black border shadow-md"
//                     />
//                     {/* Overlay effect or badge on image */}
//                     <div className="absolute top-2 left-2 bg-black text-white py-1 px-3 rounded-full text-xs">
//                       {item.difficulty}
//                     </div>
//                   </div>
//                   <div className="w-1/3 relative">
//                     <img
//                       // src={`${imgAddress(item)}` || "/path/to/placeholder.jpg"} // Use actual image URL
//                       // src={`${exerciseimgAddress(item)}`}
//                       alt={exercise.name}
//                       className="w-full h-auto rounded-lg border-black border shadow-md"
//                     />
//                     {/* Overlay effect or badge on image */}
//                     <div className="absolute top-2 left-2 bg-black text-white py-1 px-3 rounded-full text-xs">
//                       {item.difficulty}
//                     </div>
//                   </div>

//                   {/* Exercise Info */}
//                   <div className="w-2/3 pl-6 flex flex-col justify-between space-y-4">
//                     {/* Title and Icon */}
//                     <div className="flex items-center justify-between">
//                       <h4 className="text-3xl font-bold text-gray-800">
//                         {exercise.name}
//                       </h4>
//                     </div>

//                     {/* Reps, Sets, and Rest */}
//                     <div className="flex items-center justify-around text-lg text-gray-700">
//                       <p>
//                         Sets:{" "}
//                         <span className="font-semibold">{exercise.sets}</span>
//                       </p>
//                       <p>
//                         Reps:{" "}
//                         <span className="font-semibold">{exercise.reps}</span>
//                       </p>
//                       <p>
//                         Rest:{" "}
//                         <span className="font-semibold">
//                           {exercise.rest} sec
//                         </span>
//                       </p>
//                     </div>

//                     {/* Additional Exercise Info */}
//                     <div className="text-sm text-gray-500">
//                       <p>Calories Burned: 200</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         ))}
//     </div>
//   );
// };

// export default WorkoutCardComponent;
