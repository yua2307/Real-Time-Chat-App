const User = require('../../models/user');

const searchUser = async (req, res) => {
  try {
    const { mail } = req.body;
    const mailRegex = new RegExp(mail, 'i');
    const listUser = await User.find(
      { mail: mailRegex },
      { username: 1, mail: 1, avatar: 1 }
    );
    return res.status(200).send({ listUser: listUser });
  } catch (err) {
    return res.status(500).send('Something went wrong please try again');
  }
};

module.exports = searchUser;
