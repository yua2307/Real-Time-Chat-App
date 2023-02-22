const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const authRoutes = require('./routes/authRoutes');
const friendRoutes = require('./routes/friendRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const socketSever = require('./socketServer');
const PORT = process.env.PORT || process.env.API_ROOT;

const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static('files'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.all('*', function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'PUT, GET, POST, DELETE, OPTIONS'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Cache-Control, Pragma, Origin, Authorization, access-token, Access-Control-Allow-Headers,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
//   );
//   return next();
// });

// register the routes
app.use('/api/auth', authRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/notifications', notificationRoutes);

const server = http.createServer(app);
socketSever.registerSocketServer(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connect DB successfully');
    server.listen(PORT, () => {
      console.log(`Server is listening at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Database connection failed: ' + error.message);
  });
