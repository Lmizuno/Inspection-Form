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

function createData(itemNumber, location, description, image) {
  return { itemNumber, location, description, image };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.itemNumber}
        </TableCell>
        <TableCell align="right">{row.location}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              {/** TODO: Save Image as code and put it here */}
              <img src={row.image}/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const DynamicTable = () => {
  const [isUpdate, setIsUpate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (e) => {
    if(e.currentTarget?.attributes?.itemnumber?.value)
    {
      let item = getItem(e.currentTarget.attributes.itemnumber.value);
      setItemNumber(item.itemNumber);
      setLocation(item.location);
      setDescription(item.description);
      setIsUpate(true);
    }else{
      setIsUpate(false);
    }
    
    setOpen(true);
  };
  const [rows, setRows] = React.useState([]);
  const  handleModalClick = () => {
    if(location === null || description === null){
      return;
    }

    if(isUpdate){
      console.log('UPDATING');
      rows[itemNumber - 1] = createData(itemNumber, location, description, null); 
      setRows(rows);
    }else{
      console.log('ADDING NEW');
      console.log(rows);
      let newNumber =  rows.length;
      rows[newNumber] = createData(newNumber + 1, location, description, null);
      setRows(rows);
    }

    setLocation('');
    setDescription('');
    setItemNumber(0);
    handleClose();
  }

  const [itemNumber, setItemNumber] = React.useState(null);
  const [location, setLocation] = React.useState('');  
  const handleLocationChange = e => {  
    setLocation(e.target.value);
  };
  const [description, setDescription] = React.useState('');
  const handleDescriptionChange = e => {  
    setDescription(e.target.value);
  };

  const getItem = (key) =>{
    return rows.find(e => e.itemNumber == key);
  }

  return (
    <div className={styles.DynamicTable}>
      <Typography>
        Add Damage, Incomplete or Missing Items.
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="missing or damaged table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Item#</TableCell>
              <TableCell align="right">Room/Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/**https://mui.com/material-ui/react-table/#collapsible-table */}
            {rows.map((row) => (
              <TableRow
                key={row.itemNumber}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                itemnumber={row.itemNumber}
                onClick={handleOpen}
              >
                <TableCell>{row.itemNumber}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button sx={{ marginTop: 1, align: "right"}} onClick={handleOpen} variant="contained">New Entry</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {isUpdate ? 'Update Item' : 'New Item'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                required
                fullWidth
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
              
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleModalClick}
          >
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </div>
  )
};

export default DynamicTable;
