const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  avatar: { type: String },
  friends: [{ type: Schema.Types.Object, ref: 'User' }],
  friendsOffNotificiation: [{ type: Schema.Types.Object, ref: 'User' }],
});

UserSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = mongoose.model('User', UserSchema);
