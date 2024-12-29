import React from 'react';
import ClientCard from '../components/ClientCard';

function MyClients({ clients }) {
  return (
    <div className='p-8'>
      <h2 className='text-3xl font-bold mb-6'>My Clients</h2>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {clients.length > 0 ? (
          clients.map((client) => (
            <ClientCard key={client._id} client={client} />
          ))
        ) : (
          <p>No clients yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyClients;
