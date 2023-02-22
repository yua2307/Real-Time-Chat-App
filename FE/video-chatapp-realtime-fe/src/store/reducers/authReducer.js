import { authActions } from '../constants/auth';

const initialState = {
  userDetails: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authActions.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };
    default:
      return state;
  }
};

export default authReducer;
