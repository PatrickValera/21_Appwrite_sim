import { Button, Skeleton, TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../api'
const StockRow = ({ stockId, setFocuseStock }) => {
  const [stock, setStock] = useState()
  const [changePercent, setChangePercent] = useState(0)
  const fetchStock = async () => {
    await api.database.getDocument('stock', stockId).then(res => setStock(res))
  }
  useEffect(() => {
    fetchStock()
    const unsubscribe = api.subscribe(`collections.stock.documents.${stockId}`, (data) => {
      setStock(data.payload)
      setChangePercent(((data.payload.priceHistory.slice(-1)[0] - data.payload.priceHistory[0]) * 100 / data.payload.priceHistory.slice(-1)[0]).toFixed(2))
    })
    return (() => { unsubscribe() })
  }, [])
  return (
    <>
      {stock ? <TableRow hover>
        <TableCell sx={{ border: '1' }}>{stock.name[0].toUpperCase() + stock.name.slice(1)}</TableCell>
        <TableCell sx={{ border: '1' }}>{stock.ticker.toUpperCase()}</TableCell>
        <TableCell align='right' sx={{ border: '1' }}>${stock.currentPrice.toFixed(2)}</TableCell>
        <TableCell align='right' sx={{ border: '1', color: `${changePercent > 0 ? 'success.main' : 'error.main'}` }}>{changePercent}%</TableCell>
        <TableCell align='right' sx={{ border: '1' }}>
          <Button variant='contained' onClick={() => setFocuseStock(stock)}>Buy</Button>
        </TableCell>
      </TableRow> : 
      <TableRow hover>
        <TableCell colSpan={5} sx={{ border: '1' }}> <Skeleton variant="rectangular" sx={{ width: '100%' }} height={40} /></TableCell>
      </TableRow>}
    </>
  )
}

export default StockRow