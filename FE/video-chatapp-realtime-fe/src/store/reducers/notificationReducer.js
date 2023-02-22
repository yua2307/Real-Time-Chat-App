import { notificationActions } from '../actions/notificationActions';

const initialState = {
  isFetching: false,
  listNotification: [],
  unreadNotifcatonNumber: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationActions.SET_NOTIFICATION_LIST:
      return {
        ...state,
        listNotification: action.listNotification,
      };
    case notificationActions.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case notificationActions.UPDATE_UNREAD_NOTIFICATION: {
      return {
        ...state,
        unreadNotifcatonNumber: action.unreadNotifcatonNumber,
      };
    }
    default:
      return state;
  }
};

export default reducer;
