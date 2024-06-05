// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#388e3c', // Green
    },
    secondary: {
      main: '#ff6f00', // Orange
    },
    background: {
      default: '#fafafa', // Light grey
    },
  },
});

export default theme;
