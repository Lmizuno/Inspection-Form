import React from 'react';
import PropTypes from 'prop-types';
import styles from './CameraComponent.module.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';

const ImagePreview = ({ dataUri }) => {
  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <img style={{ width: '100%' }} src={dataUri} />
    </div>
  );
};

ImagePreview.propTypes = {
  dataUri: PropTypes.string,
  isFullscreen: PropTypes.bool
};

  /**https://www.positronx.io/react-js-capture-images-and-pictures-using-webcam-tutorial/
 * https://www.npmjs.com/package/react-html5-camera-photo
 * https://stackoverflow.com/questions/47176280/how-to-convert-files-to-base64-in-react
 */

const CameraComponent = ({ onPhotoSaved }) => {
  const [dataUri, setDataUri] = React.useState('');
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);

  const handleCameraError = (error) => {
    console.log(error);
  }
  const handleTakePhotoAnimationDone = (dataUri) => {
    setDataUri(dataUri);
  }
  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  }
  const handleSavePhoto = () => {
    onPhotoSaved(dataUri);
    setIsCameraOpen(false);
  }
  const handleCameraStart = (stream) => {
    console.log('handleCameraStart');
  }
  const handleCameraStop = () => {
    console.log('handleCameraStop');
  }
  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  }

  return (
    <div className={styles.CameraComponent}>
      {
        (dataUri) &&
        <ImagePreview
          dataUri={dataUri}
          isFullscreen={false}
        />
      }
      {
        (isCameraOpen) ?
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <Camera
                idealResolution={{ width: 600, height: 600 }}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                imageType={IMAGE_TYPES.JPG}
                isMaxResolution={true}
                isSilentMode={false}
                sizeFactor={1}
                imageCompression={0.97}
                isFullscreen={false}
                onTakePhotoAnimationDone={handleTakePhotoAnimationDone}
                onCameraStart={handleCameraStart}
                onCameraStop={handleCameraStop}
                onCameraError={handleCameraError}
              />
            </Grid>
            <Grid item xs
              justifyContent="space-evenly"
              alignItems="center"
              display="flex"

            >
              <Button
                onClick={handleCloseCamera}
                variant="contained"
                color="error"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePhoto}
                variant="contained"
              >
                Save Photo
              </Button>
            </Grid>
          </Grid>
          :
          <Button
            onClick={handleOpenCamera}
            variant="outlined"
          >
            Take Photo
          </Button>
      }


    </div>
  )
};

CameraComponent.propTypes = {};

CameraComponent.defaultProps = {};

export default CameraComponent;
