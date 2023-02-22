import axios from 'axios';
import { logout } from './utils/logout';
import { ENDPOINT_SERVER } from './config/endpoint';
import store from './store/store';
import { openAlertMessage } from './store/actions/alertNotificationActions';
import { typeAlert } from './store/constants/alertNotification';
import { setUserDetails } from './store/actions/authAction';

const BAD_REQUEST_CODE = 400;

const apiClient = axios.create({
  baseURL: `${ENDPOINT_SERVER}/api`,
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('user');
    if (user) {
      const token = JSON.parse(user).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

// public route

export const login = async (data) => {
  try {
    return await apiClient.post('/auth/login', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    return await apiClient.post('/auth/register', data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};
// secure routes

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friends/invite', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const changePassword = async (data, setError) => {
  try {
    return await apiClient.post('/auth/user/changePassword', data);
  } catch (exception) {
    if (exception?.response?.status === BAD_REQUEST_CODE) {
      setError('currPassword', {
        type: 'custom',
        message: 'Current password is incorrect',
      });
    }
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const updateProfile = async (dataForm, setError, setIsFetching) => {
  try {
    const response = await apiClient.post('/auth/user/updateProfile', dataForm);
    if (response.status === 200) {
      store.dispatch(
        openAlertMessage('Update profile successfully', typeAlert.SUCCESS)
      );
      const jwtToken = store.getState().auth?.userDetails?.token;
      const user = response.data?.user;
      const userWithJwtToken = { ...user, token: jwtToken };
      store.dispatch(setUserDetails(userWithJwtToken));
      localStorage.setItem('user', JSON.stringify(userWithJwtToken));
    }
    setIsFetching(false);

    return response;
  } catch (exception) {
    if (exception?.response?.status === BAD_REQUEST_CODE) {
      const data = exception?.response?.data;
      setError(data.field, { type: 'custom', message: data.content });
    }
    setIsFetching(false);
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const searchFriend = async (data, setIsFetchingData) => {
  try {
    const response = await apiClient.post('friends/searchFriend', data);
    setIsFetchingData(false);
    return response?.data?.listUser;
  } catch (exception) {
    setIsFetchingData(false);
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friends/accept-invite', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friends/reject-invite', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const onOffNotification = async (data) => {
  try {
    return await apiClient.post('/friends/on-off-notification', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getListNotificationByUserID = async () => {
  try {
    return apiClient.get('/notifications');
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const getNotificationUnread = async () => {
  try {
    return apiClient.get('/notifications/unread');
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const setAllNotifcationRead = async () => {
  try {
    return apiClient.patch('/notifications');
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
