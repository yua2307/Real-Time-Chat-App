const User = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdate = require('../../socketHandler/updates/friends');

const postFriendInvitations = async (req, res, next) => {
  const { mailInvite } = req.body;

  const { userId, mail } = req.user;

  if (mail.toLowerCase() === mailInvite.toLowerCase()) {
    return res.status(400).send('Sorry.You cannot become friend with yourself');
  }

  const targetUser = await User.findOne({
    mail: mailInvite.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(`We cannot find user ${mailInvite}. Please try again`);
  }

  // check if the user whuch we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );
  if (usersAlreadyFriends) {
    return res
      .status(400)
      .send(
        `You and ${mailInvite} are already friends. Please check friend list`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(400).send('Invitation has been already sent');
  }
  // check if the user which we would like to invite is already our friend
  // check if reciverId is already my friend
  const senderUser = await User.findOne({
    mail: mail.toLowerCase(),
  });

  // create new invitation in DB
  await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  res.status(200).send({ mail: mail });

  friendsUpdate.updateFriendsPendingInvitations(targetUser._id.toString());
};
module.exports = postFriendInvitations;
