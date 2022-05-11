import { createTheme } from '@mui/material/styles'

let lightTheme = createTheme({})
lightTheme = createTheme({
  palette: {
    mode: 'light',
    background:{
      nav:'rgb(120, 215, 255)'
    }
  },
  typography: {
    body1: {
      fontSize: '.6rem',
      [lightTheme.breakpoints.up('md')]: {
        fontSize: '.6rem',
      },
      [lightTheme.breakpoints.up('sm')]: {
        fontSize: '.9rem',
      },
    },
    body2: {
      fontSize: '0.7rem',
      [lightTheme.breakpoints.up('md')]: {
        fontSize: '1rem',
      },
    },
    h2: {
      fontSize: '2rem',
      [lightTheme.breakpoints.up('md')]: {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1.4rem',
      [lightTheme.breakpoints.up('md')]: {
        fontSize: '1.75rem',
      },
    },
    h6: {
      fontSize: '1.1rem',
      [lightTheme.breakpoints.up('md')]: {
        fontSize: '1.3rem',
      },
    },
  },
})

export default lightTheme
