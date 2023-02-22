const User = require('../../models/user');
const Notification = require('../../models/notification');

const getUnreadNotification = async (req, res) => {
  try {
    const { userId } = req.user;

    const { content, senderId, receiverId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const newNoti = await Notification.create({
      sender: userId,
      receiver: receiverId,
      content: content,
      isRead: false,
    });
    newNoti.save();

    res.status(200).send(newNoti);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = getUnreadNotification;
