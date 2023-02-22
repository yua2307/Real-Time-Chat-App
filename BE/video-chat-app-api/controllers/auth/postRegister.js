const User = require('../../models/user');

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const mailExists = await User.exists({ mail: mail.toLowerCase() });

    if (mailExists) {
      return res.status(400).send('Email already in use');
    }

    const userNameExists = await User.exists({
      username: username,
    });

    if (userNameExists) {
      return res.status(400).send('Username already in use');
    }

    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: password,
    });

    res.status(200).json('Create account successfully');
  } catch (err) {
    return res.status(500).send(err);
  }
};
module.exports = postRegister;
