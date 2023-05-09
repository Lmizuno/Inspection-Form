import React from 'react';
import styles from './Form.module.css';
import DynamicTable from '../DynamicTable/DynamicTable';
import { Button, Grid, TextField, Typography } from '@mui/material';
import BuilderInformation from '../BuilderInformation/BuilderInformation';
import HomeInformation from '../HomeInformation/HomeInformation';
import SignatureInformation from '../SignatureInformation/SignatureInformation';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";

const Form = () => {
  const [state, setState] = React.useState({});
  const [date, setDate] = React.useState(dayjs());

  const handleUnitEnrolmentChange = (e) => {
    setState({
      ...state,
      unitEnrolment: e.target.value
    });
  }

  const handleDynamicTableChange = (e) => {
    setState({
      ...state,
      inspectedItems: e.target.value
    });
  }

  const makePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(40);
    doc.text("Pre-Delivery Inspection Form", 15, 25);
    
    doc.setFontSize(20);
    doc.text(date.toDate().toDateString(), 15, 35);
    doc.text(`Unit: ${state.unitEnrolment}`, 100, 35);

    doc.save(`PDIF-${"date"}.pdf`);

    //console.log(date.toDate().toDateString());
    //http://raw.githack.com/MrRio/jsPDF/master/index.html
    //https://github.com/parallax/jsPDF 
  }

  return (
    <div className={styles.Form}>
      <DynamicTable 
        value={state.inspectedItems} 
        onChange={handleDynamicTableChange}
      />
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
      <SignatureInformation/>
      <Button onClick={makePDF}>
        Save and Print
      </Button>
    </div>
  )
};

Form.propTypes = {};

Form.defaultProps = {};

export default Form;
