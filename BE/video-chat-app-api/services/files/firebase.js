const firebase = require('firebase');
// Initialize firebase admin SDK
const firebaseConfig = {
  apiKey: 'AIzaSyAfLZv9NeAZL_9Jif2IFJXjHifS0dicxFg',
  authDomain: 'real-time-chat-app-6ca22.firebaseapp.com',
  projectId: 'real-time-chat-app-6ca22',
  storageBucket: 'real-time-chat-app-6ca22.appspot.com',
  messagingSenderId: '278236105990',
  appId: '1:278236105990:web:5e6f793ce103ef6ab9a287',
  measurementId: 'G-HSM4EVYNZY',
};

const firebaseDB = firebase.initializeApp(firebaseConfig);

module.exports = firebaseDB;
