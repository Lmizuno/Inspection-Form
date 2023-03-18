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
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'column'
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
  const [imgClass, setImgClass] = React.useState('');

  const sigCanvas = React.useRef({})

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
    if (window.innerWidth < 650) {
      setImgClass(styles.rotateSignature);
    } else {
      setImgClass('');
    }
  });

  return (
    <div className={styles.SignatureComponent}>
      <Grid container flexDirection="column">
        {(isSigned) && <Grid item justifyContent='space-around' alignItems='center' display='flex'><img className={`${styles.signatureImage} ${imgClass}`} src={signature} /></Grid>}
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

          container
        >
          <Grid item sx={12} justifyContent='center' alignItems='center' display='flex'>
            <SignatureCanvas canvasProps={{ className: styles.sigCanvas }} ref={sigCanvas} />
          </Grid>
          <Grid item sx={12} justifyContent='space-around' alignItems='center' display='flex'>
            <Button
              variant="contained" aria-label="Save"
              onClick={saveInput}
              className={styles.signatureButton}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              aria-label="Clear"
              onClick={clearInput}
              className={styles.signatureButton}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              color="error"
              aria-label="Cancel"
              onClick={handleCloseModal}
              className={styles.signatureButton}
            >
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
