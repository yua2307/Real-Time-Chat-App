import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { getActions } from '../../../../store/actions/friendsActions';
import { connect } from 'react-redux';

const MainContainer = styled('div')({
  alignSelf: 'center',
});

const DropdownMenu = ({ onOffNotification, friends, chosenChatDetails }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [isOnNotification, setIsOnNotification] = React.useState(() => {
    const friendFind = friends.find(
      (f) => f.id.toString() === chosenChatDetails.id.toString()
    );

    const isOffNotificiation = friendFind.hasOwnProperty('offNotificiation');
    return isOffNotificiation ? false : true;
  });

  React.useEffect(() => {
    const friendFind = friends.find(
      (f) => f.id.toString() === chosenChatDetails.id.toString()
    );
    const isOffNotificiation = friendFind.hasOwnProperty('offNotificiation');
    setIsOnNotification(isOffNotificiation ? false : true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenChatDetails.id]);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickNotification = () => {
    setIsOnNotification(!isOnNotification);

    onOffNotification({
      friendIdTarget: chosenChatDetails.id,
      notificationState: isOnNotification,
    });
  };

  return (
    <MainContainer>
      <IconButton onClick={handleMenuOpen} style={{ color: 'white' }}>
        <SettingsIcon sx={{ color: 'white', fontSize: 30 }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onClickNotification}>
          {isOnNotification ? (
            <Button startIcon={<NotificationsOffIcon />}>
              <Typography
                sx={{
                  color: '#b9bbbe',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                Turn off notification
              </Typography>
            </Button>
          ) : (
            <Button variant="contained" startIcon={<NotificationsActiveIcon />}>
              <Typography
                sx={{
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                Turn on notification
              </Typography>
            </Button>
          )}
        </MenuItem>
      </Menu>
    </MainContainer>
  );
};

const mapStateToProps = ({ friends, chat }) => {
  return {
    ...friends,
    ...chat,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionToProps)(DropdownMenu);
