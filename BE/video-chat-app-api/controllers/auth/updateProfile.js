const User = require('../../models/user');
const fileService = require('../../services/files/fileService');

const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { mail, username } = req.body;

    const userNeedToUpdate = await User.findById(userId, {
      _id: 1,
      username: 1,
      mail: 1,
      avatar: 1,
    });

    if (!userNeedToUpdate) {
      return res.status(404).send('Can not find user with id ' + userId);
    }

    if (userNeedToUpdate.username !== username) {
      const checkUserNameExists = await User.findOne({ username: username });
      if (checkUserNameExists) {
        return res.status(400).send({
          field: 'username',
          content: 'Username you choose has already been taken',
        });
      } else {
        userNeedToUpdate.mail = mail;
      }
    }

    if (userNeedToUpdate.mail !== mail) {
      const checkMailExists = await User.findOne({ mail: mail });
      if (checkMailExists) {
        return res.status(400).send({
          field: 'mail',
          content: 'Email you choose has already been taken',
        });
      } else {
        userNeedToUpdate.username = username;
      }
    }

    let downloadUrl = '';
    const file = req?.files?.file;
    if (file) {
      downloadUrl = await fileService.services.uploadFile(file, res);
      if (downloadUrl) userNeedToUpdate.avatar = downloadUrl;
    }

    await userNeedToUpdate.save();
    return res.status(200).send({ user: userNeedToUpdate });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = updateProfile;
