import React from 'react';
import { styled } from '@mui/system';
import CameraButton from './CameraButton';
import MicButton from './MicroButton';
import CloseRoomButton from './CloseRoomButton';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ScreenShareButton from './ScreenShareButton';
import { connect } from 'react-redux';
import { getActions } from '../../../../store/actions/roomAction';

const MainContainer = styled('div')({
  height: '15%',
  width: '100%',
  backgroundColor: '#5865f2',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const RoomButtons = (props) => {
  const {
    localStream,
    isUserJoinedWithOnlyAudio,
    roomResizeHandler,
    isRoomMinimized,
  } = props;

  return (
    <MainContainer>
      <ScreenShareButton {...props} />
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}

      <IconButton style={{ color: 'white' }} onClick={roomResizeHandler}>
        {isRoomMinimized ? <OpenInFullIcon /> : <CloseFullscreenIcon />}
      </IconButton>
    </MainContainer>
  );
};
const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(RoomButtons);
