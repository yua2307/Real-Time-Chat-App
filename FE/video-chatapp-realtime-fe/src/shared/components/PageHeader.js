import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system/';

const WrapperDiv = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const PageHeader = ({ title, subtitle }) => {
  return (
    <WrapperDiv>
      <Typography variant="h5" sx={{ color: 'white' }}>
        {title}
      </Typography>
      <Typography sx={{ color: '#b9bbbe' }}>{subtitle}</Typography>
    </WrapperDiv>
  );
};

export default PageHeader;
