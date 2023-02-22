const express = require('express');
const router = express.Router();
const Joi = require('joi');
const authMiddleware = require('../middleware/auth');
const validator = require('express-joi-validation').createValidator({});
const friendControllers = require('../controllers/friends/friendsController');

const friendInvitationsSchema = Joi.object({
  mailInvite: Joi.string().email().required(),
});

const onOffNotificationDto = Joi.object({
  friendIdTarget: Joi.string().required(),
  notificationState: Joi.boolean().required(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

const mailFindSchema = Joi.object({
  mail: Joi.string().required(),
});

router.post(
  '/invite',
  authMiddleware,
  validator.body(friendInvitationsSchema),
  friendControllers.controllers.postFriendInvitations
);

router.post(
  '/accept-invite',
  authMiddleware,
  validator.body(inviteDecisionSchema),
  friendControllers.controllers.postAccept
);
router.post(
  '/reject-invite',
  authMiddleware,
  validator.body(inviteDecisionSchema),
  friendControllers.controllers.postReject
);
router.post(
  '/on-off-notification',
  authMiddleware,
  validator.body(onOffNotificationDto),
  friendControllers.controllers.onOffNotification
);

router.post(
  '/searchFriend',
  authMiddleware,
  validator.body(mailFindSchema),
  friendControllers.controllers.searchFriend
);

router.get('/test', (req, res) => {
  res.send('request passed');
});
module.exports = router;
