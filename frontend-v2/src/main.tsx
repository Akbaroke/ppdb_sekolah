import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  MantineProvider,
  createTheme,
  // localStorageColorSchemeManager,
} from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from './redux/index.ts';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import { Toaster } from 'sonner';

const theme = createTheme({
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  cursorType: 'pointer',
  colors: {
    blue: [
      '#fff5db', // Light gold
      '#ffeaaf',
      '#ffd666',
      '#ffcc33', // Gold
      '#ffa500', // Reference gold
      '#c59004', // Final gold color
      '#c59004', // Final gold color
      '#c59004', // Final gold color
      '#c59004', // Final gold color
      '#c59004', // Final gold color
    ],
  },
});

// const colorSchemeManager = localStorageColorSchemeManager({
//   key: 'my-app-color-scheme',
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider
      theme={theme}
      // colorSchemeManager={colorSchemeManager}
      defaultColorScheme="light">
      <Provider store={store}>
        <Toaster expand={false} position="top-center" richColors />
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>
);
