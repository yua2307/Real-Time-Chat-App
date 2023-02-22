import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
const InvitationDecisionButtons = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        style={{ color: 'white' }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <CheckCircleOutlineIcon color="success" />
      </IconButton>
      <IconButton
        style={{ color: 'white' }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <ClearIcon sx={{ color: red[500] }} />
      </IconButton>
    </Box>
  );
};

export default InvitationDecisionButtons;
