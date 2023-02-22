import React from 'react';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <>
      <CustomPrimaryButton
        label="Log in"
        additionalStyles={{ marginTop: '30px' }}
        disabled={!isFormValid}
        onClick={handleLogin}
      />
      <RedirectInfo
        text="Need an account? "
        redirectText="Create an account"
        additionalStyles={{
          marginTop: '10px',
          justifyContent: 'center',
          display: 'flex',
        }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
