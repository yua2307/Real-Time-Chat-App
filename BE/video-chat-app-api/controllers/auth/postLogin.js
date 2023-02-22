const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ mail: mail.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user._id,
          user: user,
          mail: user.mail,
        },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        user: {
          mail: user.mail,
          token,
          username: user.username,
          _id: user._id,
          avatar: user.avatar,
        },
      });
    }

    return res.status(400).send('Username or Password is not correct');
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = postLogin;
