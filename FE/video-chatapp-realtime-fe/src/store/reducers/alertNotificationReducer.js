import { alertNotificationActions } from '../constants/alertNotification';

const initialState = {
  showAlertMessage: false,
  alertMessageContent: null,
  alertType: null,
  showBackDrop: false,
  contentBackDrop: null,
};

const alertNotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertNotificationActions.OPEN_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: true,
        alertMessageContent: action.content,
        alertType: action.typeAlert,
      };

    case alertNotificationActions.CLOSE_ALERT_MESSAGE:
      return {
        ...state,
        showAlertMessage: false,
        alertMessageContent: null,
        alertType: null,
      };
    case alertNotificationActions.SET_BACK_DROP:
      return {
        ...state,
        showBackDrop: action.showBackDrop,
        contentBackDrop: action.contentBackDropIfElse,
      };
    default:
      return state;
  }
};

export default alertNotificationReducer;
