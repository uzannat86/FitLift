import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentExercise from "./CurrentExercise";
import CurrentDay from "./CurrentDay";
import CurrentSplit from "./CurrentSplit";

const MyPlan = () => {
  const [view, setView] = useState("planNameView"); // Set initial view to planNameView
  const [planName, setPlanName] = useState(""); // New state variable for plan name
  const [split, setSplit] = useState([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainingPlan = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/trainingPlans/client-plans`,
          { withCredentials: true }
        );

        // console.log('Fetched training plans:', response.data);

        if (response.data.length > 0) {
          initializeSplit(response.data[0]);
        } else {
          setError("No training plan found.");
        }
      } catch (error) {
        console.error("Error fetching training plan:", error);
        setError("Failed to load your training plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlan();
  }, []);

  const initializeSplit = (trainingPlan) => {
    console.log("Fetched training plan:", trainingPlan); // Inspect the data

    const days = Array.from({ length: trainingPlan.days }, (_, index) => ({
      day: index + 1,
      exercises: trainingPlan.exercises
        .filter((exercise) => exercise.day === index + 1)
        .map((exercise) => ({
          name: exercise.exercise.title, // Map 'title' to 'name'
          description: exercise.exercise.description,
          media: exercise.exercise.media,
          sets: exercise.sets,
          reps: exercise.reps,
          weight: exercise.weight,
          RPE: exercise.RPE,
          notes: exercise.notes,
          completed: false,
        })),
    }));

    setSplit(days);
    setPlanName(trainingPlan.name); // Set the plan's name
  };

  const handleExerciseClick = (exerciseIndex) => {
    setCurrentExerciseIndex(exerciseIndex);
    setView("currentExercise");
  };

  const handleDayClick = (dayIndex) => {
    setCurrentDayIndex(dayIndex);
    setView("currentDay");
  };

  const handleNextExercise = () => {
    setSplit((prevSplit) => {
      const updatedSplit = [...prevSplit];
      const currentDay = updatedSplit[currentDayIndex];
      currentDay.exercises[currentExerciseIndex] = {
        ...currentDay.exercises[currentExerciseIndex],
        completed: true,
      };
      return updatedSplit;
    });

    const currentDay = split[currentDayIndex];
    if (currentExerciseIndex < currentDay.exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      console.log(`Day ${currentDayIndex + 1} completed.`);
      setView("currentSplit");

      if (currentDayIndex < split.length - 1) {
        setCurrentDayIndex((prev) => prev + 1);
        setCurrentExerciseIndex(0);
      }
    }
  };

  if (loading) return <p>Loading your training plan...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="my-plan p-4">
      {view === "planNameView" && (
        <div
          className="flex flex-col w-1/3 items-center gap-4 bg-base-300 p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={() => setView("currentSplit")}
        >
          <h3 className="text-xl font-semibold">Your Training Plan:</h3>
          <h3 className="text-xl font-semibold">{planName}</h3>
        </div>
      )}
      {view === "currentExercise" && split.length > 0 && (
        <CurrentExercise
          exercise={split[currentDayIndex].exercises[currentExerciseIndex]}
          handleNextExercise={handleNextExercise}
          setView={setView}
          dayName={`Day ${split[currentDayIndex].day}`}
        />
      )}
      {view === "currentDay" && split.length > 0 && (
        <CurrentDay
          todayExercises={split[currentDayIndex].exercises}
          onExerciseClick={handleExerciseClick}
          dayName={`Day ${split[currentDayIndex].day}`}
          setView={setView}
        />
      )}
      {view === "currentSplit" && (
        <CurrentSplit
          split={split}
          currentDayIndex={currentDayIndex}
          setCurrentDayIndex={setCurrentDayIndex}
          onDayClick={handleDayClick}
          setView={setView}
        />
      )}
    </div>
  );
};

export default MyPlan;
