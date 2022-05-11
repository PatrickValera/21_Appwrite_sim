import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StockGraph from './StockGraph'
import api from '../api'

const StockPanel = ({ stock:stockFromDb }) => {
    const [stock,setStock]=useState(stockFromDb)
    useEffect(() => {
        console.log(stock.$id)
        const unsubscribe = api.subscribe(`collections.stocks.documents.${stock.$id}`, (data) => {
        //   if (data.event === 'database.documents.create') {
        //     console.log(data.payload)
        //   }
        console.log('update for ',stock.ticker)
        console.log(data)
        setStock(state=>({...state,currentPrice:data.payload.currentPrice}))
        })
        return (() => {
          unsubscribe()
        })
      }, [])
    return (
        <Box sx={{flex:'300px 1 1'}}>
            <Typography variant='h6' color={stock.color}>{stock.ticker.toUpperCase()}</Typography>
            <Typography variant='body2'>{stock.name}</Typography>
            <Typography variant='body2'>{stock.currentPrice}</Typography>
            <StockGraph color={stock.color} />

        </Box>
    )
}

export default StockPanel