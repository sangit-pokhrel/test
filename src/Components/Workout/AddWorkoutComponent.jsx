import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../config/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddWorkout = () => {
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [exercises, setExercises] = useState([
    {
      name: "",
      sets: "",
      reps: "",
      rest: "",
      exerciseImage: null, // Add exerciseImage to each exercise object
    },
  ]);

  const [workoutPlanDetails, setWorkoutPlanDetails] = useState([
    {
      description: "",
      duration: "",
      frequency: "",
    },
  ]);
  const [formData, setFormData] = useState({
    type: "",
    plan: "",
    difficulty: "Beginner",
    // workoutImage: "",
    exercises: [],
    workoutPlanDetails: [],
  });

  // Handle change for input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // handle workout details change
  const handleWorkoutDetailsChange = (index, event) => {
    const newWorkoutDetail = workoutPlanDetails.map((detail, i) => {
      if (i === index) {
        return {
          ...detail,
          [event.target.name]: event.target.value,
        };
      }
      return detail;
    });
    setWorkoutPlanDetails(newWorkoutDetail);

    setFormData({
      ...formData,
      workoutPlanDetails: newWorkoutDetail,
    });
  };

  // handle exercises change
  const handleExerciseChange = (index, event) => {
    const newExercises = exercises.map((detail, i) => {
      if (i === index) {
        return {
          ...detail,
          [event.target.name]: event.target.value,
        };
      }
      return detail;
    });
    setExercises(newExercises);
    setFormData({
      ...formData,
      exercises: newExercises,
    });
  };

  // Add a new exercise box
  const addExercise = () => {
    const updatedExercises = [
      ...exercises,
      { name: "", sets: "", reps: "", rest: "", exerciseImage: null }, // Add exerciseImage here
    ];
    setExercises(updatedExercises);
    setFormData({
      ...formData,
      exercises: updatedExercises,
    });
  };
  // Remove an exercise box
  const removeExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
    setFormData({ ...formData, exercises: newExercises });
  };

  // Handle file change for workout image
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData({
  //     ...formData,
  //     workoutImage: file,
  //   });
  // };

  const handleExerciseImageChange = (index, e) => {
    const updatedExercises = [...formData.exercises];
    updatedExercises[index].exerciseImage = e.target.files[0]; // Store the file in exercise object
    setFormData({ ...formData, exercises: updatedExercises });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("type", formData.type);
    data.append("plan", formData.plan);
    data.append("difficulty", formData.difficulty);
    data.append("workoutImage", formData.workoutImage);

    exercises.forEach((exercise, index) => {
      data.append(`exercises[${index}][name]`, exercise.name);
      data.append(`exercises[${index}][sets]`, exercise.sets);
      data.append(`exercises[${index}][reps]`, exercise.reps);
      data.append(`exercises[${index}][rest]`, exercise.rest);
      data.append(`exercises[${index}][exerciseImage]`, exercise.exerciseImage);
    });

    workoutPlanDetails.forEach((workoutDetail, index) => {
      data.append(
        `workoutPlanDetails[${index}][description]`,
        workoutDetail.description
      );
      data.append(
        `workoutPlanDetails[${index}][duration]`,
        workoutDetail.duration
      );
      data.append(
        `workoutPlanDetails[${index}][frequency]`,
        workoutDetail.frequency
      );
    });

    console.log(data);

    try {
      const response = await axiosInstance.post("/workout/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("responseed", response);
      toast.success(response.data.data.message);
    } catch (error) {
      console.error("Error adding workout:", error);
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  // Fetch workout types on component mount
  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await axiosInstance.get("/workout-type");
        console.log(response);
        setWorkoutTypes(response.data);
        if (response.data.length > 0) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            type: response.data[0].name,
          }));
        }
      } catch (error) {
        console.error("Error fetching workout types:", error);
      }
    };
    fetchWorkoutTypes();
  }, []);

  console.log(formData);

  return (
    <>
      <ToastContainer />
      <motion.form
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ plan: 0.5 }}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg m-8"
      >
        {/* Workout Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Type:
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {workoutTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Workout Plan */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Plan:
          </label>
          <input
            type="text"
            name="plan"
            placeholder="Plan name"
            value={formData.plan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Difficulty */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Difficulty:
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Beginner">Beginner</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Exercise inputs */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Exercises</label>
          {formData.exercises.map((exercise, index) => (
            <div key={index} className="flex flex-col mb-4">
              <div className="flex space-x-4 items-center">
                <input
                  type="text"
                  name="name"
                  placeholder="Exercise Name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, e)}
                  className="border border-gray-300 p-2 rounded-lg w-1/4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  name="sets"
                  placeholder="Sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(index, e)}
                  className="border border-gray-300 p-2 rounded-lg w-1/4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  name="reps"
                  placeholder="Reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(index, e)}
                  className="border border-gray-300 p-2 rounded-lg w-1/4 focus:outline-none focus:border-blue-500"
                  required
                />
                <input
                  type="number"
                  name="rest"
                  placeholder="Rest (seconds)"
                  value={exercise.rest}
                  onChange={(e) => handleExerciseChange(index, e)}
                  className="border border-gray-300 p-2 rounded-lg w-1/4 focus:outline-none focus:border-blue-500"
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="text-red-500 font-bold text-lg"
                  >
                    &times;
                  </button>
                )}
              </div>

              {/* Add file input for each exercise */}
              <input
                type="file"
                name="exerciseImage"
                onChange={(e) => handleExerciseImageChange(index, e)}
                className="mt-2"
                // required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addExercise}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold mt-2 hover:bg-blue-600"
          >
            Add Exercise
          </button>
        </div>

        {/* Workout Plan Details */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Workout Plan Details:
          </label>
          {workoutPlanDetails.map((details, index) => (
            <div key={index}>
              <textarea
                type="text"
                name="description"
                placeholder="Description"
                value={details.description}
                onChange={(e) => handleWorkoutDetailsChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none"
              />
              <textarea
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={details.duration}
                onChange={(e) => handleWorkoutDetailsChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none"
              />
              <input
                type="text"
                name="frequency"
                placeholder="Frequency (e.g., 3 times a week)"
                value={details.frequency}
                onChange={(e) => handleWorkoutDetailsChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Workout Image */}

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Workout Image:
          </label>
          <input
            type="file"
            name="workoutImage"
            // accept="image/*"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
        </div> */}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Workout
        </button>
      </motion.form>
    </>
  );
};
export default AddWorkout;
