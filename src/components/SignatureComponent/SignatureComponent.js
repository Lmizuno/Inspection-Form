import React from 'react';
import styles from './SignatureComponent.module.css';
import SignatureCanvas from 'react-signature-canvas'
import { Button, Grid, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', 
  height: '90%',
  bgcolor: '#e3e3e3',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

const sigCanvas = {
  margin: '0 auto',
  backgroundColor: '#fff',
  width: 100,
  height: 100,
}

const SignatureComponent = (props) => {
  const { onSave } = props;
  const [isSigned, setIsSigned] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [signature, setSignature] = React.useState(false);
  const [canvasSize, setCanvasSizeObj] = React.useState({height: 110, width: 330});

  const sigCanvas = React.useRef({})
  const canvasWrapper = React.useRef(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const buttonText = (isSigned) ? 'Update Signature' : 'Add Signature';

  const saveInput = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    //onSave(dataURL);
    setOpenModal(false);
    setIsSigned(true);
    setSignature(dataURL);
  }

  const clearInput = () => sigCanvas.current.clear()


  React.useEffect(() => {
    window.addEventListener('resize', setCanvasSize);

    setCanvasSize();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  const setCanvasSize = () => {
    if(canvasWrapper.current){
      setCanvasSizeObj({height: canvasWrapper.current.offsetHeight, width: canvasWrapper.current.offsetWidth});
    }
    if(sigCanvas.current){
      sigCanvas.current.height = canvasSize.height;
      sigCanvas.current.width = canvasSize.width;
    }
  };


  return (
    <div className={styles.SignatureComponent}>
      <Grid container flexDirection="column">
        {(isSigned) && <Grid item><img src={signature} /> </Grid>}
        <Grid item>
          <Button
            aria-label="add signature"
            size="large"
            onClick={handleOpenModal}
            startIcon={<AddIcon fontSize="inherit" />}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid sx={style} id="innerSignatureModalBox"
          display="flex"
          flexDirection="column"
          alignContent="space-between"
          justifyContent="space-between"
          container
        >
          <Grid item sx={12} ref={canvasWrapper}>
            <SignatureCanvas canvasProps={{ className: styles.sigCanvas, height:canvasSize.height, width: canvasSize.width }} ref={sigCanvas} />
          </Grid>
          <Grid item sx={12} >
            <Button
              variant="contained" aria-label="Save"
              onClick={saveInput}
            >
              Save
            </Button>
            <Button variant="outlined" aria-label="Clear" onClick={clearInput}>
              Clear
            </Button>
            <Button variant="outlined" color="error" aria-label="Cancel" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}

SignatureComponent.propTypes = {};

SignatureComponent.defaultProps = {};

export default SignatureComponent;
