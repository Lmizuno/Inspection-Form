import React from 'react';
import styles from './SignatureInformation.module.css';
import SignatureComponent from '../SignatureComponent/SignatureComponent';
import { Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSignatures } from '../../store/slices/formSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const SignatureItem = ({ id, label, value, onChange }) => {
  const handleNameChange = (e) => {
    onChange(id, {
      signatureName: e.target.value
    });
  }

  const onSignatureSave = (data) => {
    onChange(id, {
      signatureImage: data
    });
  }

  return (
    <>
      <TextField
        fullWidth
        id={id}
        label={label}
        onChange={handleNameChange}
        value={value?.signatureName || ''}
      />
      <SignatureComponent onSave={onSignatureSave} />
    </>
  );
}

const SignatureInformation = () => {
  const dispatch = useDispatch();
  const signatures = useSelector(state => state.form.signatures);

  const handleSignatureChange = (id, data) => {
    dispatch(updateSignatures({
      [id]: { ...signatures[id], ...data }
    }));
  }

  const handleDateChange = (date) => {
    dispatch(updateSignatures({
      date
    }));
  }

  return (
    <div className={styles.SignatureInformation}>
      <Typography gutterBottom>
        Signatures
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SignatureItem
            id="purchaserOne"
            label="Purchaser's name"
            value={signatures.purchaserOne}
            onChange={handleSignatureChange}
          />
        </Grid>
        <Grid item xs={12}>
          <SignatureItem
            id="purchaserTwo"
            label="Purchaser's name"
            value={signatures.purchaserTwo}
            onChange={handleSignatureChange}
          />
        </Grid>
        <Grid item xs={12}>
          <SignatureItem
            id="designate"
            label="Designate's name (Optional)"
            value={signatures.designate}
            onChange={handleSignatureChange}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of possession"
              value={signatures.date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignatureInformation;
