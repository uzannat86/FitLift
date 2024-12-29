function BookingRequestCard({ request, onAccept, onDecline }) {
  return (
    <div className='w-full max-w-sm border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5 bg-white'>
      <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {request.client.name}
      </h5>
      <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
        Message: {request.message}
      </p>
      <div className='flex justify-evenly m-4 space-x-4'>
        <button
          onClick={onAccept}
          className='text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800'
        >
          Accept
        </button>
        <button
          onClick={onDecline}
          className='text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800'
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default BookingRequestCard;
