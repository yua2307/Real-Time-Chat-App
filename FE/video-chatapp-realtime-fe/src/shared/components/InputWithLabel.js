import React from 'react';
import { styled } from '@mui/system';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

const Label = styled('p')({
  color: '#b9bbbe',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
});

const LabelError = styled('span')({
  color: '#f44336',
  fontWeight: '400',
  fontSize: '14px',
  marginTop: '5px',
});

const styleInput = {
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  fontSize: '16px',
  padding: '0 5px',
};

const InputWithLabel = ({
  value = '',
  handleValueChange,
  label,
  type,
  placeholder,
  error = undefined,
  startIcon = undefined,
  onClickStarIcon = undefined,
  endIcon = undefined,
  onClickEndIcon = undefined,
}) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        style={styleInput}
        onChange={handleValueChange}
        type={type}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start" onClick={onClickStarIcon}>
            {startIcon}
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end" onClick={onClickEndIcon}>
            {endIcon}
          </InputAdornment>
        }
      />
      {error && <LabelError>{error.message}</LabelError>}
    </Wrapper>
  );
};

export default InputWithLabel;
