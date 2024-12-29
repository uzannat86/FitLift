import React, { useState, useEffect } from 'react';
import MyClients from './MyClients';
import BookingRequests from './BookingRequests';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CoachDash() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/coaches/clients`,
        { withCredentials: true }
      );
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAccept = async (clientId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/coaches/accept-client`,
        { clientId },
        { withCredentials: true }
      );
      fetchClients(); // Fetch updated clients list after accepting a request
    } catch (error) {
      console.error('Error accepting client:', error);
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Coach Dashboard</h1>

      {/* Booking Requests Section */}
      <BookingRequests onAccept={handleAccept} />

      {/* My Clients Section */}
      <div className='mt-8'>
        <MyClients clients={clients} />
      </div>

      {/* Buttons */}
      <div className='flex justify-center gap-4 mt-8'>
        <button
          onClick={() => navigate('/CreateExercise')}
          className='text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800'
        >
          Create Exercise
        </button>
        <button
          onClick={() => navigate('/CreateSplit')}
          className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800'
        >
          Create Workout Split
        </button>
        <button
          onClick={() => navigate('/startcoaching')}
          className='text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800'
        >
          Start Your Coaching Career
        </button>
      </div>
    </div>
  );
}

export default CoachDash;
