const User = require('../../models/user');
const friendsUpdate = require('../../socketHandler/updates/friends');

const onOffNotification = async (req, res, next) => {
  const { friendIdTarget, notificationState } = req.body;

  const { userId } = req.user;

  const user = await User.findById(userId);
  const friendNeedToUpdate = await User.findById(friendIdTarget);

  if (friendIdTarget === userId) {
    return res.status(400).send('You can turn off notification with yourself');
  }

  if (!user) {
    return res.status(400).send('Cannot find user');
  }

  if (notificationState) {
    if (!user.friendsOffNotificiation.includes(friendIdTarget)) {
      user.friendsOffNotificiation = [
        ...user.friendsOffNotificiation,
        friendIdTarget,
      ];
      await user.save();
    }
  } else {
    user.friendsOffNotificiation = user.friendsOffNotificiation.filter(
      (friendId) => friendId !== friendIdTarget
    );
    await user.save();
  }

  const messageReturn = !notificationState
    ? `Turn on notification with ${friendNeedToUpdate.username} suceesfully`
    : `Turn off notification with ${friendNeedToUpdate.username} suceesfully`;

  await friendsUpdate.updateFriends(userId);

  res.status(200).send(messageReturn);
};
module.exports = onOffNotification;
