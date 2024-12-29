import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExerciseCarousel from './ExerciseCarousel';
import toast from 'react-hot-toast';

function CreateSplit() {
  const [days, setDays] = useState([{}]);

  const [exercises, setExercises] = useState([]); // State to store exercises
  const [error, setError] = useState(null);
  const [currentDayIdx, setCurrentDayIdx] = useState(null);
  const [currentExerciseIdx, setCurrentExerciseIdx] = useState(null);

  // Fetch exercises from backend
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/exercises/all`
        );
        setExercises(response.data);
      } catch (err) {
        setError('Failed to load exercises. Please try again.');
        console.error(err);
      }
    };
    fetchExercises();
  }, []);

  const handleChange = (dayIdx, exerciseIdx) => (e) => {
    const { name, value } = e.target;
    const updatedDays = [...days];
    const exercises = updatedDays[dayIdx].exercises || [];
    exercises[exerciseIdx] = {
      ...exercises[exerciseIdx],
      [name]: value,
    };
    updatedDays[dayIdx].exercises = exercises;
    setDays(updatedDays);
  };

  const handleAddExercise = (dayIdx) => {
    const updatedDays = [...days];
    const exercises = updatedDays[dayIdx].exercises || [];
    exercises.push({
      exercise: '', // Set selected exercise from modal
      sets: '',
      reps: '',
      rpe: '',
      notes: '',
    });
    updatedDays[dayIdx].exercises = exercises;
    setDays(updatedDays);
  };

  const handleAddDay = () => {
    setDays([...days, {}]);
  };

  const handleRemoveDay = (dayIdx) => {
    setDays(days.filter((_, idx) => idx !== dayIdx));
  };

  const handleRemoveExercise = (dayIdx, exerciseIdx) => {
    const updatedDays = [...days];
    updatedDays[dayIdx].exercises.splice(exerciseIdx, 1);
    setDays(updatedDays);
  };

  const openModal = (dayIdx, exerciseIdx) => {
    setCurrentDayIdx(dayIdx);
    setCurrentExerciseIdx(exerciseIdx);
    document.getElementById('exercise_modal').showModal();
  };

  const handleExerciseSelect = (exercise) => {
    // Log the selected exercise's name and ID
    console.log('Selected Exercise Name:', exercise.title);
    console.log('Selected Exercise ID:', exercise._id);

    const updatedDays = [...days];
    const exercises = updatedDays[currentDayIdx].exercises || [];
    exercises[currentExerciseIdx] = {
      ...exercises[currentExerciseIdx],
      exercise: exercise.title, // Store the exercise name
      exerciseId: exercise._id, // Store the exercise ID
    };
    updatedDays[currentDayIdx].exercises = exercises;
    setDays(updatedDays);

    // Close the modal
    document.getElementById('exercise_modal').close();
  };

  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [planName, setPlanName] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!selectedClientId) {
      alert('Please select a client before submitting.');
      return;
    }

    // Assemble the data
    const exercisesData = days.flatMap((day, dayIdx) =>
      (day.exercises || []).map((exercise) => {
        // Create the exercise object with required fields
        const exerciseData = {
          day: dayIdx + 1,
          exercise: exercise.exerciseId, // Use the stored exercise ID
          sets: parseInt(exercise.sets, 10) || 0,
          reps: parseInt(exercise.reps, 10) || 0,
        };

        // Add optional fields only if they are provided
        if (exercise.weight) {
          exerciseData.weight = parseFloat(exercise.weight);
        }

        if (exercise.rpe) {
          exerciseData.RPE = parseInt(exercise.rpe, 10);
        }

        if (exercise.notes) {
          exerciseData.notes = exercise.notes;
        }

        return exerciseData;
      })
    );

    const splitData = {
      name: planName || 'Untitled Plan',
      days: days.length,
      exercises: exercisesData,
      clientId: selectedClientId,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/trainingPlans/create`,
        splitData,
        { withCredentials: true }
      );
      console.log('API URL:', import.meta.env.VITE_API_URL);

      // Set submission status to success
      setSubmissionStatus('success');
      toast.success('Training plan created successfully!');

      // Optionally reset the form
      setPlanName('');
      setSelectedClientId('');
      setDays([{}]);
    } catch (error) {
      console.error('Error saving training plan:', error);
      toast.error('Failed to save training plan. Please try again.');
      // Set submission status to error
      setSubmissionStatus('error');
    }
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/coaches/clients`,
          { withCredentials: true }
        );
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Failed to load clients. Please try again.');
      }
    };
    fetchClients();
  }, []);

  return (
    <div className='container'>
      {submissionStatus === 'success' && (
        <div className='alert alert-success my-4'>
          Training plan created successfully!
        </div>
      )}
      {submissionStatus === 'error' && (
        <div className='alert alert-error my-4'>
          Failed to save training plan. Please try again.
        </div>
      )}

      <h2 className='text-2xl pl-5'>Create Workout Split</h2>

      {days.map((day, dayIdx) => (
        <div key={dayIdx} className='my-4 mx-4'>
          <div className='card bg-base-300 rounded-box p-12 mb-4'>
            <div className='flex justify-between items-center'>
              <h3 className='text-xl'>Day {dayIdx + 1}</h3>
              <button
                className='btn btn-outline btn-sm ml-4'
                onClick={() => handleRemoveDay(dayIdx)}
              >
                Remove Day
              </button>
            </div>

            <table className='table table-bordered table-hover mt-4'>
              <thead>
                <tr>
                  <th className='text-center'>#</th>
                  <th className='text-center'>Exercise</th>
                  <th className='text-center'>Sets</th>
                  <th className='text-center'>Reps</th>
                  <th className='text-center'>Weight (in kg)</th>
                  <th className='text-center'>RPE</th>
                  <th className='text-center'>Notes</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {(day.exercises || []).map((exercise, exerciseIdx) => (
                  <tr key={exerciseIdx}>
                    <td>{exerciseIdx + 1}</td>
                    <td>
                      <button
                        onClick={() => openModal(dayIdx, exerciseIdx)}
                        className='btn btn-secondary'
                      >
                        {exercise.exercise || 'Choose Exercise'}
                      </button>
                    </td>
                    <td>
                      <input
                        type='number'
                        name='sets'
                        value={exercise.sets}
                        onChange={handleChange(dayIdx, exerciseIdx)}
                        placeholder='Sets'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        name='reps'
                        value={exercise.reps}
                        onChange={handleChange(dayIdx, exerciseIdx)}
                        placeholder='Reps'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        name='weight'
                        value={exercise.weight}
                        onChange={handleChange(dayIdx, exerciseIdx)}
                        placeholder='Weight'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <input
                        type='number'
                        name='rpe'
                        value={exercise.rpe}
                        onChange={handleChange(dayIdx, exerciseIdx)}
                        placeholder='RPE'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        name='notes'
                        value={exercise.notes}
                        onChange={handleChange(dayIdx, exerciseIdx)}
                        placeholder='Notes'
                        className='form-control'
                      />
                    </td>
                    <td>
                      <button
                        className='btn btn-outline-danger btn-sm'
                        onClick={() =>
                          handleRemoveExercise(dayIdx, exerciseIdx)
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className='btn btn-primary mt-2 self-start inline-block'
              onClick={() => handleAddExercise(dayIdx)}
            >
              Add Exercise
            </button>
          </div>
        </div>
      ))}
      <div className='my-4 mx-5 mb-20'>
        <div className='flex space-between justify-between'>
          <button onClick={handleAddDay} className='btn btn-secondary'>
            Add Day
          </button>

          <div className='mx-4'>
            <label htmlFor='plan-name' className='mr-2'>
              Plan Name:
            </label>
            <input
              type='text'
              id='plan-name'
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder='Enter plan name'
              className='form-input'
            />
          </div>

          {/* Dropdown for selecting a client */}
          <div className='mx-4'>
            <label htmlFor='client-select' className='mr-2'>
              Assign to Client:
            </label>
            <select
              id='client-select'
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className='form-select'
            >
              <option value=''>--Select a Client--</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            type='submit'
            className='btn btn-primary'
          >
            Submit Split
          </button>
        </div>
      </div>

      {/* Modal for choosing an exercise */}
      <dialog id='exercise_modal' className='modal'>
        <div className='modal-box'>
          <form className='max-w-md mx-auto mb-4'>
            <label
              htmlFor='default-search'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search exercises...'
                required
              />
            </div>
          </form>

          {/* Replace ExerciseCard components with CardCarousel */}
          {error && <p className='text-red-500'>{error}</p>}
          <ExerciseCarousel
            exercises={exercises}
            onExerciseSelect={handleExerciseSelect}
          />
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}

export default CreateSplit;
