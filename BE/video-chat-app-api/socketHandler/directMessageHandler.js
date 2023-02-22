const Message = require('../models/message');
const User = require('../models/user');

const Conversation = require('../models/conversation');
const chatUpdates = require('../socketHandler/updates/chat');

const directMessageHandler = async (socket, data) => {
  try {
    const { userId } = socket.user;
    const { receiverUserId, content } = data;

    const sender = await User.findById(userId);

    const message = await Message.create({
      author: userId,
      content: content,
      date: new Date(),
      type: 'DIRECT',
    });

    // find if conversation exist with this two users - if not create new
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      conversation.messages.push(message._id);
      await conversation.save();

      // perform and update to sender and receiver if is online
      chatUpdates.updateChatHistory(conversation._id.toString());
    } else {
      // create new conversation if not exists
      const newConversation = await Conversation.create({
        messages: [message._id],
        participants: [userId, receiverUserId],
      });

      // perform and update to sender and receiver if is online
      chatUpdates.updateChatHistory(newConversation._id.toString());
    }
    chatUpdates.sendNotificationToReciver(
      receiverUserId,
      content,
      sender.username,
      userId
    );
  } catch (err) {
    console.log('directMessageHandler', err);
  }
};

module.exports = directMessageHandler;
