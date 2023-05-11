import React from 'react';
import PropTypes from 'prop-types';
import styles from './HomeInformation.module.css';
import { TextField, Typography } from '@mui/material';

const style = {
  marginTop: "1vh",
}
const HomeInformation = (props) => {
  const [state, updateState] = React.useState({});

  const handlelotNumberChange = (e) => {
    setState({
      ...state,
      lotNumber: e.target.value
    });
  }
  const handleplanCodeChange = (e) => {
    setState({
      ...state,
      planCode: e.target.value
    });
  }
  const handlemunincipalityChange = (e) => {
    setState({
      ...state,
      munincipality: e.target.value
    });
  }
  const handleprojectNameChange = (e) => {
    setState({
      ...state,
      projectName: e.target.value
    });
  }
  const handlelevelChange = (e) => {
    setState({
      ...state,
      level: e.target.value
    });
  }
  const handleunitChange = (e) => {
    setState({
      ...state,
      unit: e.target.value
    });
  }
  const handleaddressChange = (e) => {
    setState({
      ...state,
      address: e.target.value
    });
  }

  const setState = (e) => {
    updateState(e);
    props.onChange(e);
  };

  return (
    <div className={styles.HomeInformation}>
      <TextField
        style={style}
        fullWidth
        id="lotNumber"
        label="Lot #"
        onChange={handlelotNumberChange}
        value={state.lotNumber}
      />
      <TextField
        style={style}
        fullWidth
        id="planCode"
        label="Plan Code"
        onChange={handleplanCodeChange}
        value={state.planCode}
      />
      <TextField
        style={style}
        fullWidth
        id="munincipality"
        label="Munincipality"
        onChange={handlemunincipalityChange}
        value={state.munincipality}
      />
      <TextField
        style={style}
        fullWidth
        id="projectName"
        label="Condominium Project Name"
        onChange={handleprojectNameChange}
        value={state.projectName}
      />
      <TextField
        style={style}
        fullWidth
        id="level"
        label="Level"
        onChange={handlelevelChange}
        value={state.level}
      />
      <TextField
        style={style}
        fullWidth
        id="unit"
        label="Unit #"
        onChange={handleunitChange}
        value={state.unit}
      />
      <TextField
        style={style}
        fullWidth
        id="address"
        label="Address"
        onChange={handleaddressChange}
        value={state.address}
      />
    </div>
  );
}

HomeInformation.propTypes = {};

HomeInformation.defaultProps = {};

export default HomeInformation;
