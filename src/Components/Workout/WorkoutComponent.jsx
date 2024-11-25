import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutCardComponent from "./WorkoutCardComponent";
import transition from "../../transition";

const domain = "http://localhost:5000";

const WorkoutComponent = () => {
  const [workouts, setworkout] = useState([]);
  const fetchworkout = async () => {
    try {
      const response = await axios.get(`${domain}/api/workout`);
      console.log("response", response.data);
      setworkout(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  useEffect(() => {
    fetchworkout();
  }, []);

  return (
    <>
      {workouts.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <WorkoutCardComponent workoutData={workouts} />
      )}
    </>
  );
};

export default transition(WorkoutComponent);
