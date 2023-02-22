import React from 'react';
import { styled } from '@mui/system';
import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import { connect } from 'react-redux';
import { logout } from '../../utils/logout';
import { chatTypes, getActions } from '../../store/actions/chatActions';
import Room from './Room/Room';
import { useSnackbar } from 'notistack';
import { SocketContext } from '../../services/socket';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import store from '../../store/store';
import {
  getNotificationList,
  getNotificationListUnread,
} from '../../store/actions/notificationActions';
import AlertNotification from '../../shared/components/AlertNotification';
import Backdrop from '../../shared/components/BackDrop';

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Dashboard = ({
  userDetails,
  chosenChatDetails,
  setChosenChatDetails,
  isUserInRoom,
  localStream,
  friends,
  isUserInRoomPrivate,
}) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    const userJSON = JSON.parse(localStorage.getItem('user'));
    if (!userDetails && !userJSON) {
      logout();
    }
  }, [userDetails]);

  React.useEffect(() => {
    const handleClickOpenChat = (senderId, senderName, chosenChatDetails) => {
      if (
        !chosenChatDetails ||
        chosenChatDetails.id.toString() !== senderId.toString()
      ) {
        setChosenChatDetails(
          { id: senderId, name: senderName },
          chatTypes.DIRECT
        );
      }
    };
    const handleSocketNotification = (content, senderName, senderId) => {
      enqueueSnackbar(`${senderName} : ${content}`, {
        variant: 'info',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        action: (key) => (
          <>
            <IconButton
              aria-label="delete"
              onClick={() =>
                handleClickOpenChat(senderId, senderName, chosenChatDetails)
              }
            >
              <LaunchIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => closeSnackbar(key)}>
              <CloseIcon />
            </IconButton>
          </>
        ),
      });
    };

    socket.on(
      'send-notification',
      ({ content, senderName, senderId, avatarSender }) => {
        const sender = friends.find((friend) => friend.id === senderId);

        if (sender && !sender.hasOwnProperty('offNotificiation')) {
          handleSocketNotification(content, senderName, senderId, avatarSender);
          store.dispatch(getNotificationListUnread());
          store.dispatch(getNotificationList());
        }
      }
    );

    return () => {
      socket.off('send-notification');
    };
  }, [
    socket,
    enqueueSnackbar,
    closeSnackbar,
    chosenChatDetails,
    setChosenChatDetails,
    friends,
  ]);

  React.useEffect(() => {
    store.dispatch(getNotificationListUnread());
  }, []);

  return (
    <>
      <Backdrop />
      <Wrapper>
        <SideBar />
        <FriendsSideBar />
        <Messenger />
        <AppBar />
        {localStream && isUserInRoom | isUserInRoomPrivate && <Room />}
      </Wrapper>
      <AlertNotification />
    </>
  );
};

const mapStateToProps = ({ auth, chat, room, friends }) => {
  return {
    ...auth,
    ...chat,
    ...room,
    ...friends,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
