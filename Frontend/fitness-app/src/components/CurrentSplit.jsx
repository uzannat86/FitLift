// CurrentSplit.jsx
import React, { useEffect } from "react";

const CurrentSplit = ({
  split,
  setSplit,
  currentDayIndex,
  setCurrentDayIndex,
  setCurrentExerciseIndex,
  onDayClick,
  setView,
}) => {
  const handleClick = (index) => {
    onDayClick(index); // Call the function passed from MyPlan.jsx
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col items-center w-full max-w-4xl">
        <div className="flex flex-col items-center w-full mb-6">
          <h2
            className="text-center text-3xl font-bold cursor-pointer"
            onClick={() => setView("planNameView")}
          >
            Your Split
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {split.map((day, index) => {
            // Calculate progressPercentage for the day
            const totalExercises = day.exercises.length;
            const completedExercises = day.exercises.filter(
              (exercise) => exercise.completed
            ).length;
            const progressPercentage =
              totalExercises > 0
                ? (completedExercises / totalExercises) * 100
                : 0;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-4 bg-base-300 p-6 rounded-lg shadow-lg cursor-pointer"
                onClick={() => handleClick(index)}
              >
                <h3 className="text-xl font-semibold">Day {day.day}</h3>
                <ul className="list-disc">
                  {day.exercises.map((exercise, exIndex) => (
                    <li key={exIndex}>
                      <p className="font-medium">{exercise.name}</p>
                    </li>
                  ))}
                </ul>
                <progress
                  className="progress progress-success w-56"
                  value={progressPercentage}
                  max="100"
                ></progress>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CurrentSplit;
