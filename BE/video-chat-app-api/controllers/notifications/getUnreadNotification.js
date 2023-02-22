const User = require('../../models/user');
const Notification = require('../../models/notification');

const getUnreadNotification = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const notificationList = await Notification.find({
      receiver: userId,
      isRead: false,
    });

    res
      .status(200)
      .send({ numberNotificationsUnread: notificationList?.length });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = getUnreadNotification;
