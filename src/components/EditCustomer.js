import React, { useState, useEffect } from 'react';

const EditCustomer = ({ customer, updateCustomer, cancelEdit }) => {
  const [editedCustomer, setEditedCustomer] = useState(customer);

  useEffect(() => {
    setEditedCustomer(customer);
  }, [customer]);

  const handleChange = (e) => {
    setEditedCustomer({ ...editedCustomer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCustomer(editedCustomer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Muokkaa asiakasta</h3>
      <input name="firstname" value={editedCustomer.firstname} onChange={handleChange} required />
      <input name="lastname" value={editedCustomer.lastname} onChange={handleChange} required />
      <input name="email" value={editedCustomer.email} onChange={handleChange} required />
      <input name="phone" value={editedCustomer.phone} onChange={handleChange} required />
      <input name="streetaddress" value={editedCustomer.streetaddress} onChange={handleChange} required />
      <input name="postcode" value={editedCustomer.postcode} onChange={handleChange} required />
      <input name="city" value={editedCustomer.city} onChange={handleChange} required />
      <button type="submit">Tallenna</button>
      <button type="button" onClick={cancelEdit}>Peruuta</button>
    </form>
  );
};

export default EditCustomer;
