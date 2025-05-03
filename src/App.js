import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Navbar from './components/Navbar';
import CustomerDetails from './components/CustomerDetails'; 
import './App.css';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
        <Route path="/customers/:id" element={<CustomerDetails />} />

      </Routes>
    </Router>
  );
}

export default App;

