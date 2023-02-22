const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const authMiddleware = require('../middleware/auth');

const authControllers = require('../controllers/auth/authControllers');

const registerSchema = Joi.object({
  mail: Joi.string().email().required(),
  username: Joi.string().min(6).max(32).required(),
  password: Joi.string().min(6).max(32).required(),
});

const loginSchema = Joi.object({
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(32).required(),
});

router.post(
  '/register',
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);

router.post(
  '/login',
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

router.post(
  '/user/updateProfile',
  authMiddleware,
  authControllers.controllers.updateProfile
);
router.post(
  '/user/changePassword',
  authMiddleware,
  authControllers.controllers.postChangePassWord
);

module.exports = router;
