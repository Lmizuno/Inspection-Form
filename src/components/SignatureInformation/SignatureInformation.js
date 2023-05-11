import React from 'react';
import styles from './SignatureInformation.module.css';
import SignatureComponent from '../SignatureComponent/SignatureComponent';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//import dayjs from 'dayjs';
import { Grid, TextField, Typography } from '@mui/material';


const SignatureItem = (props) => {
  const [state, updateState] = React.useState({});

  const handleNameChange = (e) => {
    setState({
      ...state,
      signatureName: e.target.value
    });
  }

  const onSignatureSave = (data) => {
    //console.log(data);
    setState({
      ...state,
      signatureImage: data
    });
  }

  const setState = (e) => {
    updateState(e);
    props.onChange(e);
  };

  return (
    <>
      <TextField
        fullWidth
        id={props.NameId}
        label={props.NameLabel}
        onChange={handleNameChange}
        value={state.signatureName}
      />
      <SignatureComponent onSave={onSignatureSave} />
    </>
  );
}

const SignatureInformation = (props) => {
  const [state, updateState] = React.useState({});

  const handleDateChange = (e) => {
    setState({
      ...state,
      date: e
    });
  }
  const handlePurchaserOneChange = (e) => {
    setState({
      ...state,
      purchaserOne: e
    });
  }
  const handlePurchaserTwoChange = (e) => {
    setState({
      ...state,
      purchaserTwo: e
    });
  }
  const handleDesignateChange = (e) => {
    setState({
      ...state,
      designate: e
    });
  }

  const setState = (e) => {
    updateState(e);
    props.onChange(e);
  };

  return (
    <div className={styles.SignatureInformation}>
      <Typography gutterBottom >
        Signatures
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SignatureItem
            NameId="purchaserOne"
            NameLabel="Purchaser’s name"
            onChange={handlePurchaserOneChange}
          />
        </Grid>
        <Grid item xs={12}>
          <SignatureItem
            NameId="purchaserTwo"
            NameLabel="Purchaser’s name"
            onChange={handlePurchaserTwoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <SignatureItem
            NameId="designate"
            NameLabel="Designate’s name (Optional)"
            onChange={handleDesignateChange}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of possession"
              value={state.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignatureInformation;
