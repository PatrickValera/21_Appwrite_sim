import { Box } from '@mui/material'
import React from 'react'
const FlexBox = ({children,sx}) => {
  return (
      <Box display='flex' sx={[{flexWrap:'wrap'},sx]}>{children}</Box>
  )
}

export default FlexBox