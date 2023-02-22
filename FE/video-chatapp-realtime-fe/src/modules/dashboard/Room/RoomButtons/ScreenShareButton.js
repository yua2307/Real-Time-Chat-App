import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';
import { switchOutgoingTracks } from '../../../../helpers/webRTCHandler';
const ScreenShareButton = ({
  localStream,
  screenSharingStream,
  setScreenSharingStream,
  isScreenSharingActive,
}) => {
  const handleToggleScreenShare = async () => {
    if (isScreenSharingActive) {
      switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((track) => track.stop());
      setScreenSharingStream(null);
    } else {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(mediaConstraints);
      } catch (err) {
        console.log('error getting display media', err);
      }
      if (stream) {
        setScreenSharingStream(stream);
        switchOutgoingTracks(stream);
        // Listen event when click "Stop sharing"
        stream.getVideoTracks()[0].onended = function () {
          switchOutgoingTracks(localStream);
          setScreenSharingStream(null);
        };
      }
    }
  };

  return (
    <IconButton style={{ color: 'white' }} onClick={handleToggleScreenShare}>
      {isScreenSharingActive ? <StopScreenShareIcon /> : <ScreenShareIcon />}
    </IconButton>
  );
};

const mediaConstraints = {
  audio: false,
  video: true,
};
export default ScreenShareButton;
