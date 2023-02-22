import React from 'react';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import NotificationList from '../Notification/NotificationList';
import { getActions } from '../../../store/actions/notificationActions';
import { connect } from 'react-redux';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const BadgeNotification = ({
  getNotificationList,
  unreadNotifcatonNumber,
  setAllNotificationRead,
}) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickBadge = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
    if (!open) {
      getNotificationList();
      setAllNotificationRead();
    }
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <>
      <Badge
        aria-describedby={id}
        badgeContent={
          unreadNotifcatonNumber === 0 ? null : unreadNotifcatonNumber
        }
        color="secondary"
        onClick={handleClickBadge}
      >
        <NotificationsIcon sx={{ fontSize: 40 }} />
      </Badge>

      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement={'right-start'}
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Box
                sx={{
                  paddingLeft: '22px',
                }}
              >
                <NotificationList handleClickAway={handleClickAway} />
              </Box>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </>
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

export default connect(mapStateToProps, mapActionToProps)(BadgeNotification);
