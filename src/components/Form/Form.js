import React from 'react';
import styles from './Form.module.css';
import DynamicTable from '../DynamicTable/DynamicTable';
import { Button, Grid, TextField, Typography } from '@mui/material';
import BuilderInformation from '../BuilderInformation/BuilderInformation';
import HomeInformation from '../HomeInformation/HomeInformation';
import SignatureInformation from '../SignatureInformation/SignatureInformation';
import { useDispatch, useSelector } from 'react-redux';
import { updateUnitEnrolment, updatePossessionDate } from '../../store/slices/formSlice';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { jsPDF } from "jspdf";

const Form = () => {
  const dispatch = useDispatch();
  const formState = useSelector(state => state.form);
  const [date, setDate] = React.useState(dayjs());

  const handleUnitEnrolmentChange = (e) => {
    dispatch(updateUnitEnrolment(e.target.value));
  }

  const handleDateChange = (e) => {
    dispatch(updatePossessionDate(e));
  }

  const makePDF = () => {

    console.log(formState);

    //what about we build a basic html page and use html2canvas to print it

    
    // const doc = new jsPDF();

    // doc.setFontSize(40);
    // doc.text("Pre-Delivery Inspection Form", 15, 25);
    
    // doc.setFontSize(20);
    // doc.text(date.toDate().toDateString(), 15, 35);
    // doc.text(`Unit: ${state.unitEnrolment}`, 100, 35);


    // // let count = 1;
    // // state.inspectedItems.map( e => {

    // //   if(e.image){
    // //     doc.addImage(e.img, "JPEG", 15, (40 * count) + 180, 180, 180);
    // //   }
      
    // // });
    
    // var headers = createHeaders([
    //   "itemNumber",
    //   "location",
    //   "description",
    //   "image"
    // ]);

    // doc.table(1, 1, state.inspectedItems, headers, { autoSize: true });

    // //console.log(date.toDate().toDateString());
    // //http://raw.githack.com/MrRio/jsPDF/master/index.html
    // //https://github.com/parallax/jsPDF 

    // //doc.autoPrint();
    // doc.save(`PDIF-UNIT${state.unitEnrolment}-${"date"}.pdf`);
  }

  return (
    <div className={styles.Form}>
      <DynamicTable />
      <Typography style={{ marginBottom: "20px", marginTop: "50px" }} variant="h5" component="h2">
        Vendor/Builder and Home Address Information
      </Typography>
      <Grid container style={{ justifyContent: "center" }} spacing={2}>
        <Grid item>
          <TextField
            id="unitEnrolment"
            label="Unit Enrolment #"
            onChange={handleUnitEnrolmentChange}
            value={formState.unitEnrolment}
          />
        </Grid>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of possession"
              value={formState.possessionDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <BuilderInformation />
      <HomeInformation />
      <SignatureInformation />
      <Button onClick={makePDF}>
        Save and Print
      </Button>
    </div>
  )
};

export default Form;
