import React from "react";

const WorkoutCardComponent = ({ workoutData }) => {
  const domain = `http://localhost:5000`;

  const imgAddress = (item) => {
    if (item.productImage) {
      return `${domain}/${item.productImage}`;
    } else {
      return item.imgUrl;
    }
  };

  return (
    <div className="p-4">
      {/* Dropdown for workout types */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Workout Type</label>
        <select name="workout types" className="w-full p-2 border rounded">
          {workoutData &&
            workoutData.map((type) => (
              <option key={type._id} value={type.id}>
                {type.type}
              </option>
            ))}
        </select>
      </div>

      {workoutData &&
        workoutData.map((item) => (
          <div key={item._id} className="mb-8">
            {/* Main Workout Card */}
            <div className="flex flex-col md:flex-row gap-6">
              {/* Workout Image */}
              <div className="md:w-3/5 w-full">
                <img
                  src={`${imgAddress(item)}`}
                  alt="Workout"
                  className="w-full h-auto rounded-md shadow"
                />
              </div>

              {/* Workout Details */}
              <div className="md:w-2/5 w-full space-y-4">
                <h2 className="text-2xl font-semibold">{item.name}</h2>
                <p>{item.description}</p>
              </div>
            </div>

            {/* Workout Plan Details */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold">Workout Plan Details</h3>
              <p>{item.planDetails}</p>
            </div>

            {/* Exercise Cards */}
            {item.exercises &&
              item.exercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex border rounded-md p-4 mt-4 shadow-md"
                >
                  {/* Exercise Image (Placeholder or actual image) */}
                  <div className="w-1/3">
                    <img
                      src={exercise.imageUrl || "/path/to/placeholder.jpg"} // Change this to actual image URL if available
                      alt={exercise.name}
                      className="w-full h-auto rounded-md"
                    />
                  </div>

                  {/* Exercise Info */}
                  <div className="w-2/3 pl-4">
                    <h4 className="text-xl font-semibold">{exercise.name}</h4>
                    <p className="text-gray-600">Reps: {exercise.reps}</p>
                    {/* Add any additional info here */}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default WorkoutCardComponent;
