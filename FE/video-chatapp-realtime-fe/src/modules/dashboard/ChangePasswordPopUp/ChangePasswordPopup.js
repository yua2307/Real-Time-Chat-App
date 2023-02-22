import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import InputWithLabel from '../../../shared/components/InputWithLabel';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { changePassword } from '../../../api';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/alertNotificationActions';
import { typeAlert } from '../../../store/constants/alertNotification';

const stylesDialog = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const changePasswordSchema = yup.object().shape({
  currPassword: yup
    .string('This field must be string')
    .min(8, 'Current password must be at least 8 characters')
    .max(32, 'Current password must be at most 32 characters')
    .required('This is mandatory field'),
  newPassword: yup
    .string('This field must be string')
    .min(8, 'New password must be at least 8 characters')
    .max(32, 'New password must be at most 32 characters')
    .required('This is mandatory field')
    .notOneOf(
      [yup.ref('currPassword')],
      'New password and Current password cannot be the same'
    ),
  reEnterPassword: yup
    .string('This field must be string')
    .min(8, 'Re-enter password must be at least 8 characters')
    .max(32, 'Re-enter password must be at most 32 characters')
    .required('This is mandatory field')
    .oneOf(
      [yup.ref('newPassword')],
      'New password and Re-enter password must be the same'
    ),
});

const ChangePasswordPopup = ({
  isDialogOpen,
  closeDialogHandler,
  openAlertMessage,
}) => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
  });

  const [isShowCurrPassword, setIsShowCurrPassword] = React.useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = React.useState(false);
  const [isShowRePassword, setIsShowRePassword] = React.useState(false);

  const handleChangePassword = (data) => {
    const response = changePassword(data, setError);
    if (!response.error) {
      openAlertMessage('Password change successfully', typeAlert.SUCCESS);
      closeDialogHandler();
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={closeDialogHandler} fullWidth={true}>
      <DialogTitle style={stylesDialog}>
        <Typography variant="subtitles">Update Your Information</Typography>
      </DialogTitle>
      <DialogContent>
        <Controller
          name="currPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputWithLabel
              handleValueChange={onChange}
              value={value}
              label="Current Password"
              type={isShowCurrPassword ? 'text' : 'password'}
              placeholder="Enter Current Password"
              error={errors.currPassword}
              startIcon={<KeyIcon />}
              endIcon={
                isShowCurrPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
              onClickEndIcon={() => {
                setIsShowCurrPassword(!isShowCurrPassword);
              }}
            />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputWithLabel
              handleValueChange={onChange}
              value={value}
              label="New Password"
              type={isShowNewPassword ? 'text' : 'password'}
              placeholder="Enter New Password"
              error={errors.newPassword}
              startIcon={<KeyIcon />}
              endIcon={
                isShowNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
              onClickEndIcon={() => setIsShowNewPassword(!isShowNewPassword)}
            />
          )}
        />
        <Controller
          name="reEnterPassword"
          control={control}
          render={({ field: { onChange, value } }) => (
            <InputWithLabel
              handleValueChange={onChange}
              value={value}
              label="Re-enter Password"
              type={isShowRePassword ? 'text' : 'password'}
              placeholder="Re-Enter Your Password"
              error={errors.reEnterPassword}
              startIcon={<KeyIcon />}
              endIcon={
                isShowRePassword ? <VisibilityIcon /> : <VisibilityOffIcon />
              }
              onClickEndIcon={() => setIsShowRePassword(!isShowRePassword)}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <CustomPrimaryButton
          onClick={handleSubmit(handleChangePassword)}
          disabled={!isValid}
          label="Change Password"
          additionalStyles={{
            marginLeft: '15px',
            marginRight: '15px',
            marginBottom: '10px',
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(ChangePasswordPopup);
