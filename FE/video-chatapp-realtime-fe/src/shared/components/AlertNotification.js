import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { getActions } from '../../store/actions/alertNotificationActions';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';

import Slide from '@mui/material/Slide';

const TransitionDown = (props) => {
  return <Slide {...props} direction="down" />;
};

const AlertNotification = ({
  showAlertMessage,
  closeAlertMessage,
  alertMessageContent,
  alertType,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={showAlertMessage}
      onClose={closeAlertMessage}
      autoHideDuration={5000}
      TransitionComponent={TransitionDown}
      key={alertType + alertMessageContent}
    >
      <Alert severity={alertType}>
        <Typography
          sx={{
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          {alertMessageContent}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = ({ alert }) => {
  return {
    ...alert,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertNotification);
