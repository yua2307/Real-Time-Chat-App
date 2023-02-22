import * as api from '../../api';
import { authActions } from '../constants/auth';
import { typeAlert } from '../constants/alertNotification';
import { openAlertMessage } from './alertNotificationActions';
export const getActions = (dispatch) => {
  return {
    login: (userDetails, navigate) => dispatch(login(userDetails, navigate)),
    register: (userDetails, navigate) =>
      dispatch(register(userDetails, navigate)),
  };
};

export const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    if (response.error) {
      dispatch(
        openAlertMessage(response?.exception?.response?.data, typeAlert.ERROR)
      );
    } else {
      const { user } = response?.data;
      dispatch(setUserDetails(user));
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    }
  };
};

const register = (userDetails, navigate) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    if (response.error) {
      dispatch(
        openAlertMessage(response?.exception?.response?.data, typeAlert.INFO)
      );
    } else {
      dispatch(openAlertMessage('Register Sucessfully', typeAlert.SUCCESS));
      setTimeout(navigate('/login'), 2000);
    }
  };
};
