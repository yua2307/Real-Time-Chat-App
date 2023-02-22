import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Avatar from '../../../shared/components/Avatar';
import { convertDate } from '../../../utils/convertDate';
import { chatTypes, getActions } from '../../../store/actions/chatActions';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

const NotifcationItem = ({
  username,
  content,
  date,
  senderId,
  setChosenChatDetails,
  chosenChatDetails,
  handleClickAway,
  avatar,
}) => {
  const handleClickItem = () => {
    handleClickAway();
    if (chosenChatDetails?.id === senderId) {
      return;
    }
    setChosenChatDetails({ id: senderId, name: username }, chatTypes.DIRECT);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={handleClickItem}>
          <CommentIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar username={username} avatar={avatar} />
      </ListItemAvatar>
      <ListItemText
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline', fontSize: '16px', color: 'white' }}
              component="span"
              variant=""
              color="text.primary"
            >
              {username}
              <span
                style={{
                  fontSize: '14px',
                  color: 'rgb(138 223 255)',
                  marginLeft: '20px',
                }}
              >
                {convertDate(date, 'dd/mm hh:min')}
              </span>
            </Typography>
            <br></br>
            <></>
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '250px',
              }}
            >
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                noWrap
              >
                {content}
              </Typography>
            </div>
          </React.Fragment>
        }
      />
    </ListItem>
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
)(NotifcationItem);
