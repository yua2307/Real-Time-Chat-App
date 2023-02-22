import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const MicroButton = ({ localStream }) => {
  const [microEnabled, setMicroEnabled] = useState(true);

  const handleToggleMicro = () => {
    localStream.getAudioTracks()[0].enabled = !microEnabled;
    setMicroEnabled(!microEnabled);
  };

  return (
    <IconButton onClick={handleToggleMicro} style={{ color: 'white' }}>
      {microEnabled ? <MicIcon /> : <MicOffIcon />}
    </IconButton>
  );
};

export default MicroButton;
