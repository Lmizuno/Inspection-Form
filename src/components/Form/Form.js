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
    // Create PDF in portrait, A4 size (210 x 297 mm)
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Set initial y position for content
    let yPos = 20;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;

    // Helper function to check and add new page if needed
    const checkNewPage = (heightNeeded) => {
      if (yPos + heightNeeded > pageHeight - margin) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // Header
    doc.setFontSize(24);
    doc.text("Pre-Delivery Inspection Form", margin, yPos);
    yPos += 15;

    // Date and Unit info
    doc.setFontSize(12);
    doc.text(`Date: ${date.toDate().toDateString()}`, margin, yPos);
    doc.text(`Unit: ${formState.unitEnrolment}`, 120, yPos);
    yPos += 10;

    // Builder Information
    doc.setFontSize(14);
    doc.text("Builder Information", margin, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text(`Builder License: ${formState.builderInfo.builderLicence}`, margin, yPos);
    yPos += 6;
    doc.text(`Builder Name: ${formState.builderInfo.builderName}`, margin, yPos);
    yPos += 6;
    doc.text(`Representative: ${formState.builderInfo.representative}`, margin, yPos);
    yPos += 10;

    // Home Information
    checkNewPage(40);
    doc.setFontSize(14);
    doc.text("Home Information", margin, yPos);
    yPos += 8;
    doc.setFontSize(10);
    doc.text(`Address: ${formState.homeInfo.address}`, margin, yPos);
    yPos += 6;
    doc.text(`Project: ${formState.homeInfo.projectName}`, margin, yPos);
    yPos += 6;
    doc.text(`Unit: ${formState.homeInfo.unit}, Level: ${formState.homeInfo.level}`, margin, yPos);
    yPos += 10;

    // Inspected Items Table
    checkNewPage(20);
    doc.setFontSize(14);
    doc.text("Inspected Items", margin, yPos);
    yPos += 10;

    // Create table for inspected items
    formState.inspectedItems.forEach((item, index) => {
      checkNewPage(60); // Check if we need a new page for each item

      doc.setFontSize(10);
      doc.text(`Item #${item.itemNumber}`, margin, yPos);
      yPos += 6;
      doc.text(`Location: ${item.location}`, margin + 5, yPos);
      yPos += 6;
      doc.text(`Description: ${item.description}`, margin + 5, yPos);
      yPos += 8;

      // Add image if present
      if (item.image) {
        try {
          // Use stored dimensions to calculate aspect ratio
          const imgWidth = 170; // Max width in mm
          const aspectRatio = item.imageHeight / item.imageWidth;
          const imgHeight = imgWidth * aspectRatio;

          // Check if we need a new page for the image
          checkNewPage(imgHeight + 10);
          
          doc.addImage(item.image, "JPEG", margin, yPos, imgWidth, imgHeight, undefined, 'FAST');
          yPos += imgHeight + 5;
        } catch (error) {
          console.error("Error adding image:", error);
        }
      }

      yPos += 5; // Space between items
    });

    // Signatures
    checkNewPage(40);
    doc.setFontSize(14);
    doc.text("Signatures", margin, yPos);
    yPos += 10;

    // Add signatures if present
    Object.entries(formState.signatures).forEach(([key, value]) => {
      if (value.signatureImage) {
        checkNewPage(30);
        doc.setFontSize(10);
        doc.text(`${key}: ${value.signatureName || ''}`, margin, yPos);
        yPos += 5;
        doc.addImage(value.signatureImage, "PNG", margin, yPos, 50, 20);
        yPos += 25;
      }
    });

    // Save the PDF
    const fileName = `PDIF-UNIT${formState.unitEnrolment}-${date.format('YYYY-MM-DD')}.pdf`;
    doc.save(fileName);
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
