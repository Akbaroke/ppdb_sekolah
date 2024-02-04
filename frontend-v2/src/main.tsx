import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './redux/index.ts';
import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  cursorType: 'pointer',
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="auto">
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
