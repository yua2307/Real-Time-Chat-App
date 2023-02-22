import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import InputWithLabel from '../../../shared/components/InputWithLabel';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/friendsActions';
import EmailIcon from '@mui/icons-material/Email';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FriendListResult from './FriensListResult/FriendListResult';
import Box from '@mui/material/Box';
import { searchFriend } from '../../../api';
import CircularProgress from '@mui/material/CircularProgress';

const stylesDialogTitle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const addFriendSchema = yup.object().shape({
  mail: yup.string().required('This field is required'),
});

const AddFriendDialog = ({ isDialogOpen, closeDialogHandler }) => {
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [isShowListSearch, setShowListSearch] = React.useState(false);
  const [listFriendsSearch, setFriendsSearch] = React.useState([]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(addFriendSchema),
  });

  const handleClickSearchIcon = async () => {
    setShowListSearch(true);
    setIsFetchingData(true);
    const { mail } = getValues();
    const friendsSearch = await searchFriend({ mail }, setIsFetchingData);
    setFriendsSearch(friendsSearch);
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialogHandler}>
      <DialogTitle style={stylesDialogTitle}>
        <Typography variant="subtitles">Invite a Friend</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Typography component={'span'}>
            Enter e-mail address to search friend
          </Typography>
        </DialogContentText>
        <Controller
          name="mail"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputWithLabel
              handleValueChange={onChange}
              value={value}
              label="Mail"
              type="text"
              placeholder="Enter mail address"
              startIcon={<EmailIcon />}
              endIcon={
                <IconButton>
                  <SearchIcon onClick={handleSubmit(handleClickSearchIcon)} />
                </IconButton>
              }
              error={errors.mail}
            />
          )}
        />
        {isShowListSearch &&
          (isFetchingData ? (
            <CircularProgress
              color="primary"
              size={50}
              sx={{ display: 'flex', marginTop: '12px', margin: 'auto' }}
            />
          ) : (
            <Box sx={{ width: '100%', maxWidth: 480, marginTop: '12px' }}>
              <FriendListResult listFriendsSearch={listFriendsSearch} />
            </Box>
          ))}
      </DialogContent>
    </Dialog>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapDispatchToProps)(AddFriendDialog);
