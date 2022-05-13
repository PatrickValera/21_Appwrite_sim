import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import StockGraph from '../Graph'
import FlexBox from '../utilcomps/FlexBox'
import api from '../../api'
import { Query } from 'appwrite'
import Link from 'next/link'
// const dataSample = [
//   {
//     "name": "Page G",
//     "uv": 0,
//     "pv": 0,
//     "amt": 0
//   }, {
//     "name": "Page G",
//     "uv": 0,
//     "pv": 0,
//     "amt": 0
//   }, {
//     "name": "Page G",
//     "uv": 0,
//     "pv": 0,
//     "amt": 0
//   }, {
//     "name": "Page G",
//     "uv": 0,
//     "pv": 0,
//     "amt": 0
//   },
// ]
// USER CASH

const PortfolioPanel = ({ assets, stocks, user, userInfo, userCash }) => {
  const [balance, setBalance] = useState(0)
  const [width, setWidth] = useState('100%')
  const [data, setData] = useState([])
  const graph = useRef()

  // CALCULATE PORTFOLIO VALUE
  const calculateBal = useCallback(async () => {
  
    if (!stocks.length) return []
    console.log('CALC')
    let newNum = userCash
    const { documents } = await api.database.listDocuments('asset', [Query.equal('ownerId', user.$id)])
    for (let i = 0; i < documents.length; i++) {
      await api.database.getDocument('stock', documents[i].stockId).then(res => {
        newNum += res.currentPrice * documents[i].shares
      })
    }
    setBalance(newNum)
    setData(state => {
      let ar = []
      if (state.length < 300) {
        ar = state.slice(0)
      } else {
        ar = state.slice(1)
      }
      ar.push({
        "name": "Page A",
        "uv": newNum.toFixed(2),
        "formated":Number(newNum.toFixed(0))
      })
      return ar
    })
  }, [userCash, user,stocks])


  // CALL CALC PORTF VALUE EVERTIME STOCKS LISTS CHANGES
  useEffect(() => {
    if(user)calculateBal()
  }, [assets, user])


  // LISTEN FOR WINDOW RESIZING
  useEffect(() => {
    window.addEventListener('resize', () => {
      console.log(graph.current.offsetWidth)
      setWidth(graph.current.offsetWidth)
    })
  }, [])

  return (
    <>
      {user ?
        <>
          <Paper elevation={4} sx={{ p: {xs:1,md:3}, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2'>Portfolio Value</Typography>
            <Typography variant='h2'>${balance.toFixed(2)}</Typography>
            <Box ref={graph}>
              <StockGraph data={data} width={width} color='#14AF7D' />
            </Box>
          </Paper>
          <FlexBox sx={{ px: 1, py: 3 }}>
            <Typography>Buying Power: </Typography>
            <Typography>${userCash.toFixed(2)}</Typography>
          </FlexBox>
          <Divider sx={{ flex: '100% 1 1' }} />
        </> :
        <FlexBox sx={{ flexDirection: 'column', alignContent: 'center', minHeight: '400px', justifyContent: 'center', borderBottom: '1px solid grey' }}>
          <Typography variant='h6'>Login to start trading.</Typography>
          <Link href='/userLogin'>
            <Button variant='contained'>Login</Button>
          </Link>
        </FlexBox>
      }
    </>
  )
}

export default PortfolioPanel