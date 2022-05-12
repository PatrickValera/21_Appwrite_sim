import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StockGraph from './Graph'
import api from '../api'
import FlexBox from './utilcomps/FlexBox'

const StockPanel = ({ stockId }) => {
  const [stock, setStock] = useState(0)
  const [priceHistory, setPriceHistory] = useState([])
  useEffect(() => {
    api.database.getDocument('stock', stockId).then(res =>{ 
      setStock(res)
      let ar = res.priceHistory.map(x => ({
        "name": "Page A",
        "uv": x,
        "pv": x,
        "amt": x
      }))
      setPriceHistory(ar)
    })
    const unsubscribe = api.subscribe(`collections.stock.documents.${stockId}`, (data) => {
      let ar = data.payload.priceHistory.map(x => ({
        "name": "Page A",
        "uv": x,
        "pv": x,
        "amt": x
      }))
      setPriceHistory(ar)
      setStock(state => (data.payload))
    })
    return (() => {
      setPriceHistory([])
      setStock(0)
      unsubscribe()
    })
  }, [stockId])
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