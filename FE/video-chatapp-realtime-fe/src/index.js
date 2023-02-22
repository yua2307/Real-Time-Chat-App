import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const container = document.getElementById('root');
const root = createRoot(container);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
