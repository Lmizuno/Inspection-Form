import React from 'react';
import styles from './SignatureComponent.module.css';
import SignatureCanvas from 'react-signature-canvas'
import { Box, Button, Grid, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: 'auto',
  bgcolor: '#ccc',
  borderRadius: 6,
  boxShadow: 24,
  p: 4,
};

const SignatureComponent = (props) => {
  const {onSave, widthRatio, canvasProps} = props;
  const [isSigned, setIsSigned] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [signatureResult, setSignatureResult] = React.useState('')
  const sigCanvas = React.useRef({})
  const sigPad = React.useRef({})

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const buttonText = (isSigned) ? 'Change Signature' : 'Update Signature';


  const saveInput = () => {
    const dataURL = sigCanvas.current.toDataURL()
    setSignatureResult(dataURL)
    onSave(dataURL)
    setOpenModal(!openModal)
  }
  const clearInput = () => sigPad.current.clear()

  const measuredRef = React.useCallback(node => {
    const resizeCanvas = (signaturePad, canvas) => {
      canvas.width = canvas.parentElement.clientWidth // width of the .canvasWrapper
      canvas.height = canvas.parentElement.clientWidth / widthRatio
      signaturePad.clear()
    }

    if (node !== null) {
      sigCanvas.current = node.getCanvas()
      sigPad.current = node.getSignaturePad()
      resizeCanvas(node.getSignaturePad(), node.getCanvas())
    }
  }, [widthRatio])

  return (
    <div className={styles.SignatureComponent}>
      <Button
        aria-label="add signature"
        size="large"
        onClick={handleOpenModal}
        startIcon={<AddIcon fontSize="inherit" />}
      >
        {buttonText}
      </Button>
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
          <Grid item sx={12}>
            <SignatureCanvas canvasProps={{...canvasProps, className: styles.sigCanvas }} ref={measuredRef} />
          </Grid>
          <Grid item sx={12}>
            <Button
              variant="contained" aria-label="Save"
              onClick={saveInput}
            >
              Save
            </Button>
            <Button variant="outlined" aria-label="Save" onClick={clearInput}>
              Clear
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
