import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
