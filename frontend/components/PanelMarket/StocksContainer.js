import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../api'
import StockRow from './StockRow'

const StocksContainer = ({ setFocuseStock, stocks }) => {
  // const [stocks, setStocks] = useState([])

  // const fetchData = async () => {
  //   console.log('fetching')
  //   const { documents } = await api.database.listDocuments('stocks')
  //   console.log(documents)
  //   setStocks(documents)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])
  const handleSubmit = async () => {
    try {
      await api.database.createDocument('stocks', 'unique()', {
        name: 'sample',
        ticker: 'EX',
        currentPrice: 4,
        color: 'red',
        priceHistory: [1, 2, 3, 4, 19, 5]
      })
      console.log('SUBMITTED')

    }
    catch (e) {
      console.log(e.message)

    }

  }
  // const login = async () => {
  //   const session = api.account.get()
  //   if (!session.name) {
  //     await api.account.createAnonymousSession()
  //     await api.account.updateName('anon')
  //   }
  // }
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
              <StockRow key={stock.ticker} stock={stock} setFocuseStock={setFocuseStock}/>
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