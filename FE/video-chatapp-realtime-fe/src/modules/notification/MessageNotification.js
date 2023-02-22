import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

const MessageNotification = ({
  vertical = 'top',
  horizontal = 'right',
  open = false,
  message = '',
  handleClose = () => {},
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      autoHideDuration={10000000}
    >
      <Alert onClose={handleClose} severity="info">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageNotification;
