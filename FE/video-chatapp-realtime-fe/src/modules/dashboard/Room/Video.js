import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/system';
// import PushPinIcon from '@mui/icons-material/PushPin';

const MainContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  height: '50%',
  width: '50%',
  backgroundColor: 'black',
  borderRadius: '8px',
});

const VideoEl = styled('video')({
  width: '100%',
  height: '100%',
});

const Video = ({ stream, isLocalStream, isRoomMinimized, key }) => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <MainContainer>
      <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />
      {/* {!isRoomMinimized && <PushPinIcon color="primary" fontSize="large" />} */}
    </MainContainer>
  );
};

export default Video;
