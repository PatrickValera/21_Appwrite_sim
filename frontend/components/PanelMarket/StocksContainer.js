import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import StockRow from './StockRow'

const StocksContainer = ({ setFocuseStock, stocks }) => {
  

  return (
    <Box>
      <Typography variant='h4' textAlign='center'>
        Market
      </Typography>
      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{}}>
          <TableHead>
            <TableRow >
              <TableCell sx={{ width: '30%' }}>Name</TableCell>
              <TableCell sx={{ width: '10%' }}>Ticker</TableCell>
              <TableCell align='right' sx={{}}>Price</TableCell>
              <TableCell align='right' sx={{}}>Trend 1hr</TableCell>
              <TableCell align='right' sx={{}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {stocks.map((stock) =>
              <StockRow key={stock.ticker} stockId={stock.$id} setFocuseStock={setFocuseStock}/>
            )}
            {!stocks.length && [1, 2, 3, 4, 5].map(index => (
              <TableRow key={index} hover>
                <TableCell colSpan={5} sx={{ border: '1' }}> <Skeleton variant="rectangular" sx={{ width: '100%' }} height={40} /></TableCell>
              </TableRow>
            ))}


          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  )
}

export default StocksContainer