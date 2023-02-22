const postFriendInvitations = require('./postFriendInvitations');
const postAccept = require('./postAccept');
const postReject = require('./postReject');
const onOffNotification = require('./onOffNotification');
const searchFriend = require('./searchFriend');

exports.controllers = {
  postFriendInvitations,
  postAccept,
  postReject,
  onOffNotification,
  searchFriend,
};
