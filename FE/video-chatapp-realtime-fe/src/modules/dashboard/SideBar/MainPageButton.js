import React from 'react';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import VideocamIcon from '@mui/icons-material/Videocam';
import { logout } from '../../../utils/logout';
import { connect } from 'react-redux';
import { Tooltip, Menu, MenuItem } from '@mui/material';
import AssignmentIndSharpIcon from '@mui/icons-material/AssignmentIndSharp';
import DialogProfile from '../DialogProfile/DialogProfile';
import ChangePasswordPopup from '../ChangePasswordPopUp/ChangePasswordPopup';
import * as roomHandler from '../../../helpers/roomHandler';
import ActiveRoomButton from './ActiveRoomButton';
import BadgeNotification from './BadgeNotification';
import MenuList from '@mui/material/MenuList';

const styleButtonGroupIcon = {
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  margin: 0,
  padding: 0,
  minWidth: 0,
  marginTop: '10px',
  color: 'white',
  backgroundColor: '#5865F2',
};
const styleButtonLogoutIcon = {
  position: 'fixed',
  bottom: '0',
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  marginBottom: '10px',
  padding: 0,
  minWidth: 0,
  marginTop: '10px',
  color: 'white',
  backgroundColor: '#5865F2',
};

const MainPageButton = ({ activeRooms, isUserInRoom, userDetails }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDisableVideoButton, setIsDisableVideoButton] =
    React.useState(isUserInRoom);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mail = userDetails.mail;

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDialogPasswordOpen, setIsDialogPasswordOpen] = React.useState(false);

  const handleOpenDialogProfile = () => {
    setIsDialogOpen(true);
  };

  const handleOpenChangePasswords = () => {
    setIsDialogPasswordOpen(true);
  };

  const handleCreateNewRoom = () => {
    setIsDisableVideoButton(true);
    roomHandler.createNewRoom();
  };

  React.useEffect(() => {
    setIsDisableVideoButton(isUserInRoom);
  }, [isUserInRoom]);

  return (
    <>
      <Tooltip title={'Personal Profile'} arrow placement="right">
        <Button
          style={styleButtonGroupIcon}
          onClick={handleClick}
          isUserInRoom={isUserInRoom}
        >
          <AssignmentIndSharpIcon />
        </Button>
      </Tooltip>

      <Tooltip title={'Notification List'} arrow placement="bottom">
        <Button style={styleButtonGroupIcon}>
          <BadgeNotification />
        </Button>
      </Tooltip>

      <Tooltip title={'Call group video'} arrow placement="bottom">
        <Button
          disabled={isDisableVideoButton}
          style={styleButtonGroupIcon}
          onClick={handleCreateNewRoom}
        >
          <VideocamIcon />
        </Button>
      </Tooltip>

      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ marginLeft: '12px' }}
      >
        <MenuList sx={{ bgcolor: '#36393f' }}>
          <MenuItem disabled={true}>{mail}</MenuItem>
          <MenuItem onClick={handleOpenDialogProfile}>
            Update Profile Information
          </MenuItem>
          <MenuItem onClick={handleOpenChangePasswords}>
            Change Password
          </MenuItem>
        </MenuList>
      </Menu>

      <DialogProfile
        isDialogOpen={isDialogOpen}
        closeDialogHandler={() => setIsDialogOpen(false)}
      />

      <ChangePasswordPopup
        isDialogOpen={isDialogPasswordOpen}
        closeDialogHandler={() => setIsDialogPasswordOpen(false)}
      />
      <Tooltip title={'Logout'} arrow placement="right">
        <Button onClick={logout} style={styleButtonLogoutIcon}>
          <LogoutIcon />
        </Button>
      </Tooltip>
    </>
  );
};

const mapStateToProps = ({ room, auth }) => {
  return {
    ...room,
    ...auth,
  };
};
export default connect(mapStateToProps, null)(MainPageButton);
