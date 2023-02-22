import * as React from 'react';
import List from '@mui/material/List';
import FriendResultItem from './FriendResultItem';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FriendListResult = ({ listFriendsSearch }) => {
  return (
    <List sx={{ width: '100%', bgcolor: '#bbb2b229', borderRadius: '20px' }}>
      {listFriendsSearch.length === 0 ? (
        <Box
          sx={{
            width: '100%',
            marginTop: '12px',
            height: '100px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <SearchOffIcon sx={{ fontSize: 50, marginBottom: '10px' }} />
          <Typography
            sx={{ display: 'inline', fontSize: '14px', color: 'white' }}
            component="span"
            variant=""
            color="text.primary"
          >
            No friend matching with your request. Please search again
          </Typography>
        </Box>
      ) : (
        listFriendsSearch.map((friend) => (
          <FriendResultItem
            mail={friend.mail}
            username={friend.username}
            avatar={friend.avatar}
          />
        ))
      )}
    </List>
  );
};

export default FriendListResult;
