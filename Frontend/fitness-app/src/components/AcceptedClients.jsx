import React from 'react';
import ClientCard from './ClientCard';

function AcceptedClients({ clients }) {
  return (
    <div className='carousel carousel-center rounded-box max-w-full space-x-4 p-4'>
      {clients.map((client) => (
        <div key={client._id} className='carousel-item'>
          <ClientCard client={client} />
        </div>
      ))}
    </div>
  );
}

export default AcceptedClients;
