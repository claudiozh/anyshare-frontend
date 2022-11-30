import { CssBaseline, responsiveFontSizes, ThemeProvider } from '@mui/material';
import App from '@src/App';
import theme from '@src/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
