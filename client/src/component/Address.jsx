import React, { useState } from 'react';

const dummyAddresses = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main Street, Springfield, IL 62701',
    phone: '+1 555-123-4567',
  },
  {
    id: 2,
    name: 'Jane Smith',
    address: '456 Oak Avenue, Chicago, IL 60611',
    phone: '+1 555-987-6543',
  },
  {
    id: 3,
    name: 'Mark Johnson',
    address: '789 Maple Drive, Skokie, IL 60076',
    phone: '+1 555-234-5678',
  },
];

const Address = () => {
  const [addresses, setAddresses] = useState(dummyAddresses);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (id) => {
    const selected = addresses.find(address => address.id === id);
    setSelectedAddress(selected);
  };

  const handleAddAddress = () => {
    const newAddress = {
      id: addresses.length + 1,
      name: 'New User',
      address: '111 New Street, New York, NY 10001',
      phone: '+1 555-555-5555',
    };
    setAddresses([...addresses, newAddress]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Manage Addresses</h1>
      
      <div style={{ marginBottom: '20px' }}>
        {addresses.map(address => (
          <div
            key={address.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: selectedAddress?.id === address.id ? '#f0f8ff' : 'white',
            }}
          >
            <p><strong>Name:</strong> {address.name}</p>
            <p><strong>Address:</strong> {address.address}</p>
            <p><strong>Phone:</strong> {address.phone}</p>
            <button onClick={() => handleSelectAddress(address.id)}>
              {selectedAddress?.id === address.id ? 'Selected' : 'Select'}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddAddress}
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add New Address
      </button>

      {selectedAddress && (
        <div style={{ marginTop: '30px' }}>
          <h2>Selected Address</h2>
          <p><strong>Name:</strong> {selectedAddress.name}</p>
          <p><strong>Address:</strong> {selectedAddress.address}</p>
          <p><strong>Phone:</strong> {selectedAddress.phone}</p>
        </div>
      )}
    </div>
  );
};

export default Address;
