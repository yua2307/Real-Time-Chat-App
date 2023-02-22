const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postChangePassWord = async (req, res) => {
  try {
    const { userId } = req.user;
    const { currPassword, newPassword } = req.body;

    const user = await User.findById(userId);

    if (user && (await bcrypt.compare(currPassword, user.password))) {
      user.password = newPassword;
      await user.save();
      return res.status(200).send('Change password Sucessfully');
    }

    return res.status(400).send('Current password is not correct');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = postChangePassWord;
