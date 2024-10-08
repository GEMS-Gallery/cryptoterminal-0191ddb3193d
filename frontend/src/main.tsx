import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FF00',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#00FF00',
      secondary: '#CCCCCC',
    },
  },
  typography: {
    fontFamily: 'Courier, monospace',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
