import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ userDetails, children }) => {
  const isLoggedIn = !!(
    userDetails && JSON.parse(localStorage.getItem('user'))
  );

  return isLoggedIn ? children : <Navigate to="/login" />;
};

const mapStateToProps = ({ auth }) => {
  return {
    ...auth,
  };
};
export default connect(mapStateToProps, null)(PrivateRoute);
