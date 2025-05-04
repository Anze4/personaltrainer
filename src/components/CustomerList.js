import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import AddCustomer from './AddCustomer'; 
import EditCustomer from './EditCustomer';
import { CSVLink } from 'react-csv';

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  PaginationModule,
  ValidationModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  PaginationModule,
  ValidationModule,
]);

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const fetchData = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data._embedded.customers));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateCustomer = (customer) => {
    fetch(customer._links.self.href, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phone: customer.phone,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        setEditingCustomer(null);
        fetchData();
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (customer) => {
    if (window.confirm(`Haluatko varmasti poistaa asiakkaan ${customer.firstname} ${customer.lastname}?`)) {
      fetch(customer._links.self.href, {
        method: 'DELETE'
      })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        fetchData(); 
      })
      .catch(err => console.error(err));
    }
  };

  const columns = [
    { headerName: 'Etunimi', field: 'firstname', sortable: true, filter: true },
    { headerName: 'Sukunimi', field: 'lastname', sortable: true, filter: true },
    { headerName: 'Osoite', field: 'streetaddress', sortable: true, filter: true },
    { headerName: 'Postinumero', field: 'postcode', sortable: true, filter: true },
    { headerName: 'Kaupunki', field: 'city', sortable: true, filter: true },
    { headerName: 'Sähköposti', field: 'email', sortable: true, filter: true },
    { headerName: 'Puhelin', field: 'phone', sortable: true, filter: true },
    {
      headerName: 'Toiminnot',
      field: 'actions',
      cellRenderer: (props) => (
        <div>
          <button className="edit-btn" onClick={() => setEditingCustomer(props.data)}>Muokkaa</button>
          <button className="delete-btn" onClick={() => handleDelete(props.data)}>Poista</button>
        </div>
      )
    }
  ];

  const csvData = customers.map(c => ({
    Etunimi: c.firstname,
    Sukunimi: c.lastname,
    Osoite: c.streetaddress,
    Postinumero: c.postcode,
    Kaupunki: c.city,
    Sähköposti: c.email,
    Puhelin: c.phone
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Asiakaslista</h2>

      <AddCustomer fetchData={fetchData} />

      {editingCustomer && (
        <EditCustomer
          customer={editingCustomer}
          updateCustomer={updateCustomer}
          cancelEdit={() => setEditingCustomer(null)}
        />
      )}

      <CSVLink
        data={csvData}
        filename="asiakkaat.csv"
        className="btn btn-primary"
        style={{ marginBottom: '10px', display: 'inline-block' }}
      >
        Vie CSV
      </CSVLink>

      <div className="ag-theme-alpine" style={{ height: 600 }}>
        <AgGridReact
        theme = "legacy"
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={100}
          rowModelType="clientSide"
        />
      </div>
    </div>
  );
};

export default CustomerList;




