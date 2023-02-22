import React from 'react';
import { SocketContext, socketConnection } from './socket';

const SocketProvider = ({ children }) => {
  const socket = socketConnection();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
