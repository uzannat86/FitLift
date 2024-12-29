import React, { useState } from "react";

const CurrentDay = ({ todayExercises, onExerciseClick, dayName, setView }) => {
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion item is open

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the selected accordion item
  };

  // New function to handle exercise click
  const handleExerciseClick = (index) => {
    onExerciseClick(index); // Call the function passed from MyPlan.jsx
  };

  // Function to navigate back to CurrentSplit
  const navigateToCurrentSplit = () => {
    setView("currentSplit"); // Switch to CurrentSplit view
  };

  // CurrentDay.jsx
  const totalExercises = todayExercises.length;
  const completedExercises = todayExercises.filter(
    (exercise) => exercise.completed
  ).length;
  const progressPercentage =
    totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  return (
    <div className="flex p-6 justify-center">
      <div className="current-day p-6 bg-base-300 rounded-xl max-w-lg w-full">
        {/* Navigation Button */}
        <div className="flex justify-center">
          <button
            onClick={navigateToCurrentSplit}
            className="mb-6 w-36 p-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary hover:text-secondary-content transition"
          >
            Your Week {/* Display the current day name */}
          </button>
        </div>

        <h2 className="text-center text-3xl font-bold mb-6"> {dayName}</h2>
        <ul className="space-y-4">
          {todayExercises.map((exercise, index) => (
            <li
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex items-center justify-between w-full p-5 font-medium text-gray-500 bg-primary text-primary-content hover:bg-secondary hover:text-secondary-content focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400"
                aria-expanded={openIndex === index}
              >
                <span className="text-white">
                  {exercise.name}{" "}
                  {exercise.completed && (
                    <span className="text-green-500 border border-white">
                      ✓
                    </span>
                  )}
                </span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                  <table className="w-full text-gray-500 dark:text-gray-400">
                    <thead>
                      <tr>
                        <th className="text-left p-2">Sets</th>
                        <th className="text-left p-2">Reps</th>
                        <th className="text-left p-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        onClick={() => handleExerciseClick(index)}
                        className="cursor-pointer hover:bg-gray-800 "
                      >
                        <td className="p-2">{exercise.sets || "N/A"}</td>
                        <td className="p-2">{exercise.reps || "N/A"}</td>

                        <td className="p-2">
                          {exercise.notes ? exercise.notes.slice(0, 20) : ""}...
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </li>
          ))}
        </ul>
        <progress
          className="progress progress-success w-full"
          value={progressPercentage}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default CurrentDay;
