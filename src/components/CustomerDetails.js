import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
  const { id } = useParams();  
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Asiakasta ei löytynyt');
        }
        return response.json();
      })
      .then(data => setCustomer(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return <p>Virhe: {error}</p>;
  }

  if (!customer) {
    return <p>Ladataan asiakastietoja...</p>;
  }

  return (
    <div>
      <h2>Asiakastiedot</h2>
      <p><strong>Etunimi:</strong> {customer.firstname}</p>
      <p><strong>Sukunimi:</strong> {customer.lastname}</p>
      <p><strong>Osoite:</strong> {customer.streetaddress}</p>
      <p><strong>Postinumero:</strong> {customer.postcode}</p>
      <p><strong>Kaupunki:</strong> {customer.city}</p>
      <p><strong>Sähköposti:</strong> {customer.email}</p>
      <p><strong>Puhelin:</strong> {customer.phone}</p>
    </div>
  );
};

export default CustomerDetails;
