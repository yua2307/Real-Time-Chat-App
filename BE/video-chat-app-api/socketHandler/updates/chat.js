const Conversation = require('../../models/conversation');
const serverStore = require('../../serverStore');
const Notification = require('../../models/notification');
const User = require('../../models/user');

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: 'messages',
    model: 'Message',
    populate: {
      path: 'author',
      model: 'User',
      select: 'username _id avatar',
    },
  });

  if (conversation) {
    const io = serverStore.getSocketServerInstance();

    if (toSpecifiedSocketId) {
      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((userId) => {
      const activeConnections = serverStore.getActiveConnections(
        userId.toString()
      );

      activeConnections.forEach((socketId) => {
        io.to(socketId).emit('direct-chat-history', {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

const sendNotificationToReciver = async (
  receiverUserId,
  content,
  senderName,
  userId
) => {
  try {
    const receiver = await User.findById(receiverUserId);
    if (receiver.friendsOffNotificiation.indexOf(userId) === -1) {
      const newNoti = await Notification.create({
        sender: userId,
        receiver: receiverUserId,
        content: content,
        isRead: false,
        createdAt: new Date(),
      });
      newNoti.save();
    }
  } catch (err) {}

  const io = serverStore.getSocketServerInstance();
  const activeConnections = serverStore.getActiveConnections(
    receiverUserId.toString()
  );

  if (activeConnections.length) {
    const avatarSender = await User.findById(userId).avatar;
    activeConnections.forEach((reciverSocketId) => {
      io.to(reciverSocketId).emit('send-notification', {
        content,
        senderName,
        senderId: userId,
        avatarSender: avatarSender,
      });
    });
  }
};
module.exports = { updateChatHistory, sendNotificationToReciver };
