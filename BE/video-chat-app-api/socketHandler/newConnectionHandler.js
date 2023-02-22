const serverStore = require('../serverStore');
const friendUpdate = require('../socketHandler/updates/friends');
const socketHelper = require('./helpers/socketHelper');

const handleNewConnection = async (socket) => {
  const user = socket.user;
  serverStore.addNewConnectedUser({ socketId: socket.id, userId: user.userId });

  // update pending invitations friend listen
  friendUpdate.updateFriendsPendingInvitations(user.userId);
  friendUpdate.updateFriends(user.userId);

  const activeRooms = serverStore.getActiveRooms();

  setTimeout(() => {
    socketHelper.sendDataViaSocketId(
      { activeRooms: activeRooms },
      socket.id,
      'active-rooms'
    );
  }, [500]);
};
module.exports = handleNewConnection;
