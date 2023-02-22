import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import Messages from './Message/Messages';
import NewMessageInput from './NewMessageInput';
import { getDirectChatHistory } from '../../../services/socket';
import { getActions } from '../../../store/actions/chatActions';
import { connect } from 'react-redux';

const Wrapper = styled('div')({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails, setIsFetching }) => {
  useEffect(() => {
    setIsFetching(true);
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails.id, setIsFetching]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(MessengerContent);
