const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username mail avatar');

    // find all active connections of specific userId
    const receiverList = serverStore.getActiveConnections(userId);
    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((receiverSocketId) => {
      io.to(receiverSocketId).emit('friends-invitations', {
        pendingInvitations: pendingInvitations ? pendingInvitations : [],
      });
    });
  } catch (err) {}
};

const updateFriends = async (userId) => {
  try {
    // find active connections of specific id
    const receiverList = serverStore.getActiveConnections(userId);

    if (receiverList.length > 0) {
      const user = await User.findById(userId, {
        _id: 1,
        friends: 1,
        friendsOffNotificiation: 1,
        avatar: 1,
      }).populate('friends', '_id username mail avatar');

      if (user) {
        const friendsList = user.friends.map((f) => {
          return {
            id: f._id,
            mail: f.mail,
            username: f.username,
            avatar: f.avatar,
          };
        });

        if (user.friendsOffNotificiation.length > 0) {
          user.friendsOffNotificiation.forEach((friendID) => {
            friendsList.forEach((friend) => {
              if (friend.id.toString() === friendID.toString()) {
                friend.offNotificiation = true;
              }
            });
          });
        }

        // get io server instance
        const io = serverStore.getSocketServerInstance();

        receiverList.forEach((receiverSocketId) => {
          io.to(receiverSocketId).emit('friends-list', {
            friends: friendsList ? friendsList : [],
          });
        });
      }
    }
  } catch (err) {
    console.log('err on updateFriends', err);
  }
};

const updateOnlineUsers = () => {
  const io = serverStore.getSocketServerInstance();
  const onlineUsers = serverStore.getOnlineUsers();

  io.emit('online-users', { onlineUsers: onlineUsers ? onlineUsers : [] });
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
  updateOnlineUsers,
};
