import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeInformation.module.css';
import { TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateHomeInfo } from '../../store/slices/formSlice';

const style = {
  marginTop: "1vh",
}

const HomeInformation = () => {
  const dispatch = useDispatch();
  const homeInfo = useSelector(state => state.form.homeInfo);

  const handleChange = (field) => (e) => {
    dispatch(updateHomeInfo({
      [field]: e.target.value
    }));
  };

  return (
    <div className={styles.HomeInformation}>
      <TextField
        style={style}
        fullWidth
        id="lotNumber"
        label="Lot #"
        onChange={handleChange('lotNumber')}
        value={homeInfo.lotNumber}
      />
      <TextField
        style={style}
        fullWidth
        id="planCode"
        label="Plan Code"
        onChange={handleChange('planCode')}
        value={homeInfo.planCode}
      />
      <TextField
        style={style}
        fullWidth
        id="munincipality"
        label="Munincipality"
        onChange={handleChange('munincipality')}
        value={homeInfo.munincipality}
      />
      <TextField
        style={style}
        fullWidth
        id="projectName"
        label="Condominium Project Name"
        onChange={handleChange('projectName')}
        value={homeInfo.projectName}
      />
      <TextField
        style={style}
        fullWidth
        id="level"
        label="Level"
        onChange={handleChange('level')}
        value={homeInfo.level}
      />
      <TextField
        style={style}
        fullWidth
        id="unit"
        label="Unit #"
        onChange={handleChange('unit')}
        value={homeInfo.unit}
      />
      <TextField
        style={style}
        fullWidth
        id="address"
        label="Address"
        onChange={handleChange('address')}
        value={homeInfo.address}
      />
    </div>
  );
}

HomeInformation.propTypes = {};

HomeInformation.defaultProps = {};

export default HomeInformation;
