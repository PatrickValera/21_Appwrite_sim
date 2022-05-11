import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h6'>Mock Stocks Trading</Typography>
      <Divider sx={{my:3}}/>
      <Typography variant='body1'>2022</Typography>
    </Box>
  )
}

export default Footer
