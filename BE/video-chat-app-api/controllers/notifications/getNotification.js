const User = require('../../models/user');
const Notification = require('../../models/notification');

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const notificationList = await Notification.find({
      receiver: userId,
    })
      .populate('sender', '_id username avatar')
      .populate('receiver', '_id username avatar')
      .sort({ createdAt: 'desc' });

    res.status(200).send(notificationList);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = getNotifications;
