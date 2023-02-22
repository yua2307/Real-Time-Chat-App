import React, { useState } from 'react';
import AuthBox from '../../../shared/components/AuthBox';
import PageHeader from '../../../shared/components/PageHeader';
import LoginPageFooter from './LoginPageFooter';
import InputWithLabel from '../../../shared/components/InputWithLabel';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/authAction';
import { useNavigate } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import AlertNotification from '../../../shared/components/AlertNotification';
const loginSchema = yup.object().shape({
  mail: yup
    .string()
    .email('Must be a valid email address')
    .required('This field is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .required('This field is required'),
});

const LoginPage = ({ login }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    shouldFocusError: true,
    resolver: yupResolver(loginSchema),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const onSubmit = (data) => {
    const loginBody = {
      mail: data.mail,
      password: data.password,
    };

    login(loginBody, navigate);
  };

  return (
    <>
      <AuthBox>
        <form>
          <PageHeader
            title="Welcome to our application!"
            subtitle=" We are happy that you are with us!"
          />
          <Controller
            name="mail"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                handleValueChange={onChange}
                value={value}
                label="E-mail"
                type="text"
                placeholder="Enter e-mail address"
                error={errors.mail}
                startIcon={<EmailIcon />}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputWithLabel
                handleValueChange={onChange}
                value={value}
                label="Password"
                type={isShowPassword ? 'text' : 'password'}
                placeholder="Enter password"
                error={errors.password}
                startIcon={<KeyIcon />}
                endIcon={
                  isShowPassword ? <VisibilityIcon /> : <VisibilityOffIcon />
                }
                onClickEndIcon={handleShowPassword}
              />
            )}
          />
          <LoginPageFooter
            isFormValid={isValid}
            handleLogin={handleSubmit(onSubmit)}
          />
        </form>
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

export default connect(null, mapDispatchToProps)(LoginPage);
