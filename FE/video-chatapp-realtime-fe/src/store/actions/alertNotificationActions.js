import { alertNotificationActions } from '../constants/alertNotification';

export const getActions = (dispatch) => {
  return {
    closeAlertMessage: () => dispatch(closeAlertMessage()),
    openAlertMessage: (content, typeAlert) =>
      dispatch(openAlertMessage(content, typeAlert)),
    showBackDrop: (contentBackDrop, showBackDrop) =>
      dispatch(showBackDrop(contentBackDrop, showBackDrop)),
  };
};

export const closeAlert = () => {
  return {
    type: alertNotificationActions.CLOSE_ALERT_MESSAGE,
  };
};

export const openAlertMessage = (content, typeAlert) => {
  return {
    type: alertNotificationActions.OPEN_ALERT_MESSAGE,
    content,
    typeAlert,
  };
};

export const closeAlertMessage = () => {
  return {
    type: alertNotificationActions.CLOSE_ALERT_MESSAGE,
  };
};

export const showBackDrop = (showBackDrop, contentBackDrop) => {
  const contentBackDropIfElse = contentBackDrop
    ? contentBackDrop
    : 'Waiting to connect to your webcam and micro';
  return {
    type: alertNotificationActions.SET_BACK_DROP,
    showBackDrop,
    contentBackDropIfElse,
  };
};
