import React from 'react';
import { styled } from '@mui/system';
import Avatar from '../../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';
import DropdownMenu from './DropdownMenu';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import * as roomHandler from '../../../../helpers/roomHandler';
import { IconButton } from '@mui/material';
import { connect } from 'react-redux';
import { Tooltip } from '@mui/material';

const WrapperText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '10px',
});

const MainContainer = styled('div')({
  width: '98%',
  display: 'flex',
  flexDirection: 'row',
});

const WrapprerIcon = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
});

const MessagesHeader = ({
  name = '',
  socketOnlineUserID,
  localStream,
  avatar,
}) => {
  const [isDisableVideoButton, setIsDisableVideoButton] = React.useState(
    !localStream && socketOnlineUserID
  );
  const handleCreateNewRoom = () => {
    setIsDisableVideoButton(false);
    roomHandler.createNewRoomPrivateWithUser(socketOnlineUserID);
  };

  React.useEffect(() => {
    setIsDisableVideoButton(!localStream && socketOnlineUserID);
  }, [localStream, isDisableVideoButton, socketOnlineUserID]);

  return (
    <MainContainer>
      <WrapperText>
        <Avatar large username={name} avatar={avatar} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          {name}
        </Typography>
        <Typography
          sx={{
            color: '#b9bbbe',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          This is the beginning of your conversation with {name}
        </Typography>
      </WrapperText>
      <WrapprerIcon>
        <DropdownMenu />
        {isDisableVideoButton && (
          <Tooltip
            title={`Call video to ${name}`}
            arrow
            placement="right"
            sx={{ fontSize: '16px' }}
          >
            <IconButton onClick={handleCreateNewRoom} disabled={!!localStream}>
              <VideoCallIcon sx={{ color: 'white', fontSize: 30 }} />
            </IconButton>
          </Tooltip>
        )}
      </WrapprerIcon>
    </MainContainer>
  );
};

const mapStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStateToProps, null)(MessagesHeader);
