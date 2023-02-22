export const chatTypes = {
  DIRECT: 'DIRECT',
  GROUP: 'GROUP',
};

export const chatActions = {
  SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
  SET_MESSAGES: 'CHAT.SET_MESSAGES',
  SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE',
  SET_NOTIFICATION: 'CHAT.SET_NOTIFICATION',
  SET_IS_FETCHING: 'CHAT.SET_IS_FETCHING',
};

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (details, chatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
    setNotification: (notification) => dispatch(setNotification(notification)),
    setIsFetching: (isFetching) => dispatch(setIsFetching(isFetching)),
  };
};

export const setChosenChatDetails = (chatDetails, type) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    chatType: type,
    chatDetails,
  };
};

export const setMessages = (messages) => {
  return {
    type: chatActions.SET_MESSAGES,
    messages,
  };
};

export const setNotification = (notification) => {
  return {
    type: chatActions.SET_NOTIFICATION,
    notification,
  };
};

export const setIsFetching = (isFetching) => {
  return {
    type: chatActions.SET_IS_FETCHING,
    isFetching,
  };
};
