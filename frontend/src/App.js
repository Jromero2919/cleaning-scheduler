import React, { useEffect, useState } from 'react';

// Use the environment variable from Render-test
const API_URL = process.env.REACT_APP_API_URL;

export default function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Cleaning Services</h1>
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        services.map(service => (
          <div key={service._id} style={{
            border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px'
          }}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <strong>${service.price}</strong>
            <br />
            <button onClick={() => alert(`Booked ${service.name}`)}>Book Now</button>
          </div>
        ))
      )}
    </div>
  );
}
