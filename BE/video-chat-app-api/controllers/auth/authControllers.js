const postRegister = require('./postRegister');
const postLogin = require('./postLogin');
const postChangePassWord = require('./postChangePassword');
const updateProfile = require('./updateProfile');

exports.controllers = {
  postRegister,
  postLogin,
  postChangePassWord,
  updateProfile,
};
