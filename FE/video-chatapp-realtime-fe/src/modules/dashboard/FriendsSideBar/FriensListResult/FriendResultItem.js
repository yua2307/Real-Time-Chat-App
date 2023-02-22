import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '../../../../shared/components/Avatar';
import { connect } from 'react-redux';
import { getActions } from '../../../../store/actions/friendsActions';

const FriendResultItem = ({ mail, username, avatar, sendFriendInvitation }) => {
  const handleSendInvitation = () => {
    sendFriendInvitation({ mailInvite: mail });
  };
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={handleSendInvitation}
        >
          <SendIcon color="primary" />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar avatar={avatar} username={username} />
      </ListItemAvatar>
      <ListItemText primary={mail} secondary={username} />
    </ListItem>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(FriendResultItem);
