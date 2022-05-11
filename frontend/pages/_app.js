import Header from '../components/Header'
import '../styles/globals.css'
import { ThemeProvider, CssBaseline } from '@mui/material'
import lightTheme from '../styles/theme/lightTheme'
import darkTheme from '../styles/theme/darkTheme'
import { useState } from 'react'
import Footer from '../components/Footer'
function MyApp({ Component, pageProps }) {
  const [isLightTheme, setLightTheme] = useState(false)
  return (
    <>

      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer/>
      </ThemeProvider>
    </>)
}

export default MyApp
