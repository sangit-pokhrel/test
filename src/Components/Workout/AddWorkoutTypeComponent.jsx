import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutTypeComponent = () => {
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [workoutTypeName, setWorkoutTypeName] = useState("");
  const [workoutDescription, setWorkoutDescription] = useState("");
  const [editingType, setEditingType] = useState(false);
  const [workoutTypeId, setWorkoutTypeId] = useState("");

  const workoutTypeData = {
    name: workoutTypeName,
    description: workoutDescription,
  };

  const fetchWorkoutTypes = async () => {
    try {
      const response = await axiosInstance.get("/workout-type");
      console.log(response);
      setWorkoutTypes(response.data);
    } catch (error) {
      console.log("Error fetching workout types", error);
      toast.error("Failed to fetch workout types");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingType) {
        const editResponse = await axiosInstance.put(
          `/workout-type/update/${workoutTypeId}`,
          workoutTypeData
        );
        console.log("er", editResponse);
        toast.success(editResponse.data.message);
        setEditingType(false);
      } else {
        const response = await axiosInstance.post(
          "/workout-type/create",
          workoutTypeData
        );
        console.log(response);
        toast.success(response.data.message);
        setWorkoutTypeName("");
        setWorkoutDescription("");
      }
      fetchWorkoutTypes();
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred");
    }
  };

  const handleEdit = (workoutType) => {
    setEditingType(true);
    setWorkoutTypeName(workoutType.name);
    setWorkoutDescription(workoutType.description);
    setWorkoutTypeId(workoutType._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/workout-type/delete/${id}`);
      console.log(response);
      toast.success(response.data.message);
      await fetchWorkoutTypes();
    } catch (error) {
      console.log("Error deleting workout type:", error);
      toast.error(error.response?.data?.msg || "Failed to delete workout type");
    }
  };

  useEffect(() => {
    fetchWorkoutTypes();
  }, []);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label className="block text-sm font-bold mb-2">
            Workout Type Name
          </label>
          <input
            type="text"
            value={workoutTypeName}
            onChange={(e) => setWorkoutTypeName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={workoutDescription}
            onChange={(e) => setWorkoutDescription(e.target.value)}
            className="border rounded p-2 w-full"
            // required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          {editingType ? "Update Workout Type" : "Add Workout Type"}
        </button>
      </form>

      <div>
        <h2 className="text-lg font-bold mb-2">Workout Types</h2>
        <ul>
          {workoutTypes.map((type) => (
            <li
              key={type._id}
              className="flex justify-between items-center mb-2"
            >
              <span>{type.name}</span>
              <div>
                <AiFillEdit
                  onClick={() => handleEdit(type)}
                  className="cursor-pointer text-blue-500 mr-2"
                />
                <AiFillDelete
                  onClick={() => handleDelete(type._id)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default WorkoutTypeComponent;
