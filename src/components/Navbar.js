import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => (
  <AppBar position="static">
    <Toolbar>
      <Button color="inherit" component={Link} to="/">Asiakkaat</Button>
      <Button color="inherit" component={Link} to="/trainings">Harjoitukset</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;


