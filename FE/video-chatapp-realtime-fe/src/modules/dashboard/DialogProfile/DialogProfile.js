import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import InputWithLabel from '../../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AvatarUpload from '../../../shared/components/AvatarUpload';
import { updateProfile } from '../../../api';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import LinearProgress from '@mui/material/LinearProgress';

const stylesDialog = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Label = styled('p')({
  color: '#b9bbbe',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
});

const updateInformationSchema = yup.object().shape({
  username: yup.string().required(),
  mail: yup.string().email('Must be a valid email address').required(),
});

const DialogProfile = ({ isDialogOpen, closeDialogHandler, userDetails }) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: 'onFocus',
    resolver: yupResolver(updateInformationSchema),
    defaultValues: {
      username: userDetails.username,
      mail: userDetails.mail,
      avatar: userDetails.avatar,
    },
  });

  const handleUpdateInformationProfile = (data) => {
    setIsFetching(true);
    const dataForm = new FormData();
    dataForm.append('mail', data.mail);
    dataForm.append('username', data.username);
    dataForm.append('file', data.avatar);
    updateProfile(dataForm, setError, setIsFetching);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onClose={closeDialogHandler}>
        <DialogTitle style={stylesDialog}>
          <Typography variant="subtitles"> Your Information</Typography>
        </DialogTitle>
        <DialogContent sx={{ overflowY: 'hidden' }}>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                handleValueChange={onChange}
                value={value}
                label="User Name"
                type="text"
                placeholder="Update user name"
                startIcon={<AccountCircle />}
                error={errors.username}
              />
            )}
          />
          <Controller
            name="mail"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                handleValueChange={onChange}
                value={value}
                label="Email"
                type="text"
                placeholder="Update Email"
                startIcon={<EmailIcon />}
                error={errors.mail}
              />
            )}
          />
          <Label>Avatar</Label>
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Controller
              name="avatar"
              control={control}
              render={({ field: { onChange, value } }) => (
                <AvatarUpload
                  handleValueChange={onChange}
                  defaultImage={value}
                />
              )}
            />
            <Label>Browse or drag image into the above area</Label>
            {isFetching && (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <CustomPrimaryButton
            onClick={handleSubmit(handleUpdateInformationProfile)}
            disabled={
              !(
                isValid &&
                (dirtyFields.mail || dirtyFields.username || dirtyFields.avatar)
              )
            }
            label="Update"
            additionalStyles={{
              marginLeft: '15px',
              marginRight: '15px',
              marginBottom: '10px',
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};

export default connect(mapStateToProps)(DialogProfile);
