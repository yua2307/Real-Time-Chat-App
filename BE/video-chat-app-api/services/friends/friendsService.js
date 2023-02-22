const User = require('../../models/user');
const serverStore = require('../../serverStore');

const getFriendListSocketId = async (userId) => {
  const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
    'friends',
    '_id username mail avatar'
  );
  const friendListSocketId = [];

  const listfriendId = user.friends.map((f) => {
    return f._id.toString();
  });
  const connectedUsers = serverStore.getConnectedUsers();
  connectedUsers.forEach((value, key) => {
    if (listfriendId.indexOf(value.userId) !== -1) {
      friendListSocketId.push(key);
    }
  });
  return friendListSocketId;
};

module.exports = { getFriendListSocketId };
