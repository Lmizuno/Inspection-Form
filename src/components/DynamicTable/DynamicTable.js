import React from 'react';
import PropTypes from 'prop-types';
import styles from './DynamicTable.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Collapse, Grid, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CameraComponent from '../CameraComponent/CameraComponent';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

const createData = (itemNumber, location, description, image) => {
  return { itemNumber, location, description, image };
}

const Row = (props) => {
  const { row, handleUpdateClick, handleDeleteClick } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow className='rowStyle' itemnumber={row.itemNumber}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align='center' width="10%">
          {row.itemNumber}
        </TableCell>
        <TableCell>{row.location}</TableCell>
      </TableRow>
      <TableRow className='rowStyle'>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2}
                justifyContent="space-evenly"
                alignItems="center"
                display="flex"
              >
                <Grid item xs={6}>
                  <Typography variant="h6" component="p">
                    Description
                  </Typography>
                  <Typography
                    variant="p" component="p"
                  >
                    {row.description}
                  </Typography>
                  <Button
                    aria-label="Update" 
                    itemnumber={row.itemNumber}
                    variant="outlined"
                    onClick={(event) => {handleUpdateClick(event)}}
                  >
                    Update
                  </Button>
                  <IconButton 
                    aria-label="delete" 
                    size="large"
                    itemnumber={row.itemNumber}
                    onClick={(event) => {handleDeleteClick(event)}}
                    color="error"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Grid>
                <Grid item xs={6} justifyContent="space-evenly"
                  alignItems="center"
                  display="flex">
                  <img style={{ width: "100%", borderRadius: 4 }} src={row.image} />
                </Grid>
              </Grid>

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape
    (
      {
        itemNumber: PropTypes.number.isRequired,
        location: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
      }
    )
};

const DynamicTable = () => {
  const [isUpdate, setIsUpate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [itemNumber, setItemNumber] = React.useState(null);
  const [location, setLocation] = React.useState('');
  const [image, setImage] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = e => {
    if (e.currentTarget?.attributes?.itemnumber?.value) {
      let item = getItem(e.currentTarget.attributes.itemnumber.value);
      setItemNumber(item.itemNumber);
      setLocation(item.location);
      setDescription(item.description);
      setIsUpate(true);
    } else {
      setIsUpate(false);
    }

    setOpen(true);
  };
  const handleDelete = e => {
    
    if (e.currentTarget?.attributes?.itemnumber?.value) {
      let item = getItem(e.currentTarget.attributes.itemnumber.value);
     
      setItemNumber(item.itemNumber);
      setOpenDeleteDialog(true);
    }
  }
  const handleModalClick = () => {
    if (location === null || description === null) {
      return;
    }

    if (isUpdate) {
      console.log('UPDATING');
      rows[itemNumber - 1] = createData(itemNumber, location, description, image);
      setRows(rows);
    } else {
      console.log('ADDING NEW');
      console.log(rows);
      let newNumber = rows.length;
      rows[newNumber] = createData(newNumber + 1, location, description, image);
      setRows(rows);
    }

    setLocation('');
    setDescription('');
    setItemNumber(0);
    setImage('');
    handleClose();
  }
  const handleLocationChange = e => {
    setLocation(e.target.value);
  };
  const handleDescriptionChange = e => {
    setDescription(e.target.value);
  };
  const handleTakePhoto = dataUri => {
    setImage(dataUri);
  }
  const getItem = key => {
    return rows.find(e => e.itemNumber == key);
  }
  const deleteItem = key => {
    setRows(rows.filter(e => e.itemNumber !== key));
  }
  
  return (
    <div className={styles.DynamicTable}>
      <Typography component={'h2'} variant={'h6'} align="center" gutterBottom={true}>
        Add Damage, Incomplete or Missing Items.
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="missing or damaged table">
          <TableHead>
            <TableRow>
              <TableCell width="10%" />
              <TableCell align='center' width="10%">Item#</TableCell>
              <TableCell>Room/Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>            
            {rows.map((row) => (
              <Row key={row.itemNumber} row={row} handleUpdateClick={handleOpen} handleDeleteClick={handleDelete} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button sx={{ marginTop: 1, align: "right" }} onClick={handleOpen} variant="contained">New Entry</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.ModalBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isUpdate ? 'Update Item' : 'New Item'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                required
                
                id="locationOfMistake"
                label="Location/Room"
                autoFocus
                onChange={handleLocationChange}
                value={location}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
                id="descriptionOfMistake"
                label="Description"
                multiline
                rows={4}
                onChange={handleDescriptionChange}
                value={description}
              />
            </Grid>
            <Grid item xs={12} >
              <CameraComponent onPhotoSaved={handleTakePhoto} />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleModalClick}
          >
            Add
          </Button>
        </Box>
      </Modal>
      <ConfirmDeleteDialog openDialog={openDeleteDialog} confirmationCallback={() => {deleteItem(itemNumber); setItemNumber(0); setOpenDeleteDialog(false);}} cancelCallBack={()=>{setOpenDeleteDialog(false);}}>
        Delete item# {itemNumber}
      </ConfirmDeleteDialog>
    </div>
  )
};

export default DynamicTable;
