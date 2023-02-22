const firebaseDB = require('./firebase');

const storage = firebaseDB.storage().ref(); // create a reference to storage
const uploadFile = async (file, res) => {
  try {
    const timestamp = Date.now();
    const name = file.name.split('.')[0];
    const type = file.name.split('.')[1];
    const fileName = `${name}_${timestamp}.${type}`;

    const imageRef = storage.child(fileName);

    const snapshot = await imageRef.put(file.data);

    const downloadUrl = await snapshot.ref.getDownloadURL();

    return downloadUrl;
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

exports.services = {
  uploadFile,
};
