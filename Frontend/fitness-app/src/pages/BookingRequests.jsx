import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingRequestCard from './BookingRequestsCard';

function BookingRequests({ onAccept }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/coaches/bookings`,
          { withCredentials: true }
        );
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching booking requests:', err);
        setError('Failed to load booking requests');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAcceptClick = async (clientId) => {
    try {
      await onAccept(clientId);
      setRequests((prev) => prev.filter((req) => req.client._id !== clientId));
    } catch (error) {
      console.error('Error accepting client:', error);
    }
  };

  if (loading)
    return <p className='dark:text-white'>Loading booking requests...</p>;
  if (error) return <p className='text-red-500 dark:text-red-300'>{error}</p>;
  if (!requests.length)
    return (
      <p className='dark:text-white'>No booking requests at the moment.</p>
    );

  return (
    <div className='p-8 space-y-8'>
      <h2 className='text-3xl font-bold mb-6 dark:text-white'>
        Booking Requests
      </h2>
      <div className='carousel carousel-center rounded-box max-w-full space-x-4 p-4'>
        {requests.map((request) => (
          <div key={request._id} className='carousel-item'>
            <BookingRequestCard
              request={request}
              onAccept={() => handleAcceptClick(request.client._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingRequests;
