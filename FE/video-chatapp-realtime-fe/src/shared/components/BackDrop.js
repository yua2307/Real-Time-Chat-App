import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';

const BackDrop = ({ showBackDrop, contentBackDrop }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      open={showBackDrop}
    >
      <CircularProgress color="inherit" size={100} />

      <Typography variant="h6" sx={{ color: 'white', marginTop: '20px' }}>
        {contentBackDrop}
      </Typography>
    </Backdrop>
  );
};

const mapStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

export default connect(mapStateToProps, null)(BackDrop);
