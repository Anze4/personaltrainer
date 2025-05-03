import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';

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

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings')
      .then(response => response.json())
      .then(data => setTrainings(data._embedded.trainings));
  }, []);

  const columns = [
    {
      headerName: 'Päivämäärä',
      field: 'date',
      sortable: true,
      filter: true,
      valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm')
    },
    { headerName: 'Kesto (min)', field: 'duration', sortable: true, filter: true },
    { headerName: 'Liike', field: 'activity', sortable: true, filter: true },
    {
      headerName: 'Asiakas',
      field: 'customer',
      valueGetter: params =>
        params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : '',
      sortable: true,
      filter: true
    }
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact
      theme="legacy"
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
        rowModelType="clientSide"
      />
    </div>
  );
};

export default TrainingList;

