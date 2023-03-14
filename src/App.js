import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';

const style = {
  justifyContent: 'center',
};

function App() {
  return (
    <Box className="App" sx={{ flexGrow: 1 }}>
      <Grid container style={style}>
        <Grid item xs={10}>
          <Header />
        </Grid>
        <Grid item xs={10}>
          <Form />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
