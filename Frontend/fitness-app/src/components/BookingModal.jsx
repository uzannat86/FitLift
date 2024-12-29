import React, { useState } from 'react';

function BookingModal({
  isOpen,
  onClose,
  onSendRequest,
  coach,
  isSendingRequest,
}) {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendRequest(message);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 w-96'>
        <h2 className='text-2xl font-semibold mb-4'>Send a Booking Request</h2>
        <p>Coach: {coach?.name}</p>
        <form onSubmit={handleSubmit} className='mt-4'>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='Write your message...'
            className='w-full p-2 border rounded'
            rows={4}
            required
          ></textarea>
          <div className='flex justify-end mt-4'>
            <button
              type='button'
              onClick={onClose}
              className='px-4 py-2 mr-2 bg-gray-300 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded flex items-center'
              disabled={isSendingRequest}
            >
              {isSendingRequest ? (
                <span className='spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2'></span>
              ) : (
                'Send Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
