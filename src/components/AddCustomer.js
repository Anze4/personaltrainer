import React, { useState } from 'react';

const AddCustomer = ({ fetchData }) => {
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    postcode: '',
    city: ''
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add customer');
        return response.json();
      })
      .then(() => {
        alert('Asiakas lisätty!');
        setCustomer({
          firstname: '',
          lastname: '',
          email: '',
          phone: '',
          streetaddress: '',
          postcode: '',
          city: ''
        });
        fetchData(); 
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Lisää uusi asiakas</h3>
      <input name="firstname" placeholder="Etunimi" value={customer.firstname} onChange={handleChange} required />
      <input name="lastname" placeholder="Sukunimi" value={customer.lastname} onChange={handleChange} required />
      <input name="email" placeholder="Sähköposti" value={customer.email} onChange={handleChange} required />
      <input name="phone" placeholder="Puhelin" value={customer.phone} onChange={handleChange} required />
      <input name="streetaddress" placeholder="Osoite" value={customer.streetaddress} onChange={handleChange} required />
      <input name="postcode" placeholder="Postinumero" value={customer.postcode} onChange={handleChange} required />
      <input name="city" placeholder="Kaupunki" value={customer.city} onChange={handleChange} required />
      <button type="submit">Tallenna</button>
    </form>
  );
};

export default AddCustomer;
