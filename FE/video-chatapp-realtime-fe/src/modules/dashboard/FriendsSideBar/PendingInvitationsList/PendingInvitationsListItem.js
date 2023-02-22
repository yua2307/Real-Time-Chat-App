import React, { useState } from 'react';
import { Tooltip, Typography, Box } from '@mui/material';
import Avatar from '../../../../shared/components/Avatar';
import InvitationDecisionButtons from './InvitationDecisionButtons';
import { connect } from 'react-redux';
import { getActions } from '../../../../store/actions/friendsActions';
import { styled } from '@mui/system';

const WrapperText = styled('div')({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '100px',
});

const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  avatar,
  acceptFriendInvitation,
  rejectFriendInvitation,
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleAcceptInvitation = () => {
    acceptFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  const handleRejectInvitation = () => {
    rejectFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  return (
    <Tooltip title={mail} arrow placement="right" sx={{ width: '1000px' }}>
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            height: '42px',
            marginTop: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Avatar username={username} avatar={avatar} />
          <WrapperText>
            <Typography
              noWrap
              sx={{
                marginLeft: '7px',
                fontWeight: 700,
                color: '#8e9297',
                flexGrow: 1,
              }}
              variant="subtitle1"
            >
              {username}
            </Typography>
          </WrapperText>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionToProps)(PendingInvitationsListItem);
