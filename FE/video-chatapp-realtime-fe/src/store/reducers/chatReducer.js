import { chatActions } from '../actions/chatActions';

const initState = {
  isFetching: false,
  chosenChatDetails: null,
  chatType: null,
  messages: [],
  notification: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: [],
      };
    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case chatActions.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.notification,
      };
    case chatActions.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    default:
      return state;
  }
};

export default reducer;
