// _app.js
import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00e676', // Text color
    },
    background: {
      default: '#212121', // Background color
    },
    text: {
      primary: '#00e676', // Text color
    },
  },
  typography: {
    allVariants: {
      color: '#00e676',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
