import store from '../store/store';
import { setMessages, setNotification } from '../store/actions/chatActions';
import { setIsFetching } from '../store/actions/chatActions';

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;
  // find id of user from token and id from active conversation
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails._id;
  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
  store.dispatch(setIsFetching(false));
};

export const renderNotification = ({ content, senderName }) => {
  if (content) {
    store.dispatch(setNotification(`${senderName} : ${content}`));
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}) => {
  const result = participants.every((participantId) => {
    return usersInCoversation.includes(participantId);
  });

  if (result) {
    store.dispatch(setMessages(messages));
  }
};
