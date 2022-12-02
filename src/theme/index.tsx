import { createTheme, experimental_sx as sx } from '@mui/material/styles';

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
      main: '#5150FF',
    },
    text: {
      primary: '#828FA1',
      secondary: '#FFFFFF',
    },
    secondary: {
      main: '#5150FF',
      dark: '#1E2835',
    },
    background: {
      default: '#1E2E3D',
      paper: '#273444',
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
        root: ({ theme: th }) => ({
          border: `1px solid ${th.palette.background.paper}`,
          backgroundColor: th.palette.secondary.dark,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme: th }) => ({
          outline: 'none',
          borderRadius: 8,
          '&.Mui-focused': {
            border: `1px solid ${th.palette.primary.main}`,
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: sx({
          px: 3,
          py: 1.2,
          borderRadius: 2,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: sx({
          boxShadow: '0px 8px 24px 0px #00000026',
          borderRadius: 2,
        }),
      },
    },
  },
});

export default theme;
