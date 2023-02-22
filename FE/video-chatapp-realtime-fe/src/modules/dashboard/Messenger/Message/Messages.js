import React from 'react';
import { styled } from '@mui/system';
import MessagesHeader from './MessagesHeader';
import { connect } from 'react-redux';
import Message from './Message';
import DateSeparator from './DateSeparator';
import { convertDate } from '../../../../utils/convertDate';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { getActions } from '../../../../store/actions/chatActions';
import { getAvatarUser } from '../../../../utils/getAvatarUser';

const MainContainer = styled('div')({
  height: 'calc(100% - 60px)',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const checkIsOnlineUser = (friendId, onlineUsers, setIsFetching) => {
  const onlineFriend = onlineUsers.find((user) => {
    if (user.userId.toString() === friendId.toString()) {
      return user;
    }
    return null;
  });

  return onlineFriend?.socketId;
};

const Messages = ({
  chosenChatDetails,
  messages,
  friends,
  onlineUsers,
  isFetching,
  setIsFetching,
}) => {
  const messagesEndRef = React.useRef(null);
  const socketOnlineUserID = checkIsOnlineUser(
    chosenChatDetails?.id,
    onlineUsers
  );
  const avatarUser = React.useMemo(
    () => getAvatarUser(chosenChatDetails?.id, friends),
    [chosenChatDetails?.id, friends]
  );

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const renderMessageContent = React.useCallback(
    (listMessage) => {
      if (listMessage.length === 0) {
        return (
          <Typography
            sx={{
              color: '#b9bbbe',
              marginTop: '20px',
            }}
            variant="subtitles"
          >
            You and {chosenChatDetails?.name} are not chat anything. Let talk
            with other
          </Typography>
        );
      }

      return listMessage.map((message, index) => {
        const sameAuthor =
          index > 0 &&
          messages[index].author._id === messages[index - 1].author._id;

        const sameDay =
          index > 0 &&
          convertDate(message.date, 'dd/mm/yy') ===
            convertDate(messages[index - 1].date, 'dd/mm/yy');

        return (
          <div key={message._id} style={{ width: '97%' }}>
            {(!sameDay || index === 0) && (
              <DateSeparator date={convertDate(message.date, 'dd/mm/yy')} />
            )}
            <Message
              content={message.content}
              username={message.author.username}
              sameAuthor={sameAuthor}
              date={convertDate(message.date, 'hh:min')}
              sameDay={sameDay}
              avatar={message.author.avatar}
            />
          </div>
        );
      });
    },
    [chosenChatDetails?.name, messages]
  );

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      isFetching && setIsFetching(false);
    }, 5000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [isFetching, setIsFetching]);

  return (
    <MainContainer>
      <MessagesHeader
        name={chosenChatDetails?.name}
        avatar={avatarUser}
        socketOnlineUserID={socketOnlineUserID}
      />
      {isFetching ? (
        <CircularProgress color="primary" size={100} sx={{ margin: 'auto' }} />
      ) : (
        renderMessageContent(messages)
      )}
      <div ref={messagesEndRef} />
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat, friends }) => {
  return {
    ...chat,
    ...friends,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Messages);
