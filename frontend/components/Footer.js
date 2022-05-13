import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Container maxWidth='lg' sx={{ p: 2 }}>
      <Typography variant='h6'>Mock Trading Platform</Typography>
      <Divider sx={{my:3}}/>
      <Typography variant='body1'>Made by Patrick Valera</Typography>
      <Typography variant='body1'>2022</Typography>
    </Container>
  )
}

export default Footer
