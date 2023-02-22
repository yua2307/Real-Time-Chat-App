import React from 'react';
import { styled } from '@mui/system';
import FriendsListItem from './FriendsListItem';
import { connect } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  return friends.map((friend) => {
    return {
      ...friend,
      isOnline: onlineUsers.findIndex((user) => user.userId === friend.id) >= 0,
    };
  });
};

const FriendsList = ({ friends, onlineUsers, isFetchingFriendList }) => {
  const listFriends = React.useMemo(
    () => checkOnlineUsers(friends, onlineUsers),
    [friends, onlineUsers]
  );

  return (
    <MainContainer>
      {isFetchingFriendList ? (
        <CircularProgress color="primary" size={50} sx={{ padding: '100px' }} />
      ) : (
        listFriends.map((f) => (
          <FriendsListItem
            username={f.username}
            id={f.id}
            key={f.id}
            isOnline={f.isOnline}
            isOffNotificiation={f?.offNotificiation}
            mail={f.mail}
            avatar={f.avatar}
          />
        ))
      )}
    </MainContainer>
  );
};

const mapStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStateToProps, null)(FriendsList);
