import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '../../../../shared/components/Avatar';
import Typography from '@mui/material/Typography';
import OnlineIndicator from './OnlineIndicator';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import { chatTypes, getActions } from '../../../../store/actions/chatActions';
import { connect } from 'react-redux';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';

const WrapperText = styled('div')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100px',
});

const FriendsListItem = ({
  id,
  mail,
  username,
  isOnline,
  isOffNotificiation,
  setChosenChatDetails,
  chosenChatDetails,
  avatar,
}) => {
  const handleChooseActiveConversation = () => {
    if (chosenChatDetails?.id && chosenChatDetails.id === id) {
      return;
    }
    setChosenChatDetails({ id: id, name: username }, chatTypes.DIRECT);
  };

  return (
    <Tooltip title={mail} arrow placement="right" sx={{ width: '1000px' }}>
      <Button
        onClick={handleChooseActiveConversation}
        style={{
          width: '100%',
          height: '42px',
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textTransform: 'none',
          color: 'black',
          position: 'relative',
        }}
      >
        <Avatar username={username} avatar={avatar} />
        <WrapperText>
          <Typography
            noWrap
            style={{
              marginLeft: '7px',
              fontWeight: 700,
              color: '#8e9297',
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
        </WrapperText>
        {isOffNotificiation && (
          <NotificationsOffIcon color="primary" sx={{ marginLeft: '10px' }} />
        )}
        {isOnline && <OnlineIndicator />}
      </Button>
    </Tooltip>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(
  mapStoreStateToProps,
  mapActionsToProps
)(FriendsListItem);
