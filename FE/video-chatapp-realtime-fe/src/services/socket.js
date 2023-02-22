import io from 'socket.io-client';
import { ENDPOINT_SERVER } from '../config/endpoint';
import React from 'react';
import { getJwtToken } from '../utils/getJwtToken';
import store from '../store/store';
import {
  setPendingFriendsInvitations,
  setIsFetchingFriendList,
  setOnlineUsers,
  setFriendList,
} from '../store/actions/friendsActions';
import { updateDirectChatHistoryIfActive } from '..//utils/chat';
import {
  handleEventNewRoomCreated,
  handleEventSetActiveRoom,
} from '../helpers/roomHandler';

import * as webRTCHandler from '../helpers/webRTCHandler';

let socket = null;

export const socketConnection = () => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    socket = io(ENDPOINT_SERVER, {
      auth: {
        token: jwtToken,
      },

      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
    });
  } else {
    socket = io(ENDPOINT_SERVER, {
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 3000,
    });
  }

  socket.on('connect', () => {});

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const { friends } = data;
    store.dispatch(setIsFetchingFriendList(false));
    store.dispatch(setFriendList(friends));
  });

  socket.on('online-users', (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on('direct-chat-history', (data) => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on('create-room', (data) => {
    handleEventNewRoomCreated(data);
  });

  socket.on('active-rooms', (data) => {
    handleEventSetActiveRoom(data);
  });

  socket.on('conn-prepare', (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
    socket.emit('conn-init', { connUserSocketId: connUserSocketId });
  });

  socket.on('conn-init', (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on('conn-signal', (data) => {
    webRTCHandler.handleSignalData(data);
  });

  socket.on('room-has-user-left', (data) => {
    const { socketIdUserLeaveRoom } = data;
    webRTCHandler.handleUserLeaveRoom(socketIdUserLeaveRoom);
  });

  return socket;
};

export const sendDirectMessage = (data) => {
  socket.emit('direct-message', data);
};

export const getDirectChatHistory = (data) => {
  socket.emit('direct-chat-history', data);
};

export const createRoom = (socketFriendId) => {
  if (socketFriendId) {
    socket.emit('create-room', socketFriendId);
    return;
  }

  socket.emit('create-room');
};

export const joinRoom = (data) => {
  socket.emit('join-room', data);
};

export const leaveRoom = (data) => {
  socket.emit('leave-room', data);
};

export const emitPeerData = (data) => {
  socket.emit('conn-signal', data);
};

export const SocketContext = React.createContext(socket);
