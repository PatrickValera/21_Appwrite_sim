import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import FlexBox from './utilcomps/FlexBox'

const Header = () => {
  return (
    <FlexBox sx={{ p: 1,width:'100%',bgcolor:'background.paper', mb:4, p:2 }}>
      <Typography variant='h5'>Mock Stock Platform</Typography>
      <FlexBox sx={{justifyContent:'right',flexGrow:'1' }}>
        <Button className='blur' variant='contained' >Patrick V</Button>

      </FlexBox>
    </FlexBox>
  )
}

export default Header