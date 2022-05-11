import { createTheme } from '@mui/material/styles';

let darkTheme=createTheme({
  palette:{
    mode:'dark'
  }
})
darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary:{
      // ...darkTheme.palette.primary,light:'red'
      dark:'rgba(130,190,255,.9)',
      main:'rgba(130,190,255,.95)'
    },
    background:{
      nav:'#232323'
    }
  },
  typography: {
    body1: {
      fontSize: '.6rem',
      [darkTheme.breakpoints.up('md')]: {
        fontSize: '.6rem',
      },
      [darkTheme.breakpoints.up('sm')]: {
        fontSize: '.9rem',
      },
    },
    body2: {
      fontSize: '0.7rem',
      [darkTheme.breakpoints.up('md')]: {
        fontSize: '1rem',
      },
    },
    h2: {
      fontSize: '2rem',
      [darkTheme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1.4rem',
      [darkTheme.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
    },
    h6: {
      fontSize: '1.1rem',
      [darkTheme.breakpoints.up('md')]: {
        fontSize: '1.3rem',
      },
    },
  },
});

export default darkTheme;