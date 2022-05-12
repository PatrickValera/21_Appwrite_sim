import { Typography, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../api'

const StocksContainer = ({setFocuseStock, stocks}) => {
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
              <TableCell align='right' sx={{}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {stocks.map((stock) => 
              <TableRow key={stock.ticker} hover>
                <TableCell sx={{ border: '1' }}>{stock.name[0].toUpperCase()+stock.name.slice(1)}</TableCell>
                <TableCell  sx={{ border: '1' }}>{stock.ticker.toUpperCase()}</TableCell>
                <TableCell align='right' sx={{ border: '1' }}>${stock.currentPrice.toFixed(2)}</TableCell>
                <TableCell align='right' sx={{ border: '1' }}>{((stock.priceHistory.slice(-1)[0]-stock.priceHistory[0])*100/stock.priceHistory.slice(-1)[0]).toFixed(2)}</TableCell>
                <TableCell align='right' sx={{ border: '1' }}>
                  <Button onClick={()=>setFocuseStock(stock)}>Buy</Button>
                  </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default StocksContainer