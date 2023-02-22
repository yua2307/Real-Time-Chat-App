import React from 'react';
import { styled } from '@mui/system';
import MainPageButton from './MainPageButton';
import { SocketContext } from '../../../services/socket';

const MainContainer = styled('div')({
  width: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
});

const SideBar = () => {
  const socket = React.useContext(SocketContext);

  React.useEffect(() => {
    return () => {
      socket.close();
    };
  }, [socket]);
  return (
    <MainContainer>
      <MainPageButton />
    </MainContainer>
  );
};

export default SideBar;
