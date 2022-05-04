import { Typography, Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StockPanel from './StockPanel'
import api from '../api'
const StocksContainer = () => {
  const [stocks, setStocks] = useState([])

  const fetchData = async () => {
    console.log('fetching')
    const { documents } = await api.database.listDocuments('stocks')
    console.log(documents)
    setStocks(documents)
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleSubmit = async () => {
    try {
      await api.database.createDocument('stocks', 'unique()', {
        name: 'sample',
        tickerSymbol: 'EX',
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
  const login = async () => {
    const session = api.account.get()
    if (!session.name) {
      await api.account.createAnonymousSession()
      await api.account.updateName('anon')
    }

  }
  return (
    <Box>
      <Typography variant='h2' onClick={handleSubmit}
      >
        Stocks
      </Typography>
      <Box display='flex' sx={{flexWrap:'wrap'}}>
        {stocks.map((stock) => (<StockPanel key={stock.tickerSymbol} stock={stock} />))}

      </Box>
    </Box>
  )
}

export default StocksContainer