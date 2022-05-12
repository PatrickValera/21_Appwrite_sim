import { Button, TableCell, TableRow } from '@mui/material'
import React from 'react'

const StockRow = ({stock,setFocuseStock}) => {
  return (
    <TableRow hover>
      <TableCell sx={{ border: '1' }}>{stock.name[0].toUpperCase() + stock.name.slice(1)}</TableCell>
      <TableCell sx={{ border: '1' }}>{stock.ticker.toUpperCase()}</TableCell>
      <TableCell align='right' sx={{ border: '1' }}>${stock.currentPrice.toFixed(2)}</TableCell>
      <TableCell align='right' sx={{ border: '1' }}>{((stock.priceHistory.slice(-1)[0] - stock.priceHistory[0]) * 100 / stock.priceHistory.slice(-1)[0]).toFixed(2)}</TableCell>
      <TableCell align='right' sx={{ border: '1' }}>
        <Button variant='contained' onClick={() => setFocuseStock(stock)}>Buy</Button>
      </TableCell>
    </TableRow>
  )
}

export default StockRow