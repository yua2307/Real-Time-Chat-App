import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './modules/auth/LoginPage/LoginPage';
import RegisterPage from './modules/auth/RegisterPage/RegisterPage';
import DashboardPage from './modules/dashboard/DashboardPage';
import SocketProvider from './services/socketProvider';
import PrivateRoute from './shared/components/PrivateRoute';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <SocketProvider>
                  <DashboardPage />
                </SocketProvider>
              </PrivateRoute>
            }
          />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
