import React from 'react';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';

const AvatarPreview = styled('div')({
  height: '42px',
  width: '42px',
  backgroundColor: '#5865f2',
  borderRadius: '42px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: '700',
  color: 'white',
});

const AvatarUser = ({ username, large, avatar }) => {
  return avatar ? (
    <Avatar
      src={avatar}
      sx={
        large
          ? { height: '80px', width: '80px' }
          : { height: '42px', width: '42px' }
      }
    />
  ) : (
    <AvatarPreview style={large ? { height: '80px', width: '80px' } : {}}>
      {username ? username.substring(0, 2) : username}
    </AvatarPreview>
  );
};

export default AvatarUser;
