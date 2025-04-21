import { createTheme, ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#004aad' },
          secondary: { main: '#b5179e' },
          info: { main: '#63d6cf' },
          text: {
            primary: '#ffffff',
            secondary: '#191a21',
          },
          bg: {
            default: '#ffffff',
          },  
        }
      : {
          primary: { main: '#480ca8' },
          secondary: { main: '#ce93d8' },
          info: { main: '#80deea' },
          text: {
            primary: '#ffffff',
            secondary: '#CB9DF0',

          },
          bg: {
            default: 'transparent',
          },
        }),
      },
  typography: {
    fontFamily: 'Arial, Helvetica, sans-serif', 
    h1: { fontWeight: 600 },
    h2: { fontWeight: 500 },
    body1: { fontSize: '1rem', lineHeight: 1.5 },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? '#21222c' : '#ffffff',
          '& .MuiInputLabel-root': {
            color: 'text.primary !important', 
            '&.Mui-focused': {
              color: 'primary.main !important',
            },
          },
        },
      },
    },
  }
  
});

// Utilisation de `createTheme` pour générer un thème complet
export const createCustomTheme = (mode: 'light' | 'dark') => {
  const designTokens = getDesignTokens(mode);
  return createTheme(designTokens);
};
