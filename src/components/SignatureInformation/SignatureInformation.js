import React from 'react';
import styles from './SignatureInformation.module.css';
import SignatureComponent from '../SignatureComponent/SignatureComponent';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Grid, TextField, Typography } from '@mui/material';

const SignatureInformation = () => {
  const [date, setDate] = React.useState(dayjs());
  const [purchaserOne, setPurchaserOne] = React.useState('');
  const [purchaserTwo, setPurchaserTwo] = React.useState('');
  const [designate, setDesignate] = React.useState('');

  return (
    <div className={styles.SignatureInformation}>
      <Typography gutterBottom >
        Signatures
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="purchaserOne"
            label="Purchaser’s name"
            onChange={(e) => { setPurchaserOne(e.target.value); }}
            value={purchaserOne}
          />
          <SignatureComponent />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="purchaserTwo"
            label="Purchaser’s name"
            onChange={(e) => { setPurchaserTwo(e.target.value); }}
            value={purchaserTwo}
          />
          <SignatureComponent />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="designate"
            label="Designate’s name (Optional)"
            onChange={(e) => { setDesignate(e.target.value); }}
            value={designate}
          />
          <SignatureComponent />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of possession"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignatureInformation;
