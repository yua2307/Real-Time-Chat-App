const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const notificationController = require('../controllers/notifications/notificationController');

router.get(
  '',
  authMiddleware,
  notificationController.controllers.getNotification
);

router.get(
  '/unread',
  authMiddleware,
  notificationController.controllers.getUnreadNotification
);

router.post(
  '',
  authMiddleware,
  notificationController.controllers.createNotification
);

router.patch(
  '',
  authMiddleware,
  notificationController.controllers.updateNotification
);

module.exports = router;
