import React from 'react';

function ClientCard({ client }) {
  if (!client) {
    return null; // Don't render anything if client is undefined
  }

  return (
    <div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='px-5 pb-5'>
        <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          {client.name || 'Unknown Client'}
        </h5>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
          Started:{' '}
          {client.startedDate
            ? new Date(client.startedDate).toLocaleDateString()
            : 'N/A'}
        </p>
        {/* Progress Bar */}
        <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4'>
          <div
            className='bg-blue-600 h-2.5 rounded-full'
            style={{ width: `${client.progress || 0}%` }}
          ></div>
        </div>
        <div className='flex items-center justify-between mt-4'>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Progress: {client.progress || 0}%
          </span>
          <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientCard;
