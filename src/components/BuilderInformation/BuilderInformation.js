import React from 'react';
import PropTypes from 'prop-types';
import styles from './BuilderInformation.module.css';
import { TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateBuilderInfo } from '../../store/slices/formSlice';

const style = {
  marginTop: "1vh",
}

const BuilderInformation = () => {
  const dispatch = useDispatch();
  const builderInfo = useSelector(state => state.form.builderInfo);

  const handleBuilderLicenceChange = (e) => {
    dispatch(updateBuilderInfo({
      builderLicence: e.target.value
    }));
  }

  const handleBuilderNameChange = (e) => {
    dispatch(updateBuilderInfo({
      builderName: e.target.value
    }));
  }

  const handleRepresentativeChange = (e) => {
    dispatch(updateBuilderInfo({
      representative: e.target.value
    }));
  }

  return (
    <div className={styles.BuilderInformation}>
      <TextField
        style={style}
        fullWidth
        id="builderLicence"
        label="Vendor/Builder Licence #"
        onChange={handleBuilderLicenceChange}
        value={builderInfo.builderLicence}
      />
      <TextField
        style={style}
        fullWidth
        id="builderName"
        label="Vendor/Builder name"
        onChange={handleBuilderNameChange}
        value={builderInfo.builderName}
      />
      <TextField
        style={style}
        fullWidth
        id="representative"
        label="Representative"
        onChange={handleRepresentativeChange}
        value={builderInfo.representative}
      />
    </div>
  )
};

BuilderInformation.propTypes = {};

BuilderInformation.defaultProps = {};

export default BuilderInformation;
