import React, { useEffect, useState, useRef } from 'react';

const CurrentExercise = ({
  exercise,
  handleNextExercise,
  dayName,
  setView,
}) => {
  const [startTime, setStartTime] = useState(null);
  const [isEditable, setIsEditable] = useState({ currentEditable: '' });

  // Refs for each adjustable field
  const setsRef = useRef(null);
  const repsRef = useRef(null);
  const rpeRef = useRef(null);
  const notesRef = useRef(null);
  const containerRef = useRef(null); // Ref for the entire component

  useEffect(() => {
    // Start timing when exercise loads
    setStartTime(new Date());
  }, [exercise]);

  const handleDoubleClick = (fieldId) => {
    setIsEditable({ currentEditable: fieldId });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click target is outside all editable fields
      if (
        setsRef.current &&
        !setsRef.current.contains(event.target) &&
        repsRef.current &&
        !repsRef.current.contains(event.target) &&
        rpeRef.current &&
        !rpeRef.current.contains(event.target) &&
        notesRef.current &&
        !notesRef.current.contains(event.target)
      ) {
        setIsEditable({ currentEditable: '' }); // Close edit mode if clicked outside all fields
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onNextExerciseClick = () => {
    const endTime = new Date();
    const timeSpent = (endTime - startTime) / 1000; // Time in seconds
    console.log(`Time spent on ${exercise.name}: ${timeSpent} seconds`);

    // Update exercise values from refs before proceeding to the next exercise
    const updatedExercise = {
      name: exercise.name,
      sets: setsRef.current.value,
      reps: repsRef.current.value,
      RPE: rpeRef.current.value,
      notes: notesRef.current.value,
    };
    console.log('Updated Exercise:', updatedExercise);

    handleNextExercise(); // This will update the completed status in MyPlan.jsx
  };

  // Define navigateToCurrentDay function
  const navigateToCurrentDay = () => {
    setView('currentDay'); // Switch to the CurrentDay view
  };

  return (
    <div
      ref={containerRef}
      className='current-exercise p-6 bg-base-300 rounded-xl max-w-lg mx-auto'
    >
      <div className='flex justify-center'>
        {/* Day Navigation Button */}
        <button
          onClick={navigateToCurrentDay}
          className='mb-6 w-36 p-3 bg-secondary text-white font-semibold rounded-md hover:bg-secondary hover:text-secondary-content transition'
        >
          {dayName} {/* Display the current day name */}
        </button>
      </div>
      <h2 className='text-3xl p-3 font-bold mb-6 text-center'>
        {exercise.name}
      </h2>

      <a href='#' className='flex-1'>
        <img
          className='w-48 h-full object-cover rounded-t-lg'
          src={exercise.media || 'public/favicon.svg'}
          alt={`${exercise.media} image`}
        />
      </a>

      <div className='space-y-4'>
        <div className='flex w-full  gap-4 mb-3'>
          {/* Sets */}
          <div className='form-control w-full max-w-xs group'>
            <div className='label'>
              <span className='label-text text-gray-500'>Sets:</span>
            </div>
            <div className='relative group w-full'>
              {!isEditable.currentEditable && (
                <span className='absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity'>
                  Double-click to edit
                </span>
              )}
            </div>

            <div className='relative w-full'>
              <div className='absolute ri'>
                <input
                  type='number'
                  defaultValue={exercise.sets}
                  ref={setsRef}
                  readOnly={isEditable.currentEditable !== 'sets'}
                  onDoubleClick={() => handleDoubleClick('sets')}
                  className={`input w-full max-w-xs text-2xl  font-bold tracking-tight ${
                    isEditable.currentEditable === 'sets'
                      ? 'input-bordered bg-white text-black dark:bg-gray-800  dark:text-white cursor-text placeholder-black dark:placeholder-white'
                      : 'input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white'
                  }`}
                  style={{
                    border: isEditable.currentEditable === 'sets' ? '' : 'none',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Reps */}
          <div className='form-control w-full max-w-xs group'>
            <div className='label'>
              <span className='label-text text-gray-500'>Reps:</span>
            </div>
            <div className='relative group w-full'>
              {!isEditable.currentEditable && (
                <span className='absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity'>
                  Double-click to edit
                </span>
              )}
            </div>

            <div className='relative w-full'>
              <input
                type='number'
                defaultValue={exercise.reps}
                ref={repsRef}
                readOnly={isEditable.currentEditable !== 'reps'}
                onDoubleClick={() => handleDoubleClick('reps')}
                className={`input w-full max-w-xs text-2xl font-bold tracking-tight ${
                  isEditable.currentEditable === 'reps'
                    ? 'input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white'
                    : 'input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white'
                }`}
                style={{
                  border: isEditable.currentEditable === 'reps' ? '' : 'none',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* RPE */}
          <div className='form-control w-full max-w-xs group'>
            <div className='label'>
              <span className='label-text text-gray-500'>RPE:</span>
            </div>
            <div className='relative group w-full'>
              {!isEditable.currentEditable && (
                <span className='absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity'>
                  Double-click to edit
                </span>
              )}
            </div>

            <div className='relative w-full'>
              <input
                type='number'
                defaultValue={exercise.RPE}
                ref={rpeRef}
                readOnly={isEditable.currentEditable !== 'RPE'}
                onDoubleClick={() => handleDoubleClick('RPE')}
                className={`input w-full max-w-xs text-2xl font-bold tracking-tight ${
                  isEditable.currentEditable === 'RPE'
                    ? 'input-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white'
                    : 'input-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white'
                }`}
                style={{
                  border: isEditable.currentEditable === 'RPE' ? '' : 'none',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className='form-control w-full group'>
          <div className='label'>
            <span className='label-text text-gray-500'>Notes:</span>
          </div>
          <div className='relative group w-full'>
            {!isEditable.currentEditable && (
              <span className='absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity'>
                Double-click to edit
              </span>
            )}
          </div>

          <div className='relative w-full'>
            <textarea
              defaultValue={exercise.notes}
              ref={notesRef}
              readOnly={isEditable.currentEditable !== 'notes'}
              onDoubleClick={() => handleDoubleClick('notes')}
              className={`textarea w-full  text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === 'notes'
                  ? 'textarea-bordered bg-white text-black dark:bg-gray-800 dark:text-white cursor-text placeholder-black dark:placeholder-white'
                  : 'textarea-ghost bg-transparent dark:bg-transparent cursor-default placeholder-white dark:placeholder-white'
              }`}
              rows='3'
              style={{
                border: isEditable.currentEditable === 'notes' ? '' : 'none',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
        {/* Submit Button */}
        <button
          onClick={onNextExerciseClick}
          className='mt-6  p-3 bg-primary text-white font-semibold rounded-md hover:bg-secondary hover:text-secondary-content transition'
        >
          Exercise Complete
        </button>
      </div>
    </div>
  );
};

export default CurrentExercise;
