import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import dayjs from 'dayjs';
import AddTraining from './AddTraining';

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

  const fetchTrainings = () => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(error => console.error('Virhe haettaessa treenejä:', error));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const deleteTraining = (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän treenin?')) {
      fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            fetchTrainings();
          } else {
            alert('Treenin poisto epäonnistui.');
          }
        })
        .catch(error => console.error('Virhe poistettaessa treeniä:', error));
    }
  };

  const columns = [
    {
      headerName: 'Päivämäärä',
      field: 'date',
      sortable: true,
      filter: true,
      valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY HH:mm'),
    },
    { headerName: 'Kesto (min)', field: 'duration', sortable: true, filter: true },
    { headerName: 'Liike', field: 'activity', sortable: true, filter: true },
    {
      headerName: 'Asiakas',
      field: 'customer',
      valueGetter: (params) =>
        params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : '',
      sortable: true,
      filter: true,
    },
    {
      headerName: '',
      field: 'id',
      cellRenderer: (params) => (
        <button onClick={() => deleteTraining(params.value)} style={{ backgroundColor: 'red', color: 'white' }}>
          Poista
        </button>
      ),
    },
  ];

  return (
    <div style={{ margin: '20px' }}>
      <h2>TreeniLista</h2>
      <AddTraining fetchTrainings={fetchTrainings} />
      <div className="ag-theme-alpine" style={{ height: 600 }}>
        <AgGridReact
        theme = "legacy"
          rowData={trainings}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={100}
          rowModelType="clientSide"
        />
      </div>
    </div>
  );
};

export default TrainingList;


