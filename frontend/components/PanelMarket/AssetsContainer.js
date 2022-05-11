import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Query } from 'appwrite'
import React, { useEffect, useState } from 'react'
import api from '../../api'

const AssetsContainer = () => {
  const [portfolio,setPortfolio]=useState()
  const fetchData = async () => {
    console.log('fetching Assets')
    const user=await api.account.get()
    const { documents } = await api.database.listDocuments('asset',[Query.equal('ownerId',user.$id)])
    console.log(documents)
    setPortfolio(documents)
  }
  useEffect(() => {
    if(!portfolio)fetchData()
    
  }, [])
  return (
    <Box>
      <Typography variant='h6'>
        Your Assets
      </Typography>
      <TableContainer sx={{ width: '100%' }}>
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '70%' }}>Ticker</TableCell>
              <TableCell align='right' sx={{}}>Shares</TableCell>
              <TableCell align='right' sx={{}}>Avg Price</TableCell>
              <TableCell align='right' sx={{}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {portfolio&&portfolio.map((asset,index) => (
              <TableRow key={index} hover>
                <TableCell sx={{ border: '0' }}>{asset.stock}</TableCell>
                <TableCell align='right' sx={{ border: '0' }}>{asset.shares}</TableCell>
                <TableCell align='right' sx={{ border: '0' }}>${asset.averagePrice}</TableCell>
                <TableCell align='right' sx={{ border: '0' }}><Button>...</Button></TableCell>
              </TableRow>
              // <StockPanel key={stock.tickerSymbol} stock={stock} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AssetsContainer