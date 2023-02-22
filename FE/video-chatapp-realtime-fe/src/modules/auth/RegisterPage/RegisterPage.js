import AuthBox from '../../../shared/components/AuthBox';
import InputWithLabel from '../../../shared/components/InputWithLabel';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PageHeader from '../../../shared/components/PageHeader';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import RedirectInfo from '../../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/authAction';
import KeyIcon from '@mui/icons-material/Key';
import AlertNotification from '../../../shared/components/AlertNotification';

const registerSchema = yup.object().shape({
  mail: yup
    .string()
    .email('Must be a valid email address')
    .required('This field is required'),
  username: yup
    .string()
    .min(6, 'Username must be at least 8 characters')
    .max(32, 'Username must be at most 32 characters')
    .required('This field is required'),
  newPassword: yup
    .string()
    .min(8, 'New password must be at least 8 characters')
    .max(32, 'New password must be at most 32 characters')
    .required('This field is required'),
  reEnterPassword: yup
    .string()
    .min(8, 'Re-enter password must be at least 8 characters')
    .max(32, 'Re-enter password must be at most 32 characters')
    .required('This field is required')
    .oneOf([yup.ref('newPassword')], 'Your passwords must be the same'),
});

const RegisterPage = ({ register }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(registerSchema),
  });

  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowReEnterPassword, setIsShowReEnterPassword] = useState(false);

  const handleRegister = (data) => {
    const bodyRegister = {
      mail: data.mail,
      username: data.username,
      password: data.newPassword,
    };

    register(bodyRegister, navigate);
  };

  return (
    <>
      <AuthBox>
        <form>
          <PageHeader title="Create New Account" />
          <Controller
            name="mail"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                handleValueChange={onChange}
                value={value}
                label="E-mail Address"
                type="text"
                placeholder="Enter e-mail address"
                startIcon={<EmailIcon />}
                error={errors.mail}
              />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                handleValueChange={onChange}
                value={value}
                label="User Name"
                type="text"
                placeholder="Enter User Name"
                startIcon={<AccountCircle />}
                error={errors.username}
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
                type={isShowReEnterPassword ? 'text' : 'password'}
                placeholder="Re-Enter Your Password"
                error={errors.reEnterPassword}
                startIcon={<KeyIcon />}
                endIcon={
                  isShowReEnterPassword ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )
                }
                onClickEndIcon={() =>
                  setIsShowReEnterPassword(!isShowReEnterPassword)
                }
              />
            )}
          />
          <CustomPrimaryButton
            label="Register"
            disabled={!isValid}
            onClick={handleSubmit(handleRegister)}
            additionalStyles={{ marginTop: '20px' }}
          />
        </form>

        <RedirectInfo
          text="Already have an account "
          redirectText="Let's login"
          additionalStyles={{
            marginTop: '10px',
            justifyContent: 'center',
            display: 'flex',
          }}
          redirectHandler={() => navigate('/login')}
        />
      </AuthBox>
      <AlertNotification />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapDispatchToProps)(RegisterPage);
