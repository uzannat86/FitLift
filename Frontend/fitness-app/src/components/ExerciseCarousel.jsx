// ExerciseCarousel.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseCard from './ExerciseCard';

const ExerciseCarousel = ({ onExerciseSelect }) => {
  const [exercisesData, setExercisesData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current exercise
  const [error, setError] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null); // Modal state

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/exercises/all`
        );
        setExercisesData(response.data);
      } catch (err) {
        setError('Failed to load exercises. Please try again.');
        console.error(err);
      }
    };
    fetchExercises();
  }, []);

  const handleReadMore = (exercise) => {
    setSelectedExercise(exercise);
    document.getElementById('my_modal_2').showModal();
  };

  // Function to navigate to the previous exercise
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? exercisesData.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to the next exercise
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === exercisesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Optional: Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [exercisesData]);

  const handleExerciseClick = (exercise) => {
    // Call the onExerciseSelect function passed from the parent component
    if (onExerciseSelect) {
      onExerciseSelect(exercise);
    }
    // Close the modal if necessary
    document.getElementById('exercise_modal').close();
  };

  return (
    <div className='relative w-full p-4'>
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      {exercisesData.length > 0 ? (
        <div className='relative flex justify-center items-center '>
          {/* Left Navigation Button */}
          <button
            onClick={goToPrevious}
            type='button'
            className='absolute left-4 z-30 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800/30 dark:bg-white/30 hover:bg-gray-800/60 dark:hover:bg-white/50 focus:ring-4 focus:ring-gray-800 dark:focus:ring-white focus:outline-none'
            aria-label='Previous Exercise'
          >
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>

          {/* Exercise Card */}
          <div onClick={() => handleExerciseClick(exercisesData[currentIndex])}>
            <ExerciseCard
              key={exercisesData[currentIndex]._id}
              exercise={exercisesData[currentIndex]}
              onReadMore={() => handleReadMore(exercisesData[currentIndex])}
            />
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={goToNext}
            type='button'
            className='absolute right-4 z-30 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800/30 dark:bg-white/30 hover:bg-gray-800/60 dark:hover:bg-white/50 focus:ring-4 focus:ring-gray-800 dark:focus:ring-white focus:outline-none'
            aria-label='Next Exercise'
          >
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
        </div>
      ) : (
        !error && (
          <p className='text-center text-gray-500 mt-4'>Loading exercises...</p>
        )
      )}

      {/* Modal for showing full exercise details */}
      <dialog id='my_modal_2' className='modal'>
        {selectedExercise && (
          <div className='modal-box'>
            <img
              src={selectedExercise.media || 'public/favicon.svg'}
              alt={selectedExercise.title}
              className='w-full rounded-lg mb-4'
            />
            <h3 className='font-bold text-lg'>{selectedExercise.title}</h3>
            <p className='py-4'>{selectedExercise.description}</p>
          </div>
        )}
        <form method='dialog' className='modal-backdrop'>
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ExerciseCarousel;
