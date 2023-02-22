const Notification = require('../../models/notification');
const User = require('../../models/user');

const updateNotification = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const notifications = await Notification.updateMany(
      { receiver: userId, isRead: false },
      { isRead: true }
    );

    return res.status(200).send(notifications);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = updateNotification;
