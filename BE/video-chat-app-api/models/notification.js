const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  content: {
    type: String,
  },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Notification', notificationSchema);
