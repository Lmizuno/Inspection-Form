import React from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';
import DynamicTable from '../DynamicTable/DynamicTable';
import { Grid, TextField, Typography } from '@mui/material';
import BuilderInformation from '../BuilderInformation/BuilderInformation';
import HomeInformation from '../HomeInformation/HomeInformation';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Form = () => {
  const [state, setState] = React.useState({});
  const [date, setDate] = React.useState(dayjs());

  const handleUnitEnrolmentChange = (e) => {
    setState({
      ...state,
      unitEnrolment: e.target.value
    });
  }

  return (
    <div className={styles.Form}>
      <DynamicTable />
      <Typography style={{ marginBottom: "20px", marginTop: "50px" }} variant="h5" component="h2">Vendor/Builder and Home Address Information</Typography>
      <Grid container style={{ justifyContent: "center" }} spacing={2}>
        <Grid item>
          <TextField
            id="unitEnrolment"
            label="Unit Enrolment #"
            onChange={handleUnitEnrolmentChange}
            value={state.unitEnrolment}
          />
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker

              label="Date of possession"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <BuilderInformation />
      <HomeInformation />
    </div>
  )
};

Form.propTypes = {};

Form.defaultProps = {};

export default Form;
