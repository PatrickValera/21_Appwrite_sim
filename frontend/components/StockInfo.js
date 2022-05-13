import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StockGraph from './Graph'
import api from '../api'
import FlexBox from './utilcomps/FlexBox'

const StockPanel = ({ stock,priceHistory }) => {
 
  return (
    <>
      {stock && 
      <Box sx={{ flex: '300px 1 1' }}>
        <FlexBox>
          <Box sx={{ flex: 'auto 1 1' }}>
            <Typography variant='h4' >{stock.ticker.toUpperCase()}</Typography>
            <Typography variant='body2' color='grey.500'>{stock.name}</Typography>
          </Box>
          <Typography variant='h6'>${stock.currentPrice.toFixed(2)}</Typography>
        </FlexBox>

        {priceHistory.length && <StockGraph width='100%' data={priceHistory} color='red' />}

      </Box>}
    </>
  )
}

export default StockPanel