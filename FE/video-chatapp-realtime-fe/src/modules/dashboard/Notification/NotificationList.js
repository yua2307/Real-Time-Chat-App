import * as React from 'react';
import List from '@mui/material/List';
import NotificationItem from './NotifcationItem';
import CircularProgress from '@mui/material/CircularProgress';
import { getActions } from '../../../store/actions/notificationActions';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

const NotificationList = ({
  isFetching,
  listNotification,
  handleClickAway,
}) => {
  const renderNotificationList = () => {
    if (isFetching) {
      return (
        <Box
          sx={{
            width: '360px',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={100} />
        </Box>
      );
    }
    if (listNotification.length === 0) {
      return (
        <Box
          sx={{
            width: '360px',
            height: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DeleteIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography
            sx={{ display: 'inline', fontSize: '16px', color: 'white' }}
            component="span"
            variant=""
            color="text.primary"
          >
            You have no notifications yet. Start chatting now
          </Typography>
        </Box>
      );
    } else {
      return listNotification.map((notification) => (
        <NotificationItem
          key={notification._id}
          username={notification?.sender?.username}
          content={notification?.content}
          date={notification?.createdAt}
          senderId={notification?.sender?._id}
          avatar={notification?.sender?.avatar}
          handleClickAway={handleClickAway}
        />
      ));
    }
  };

  return (
    <List
      sx={{
        width: '360px',
        maxHeight: '500px',
        overflowY: 'auto',
        bgcolor: '#535d71',
      }}
    >
      {renderNotificationList()}
    </List>
  );
};

const mapStateToProps = ({ notification }) => {
  return {
    ...notification,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionToProps)(NotificationList);
