import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authReducer';
import alertNotificationReducer from './reducers/alertNotificationReducer';
import friendsReducer from './reducers/friendsReducer';
import chatReducer from './reducers/chatReducer';
import roomReducer from './reducers/roomReducer';
import notificationReducer from './reducers/notificationReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertNotificationReducer,
  friends: friendsReducer,
  chat: chatReducer,
  room: roomReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);

export default store;
