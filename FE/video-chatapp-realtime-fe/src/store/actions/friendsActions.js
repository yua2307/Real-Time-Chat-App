import { openAlertMessage } from './alertNotificationActions';
import { typeAlert } from '../constants/alertNotification';
import * as api from '../../api';
import { friendsActions } from '../constants/friendsActions';

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendInvitation(data, closeDialogHandler)),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
    onOffNotification: (data) => dispatch(onOffNotification(data)),
    setIsFetchingFriendList: (isFetchingFriendList) =>
      dispatch(setIsFetchingFriendList(isFetchingFriendList)),
  };
};

export const setPendingFriendsInvitations = (pendingFriendsInvitations) => {
  return {
    type: friendsActions.SET_PENDING_FRIENDS_INVITATIONS,
    pendingFriendsInvitations,
  };
};

export const setFriendList = (friends) => {
  return {
    type: friendsActions.SET_FRIENDS,
    friends,
  };
};

export const setOnlineUsers = (onlineUsers) => {
  return {
    type: friendsActions.SET_ONLINE_USERS,
    onlineUsers,
  };
};

const sendFriendInvitation = (data, closeDialogHandler) => {
  return async (dispatch) => {
    const response = await api.sendFriendInvitation(data);

    if (response.error) {
      dispatch(
        openAlertMessage(response?.exception?.response?.data, typeAlert.ERROR)
      );
    } else {
      dispatch(
        openAlertMessage(
          'Invitation has been sent successfully',
          typeAlert.SUCCESS
        )
      );
      closeDialogHandler();
    }
  };
};

const acceptFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.acceptFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage('Invitation accepted!', typeAlert.SUCCESS));
    }
  };
};

const rejectFriendInvitation = (data) => {
  return async (dispatch) => {
    const response = await api.rejectFriendInvitation(data);

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(
        openAlertMessage('Rejected friend request successfully', typeAlert.INFO)
      );
    }
  };
};

const onOffNotification = (data) => {
  return async (dispatch) => {
    const response = await api.onOffNotification(data);

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage(response?.data, typeAlert.SUCCESS));
    }
  };
};

export const setIsFetchingFriendList = (isFetchingFriendList) => {
  return {
    type: friendsActions.SET_IS_FETCHING,
    isFetchingFriendList,
  };
};
