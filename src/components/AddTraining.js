import React, { useState, useEffect } from 'react';

const AddTraining = ({ fetchTrainings }) => {
  const [customers, setCustomers] = useState([]);
  const [training, setTraining] = useState({
    date: '',
    duration: '',
    activity: '',
    customer: ''
  });

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data._embedded.customers));
  }, []);

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const handleCustomerChange = (e) => {
    setTraining({ ...training, customer: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(training)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Treeniä ei voitu lisätä');
        }
        return response.json();
      })
      .then(data => {
        fetchTrainings(); // päivitä treenilista
        setTraining({ date: '', duration: '', activity: '', customer: '' }); // tyhjennä lomake
      })
      .catch(error => console.error(error));
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Lisää uusi treeni</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Päivämäärä (ISO): </label>
          <input
            type="datetime-local"
            name="date"
            value={training.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Liike: </label>
          <input
            type="text"
            name="activity"
            value={training.activity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Kesto (min): </label>
          <input
            type="number"
            name="duration"
            value={training.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Asiakas: </label>
          <select name="customer" value={training.customer} onChange={handleCustomerChange} required>
            <option value="">Valitse asiakas</option>
            {customers.map((cust) => (
              <option key={cust.firstname + cust.lastname} value={cust._links.self.href}>
                {cust.firstname} {cust.lastname}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Lisää treeni</button>
      </form>
    </div>
  );
};

export default AddTraining;
