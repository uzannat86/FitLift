import React, { useEffect, useState } from "react";
import axios from "axios";
import ExerciseCard from "../components/ExerciseCard";

const ExercisePool = () => {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/exercises/all`
        );
        setExercises(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load exercises. Please try again.");
        console.error(err);
      }
    };
    fetchExercises();
  }, []);

  return (
    <div className="exercise-pool p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {exercises.length > 0
        ? exercises.map((exercise) => (
            <ExerciseCard key={exercise._id} exercise={exercise} />
          ))
        : !error && <p>Loading exercises...</p>}
    </div>
  );
};

export default ExercisePool;
