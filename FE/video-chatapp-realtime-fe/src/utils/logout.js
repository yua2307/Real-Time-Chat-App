import * as roomHandler from '../helpers/roomHandler';

export const logout = () => {
  roomHandler.leaveRoom();
  localStorage.clear();
  window.location.pathname = '/login';
};
