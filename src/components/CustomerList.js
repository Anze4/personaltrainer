import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data._embedded.customers));
  }, []);

  const columns = [
    { headerName: 'Etunimi', field: 'firstname', sortable: true, filter: true },
    { headerName: 'Sukunimi', field: 'lastname', sortable: true, filter: true },
    { headerName: 'Sähköposti', field: 'email', sortable: true, filter: true },
    { headerName: 'Puhelin', field: 'phone', sortable: true, filter: true }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact
      theme="legacy"
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        rowModelType="clientSide"
      />
    </div>
  );
};

export default CustomerList;

