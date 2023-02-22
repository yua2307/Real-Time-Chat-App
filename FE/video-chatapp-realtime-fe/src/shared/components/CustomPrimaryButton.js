import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CustomPrimaryButton = ({
  label,
  additionalStyles = {},
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: '#5865F2',
        color: 'white',
        textTransform: 'none',
        fontSize: '16px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
      }}
      style={additionalStyles}
      disabled={disabled}
      onClick={onClick}
    >
      <Typography variant="subtitle1" color="white">
        {label}
      </Typography>
    </Button>
  );
};

export default CustomPrimaryButton;
