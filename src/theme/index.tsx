import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'Inter',
      'Robot',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#1E2E3D',
      dark: '#273444',
    },
    text: {
      primary: '#828FA1',
      secondary: '#FFFFFF',
    },
    secondary: {
      main: '#5150FF',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          '& ::-webkit-scrollbar': {
            width: '10px',
            background: '#1E2835',
          },
          '& ::-webkit-scrollbar-track': {},
          '& ::-webkit-scrollbar-thumb': {
            background: '#f1f4f8',
            borderRadius: '5px',
          },
          '& ::-webkit-scrollbar-thumb:hover': {},
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '1px solid #273444',
          backgroundColor: '#1E2835',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          outline: 'none',
          borderRadius: 8,
          '&.Mui-focused': {
            border: '1px solid #5150FF',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#869AB8',
        },
      },
    },
  },
});

export default theme;
