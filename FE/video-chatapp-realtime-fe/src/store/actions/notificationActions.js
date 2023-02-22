import * as api from '../../api';
import { openAlertMessage } from './alertNotificationActions';

export const notificationActions = {
  SET_NOTIFICATION_LIST: 'SET_NOTIFICATION_LIST',
  UPDATE_NOTIFICATION_LIST: 'UPDATE_NOTIFICATION_LIST',
  UPDATE_UNREAD_NOTIFICATION: 'UPDATE_UNREAD_NOTIFICATION',
  SET_IS_FETCHING: 'SET_IS_FETCHING',
};

export const getActions = (dispatch) => {
  return {
    getNotificationList: () => {
      dispatch(getNotificationList());
    },
    getNotificationListUnread: () => {
      dispatch(getNotificationListUnread());
    },
    setAllNotificationRead: () => {
      dispatch(setAllNotificationRead());
    },
  };
};

export const setNotificationList = (listNotification) => {
  return {
    type: notificationActions.SET_NOTIFICATION_LIST,
    listNotification,
  };
};

export const setNumberNotificationUnread = (unreadNotifcatonNumber) => {
  return {
    type: notificationActions.UPDATE_UNREAD_NOTIFICATION,
    unreadNotifcatonNumber,
  };
};

export const setIsFetch = (isFetching) => {
  return {
    type: notificationActions.SET_IS_FETCHING,
    isFetching,
  };
};

export const getNotificationList = () => {
  return async (dispatch) => {
    dispatch(setIsFetch(true));
    const response = await api.getListNotificationByUserID();
    dispatch(setNotificationList(response.data));
    dispatch(setIsFetch(false));

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
      return;
    }
  };
};

export const getNotificationListUnread = () => {
  return async (dispatch) => {
    const response = await api.getNotificationUnread();

    dispatch(
      setNumberNotificationUnread(response.data.numberNotificationsUnread)
    );

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
      return;
    }
  };
};

export const setAllNotificationRead = () => {
  return async (dispatch) => {
    dispatch(setNumberNotificationUnread(0));
    const response = await api.setAllNotifcationRead();
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
      return;
    }
  };
};
