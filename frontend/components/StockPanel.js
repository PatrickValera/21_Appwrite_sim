import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import StockGraph from './StockGraph'
import api from '../api'

const StockPanel = ({ stock }) => {
    useEffect(() => {
        console.log(stock.$id)
        const unsubscribe = api.subscribe(`collections.stocks.documents.${stock.$id}`, (data) => {
        //   if (data.event === 'database.documents.create') {
        //     console.log(data.payload)
        //   }
          console.log('update for ',stock.tickerSymbol)
        })
        return (() => {
          unsubscribe()
        })
      }, [])
    return (
        <>
            <Typography variant='h6' color={stock.color}>{stock.tickerSymbol.toUpperCase()}</Typography>
            <Typography variant='body2'>{stock.name}</Typography>
            <Typography variant='body2'>{stock.currentPrice}</Typography>
            <StockGraph color={stock.color} />

        </>
    )
}

export default StockPanel