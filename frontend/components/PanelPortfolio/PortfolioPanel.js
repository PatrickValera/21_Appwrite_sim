import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import StockGraph from '../Graph'
import FlexBox from '../utilcomps/FlexBox'
import api from '../../api'
import { Query } from 'appwrite'
import Link from 'next/link'
import { AiFillThunderbolt } from 'react-icons/ai'
import { ImCoinDollar } from 'react-icons/im'
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
    console.log(userInfo)
    let newNum = userCash
    const { documents } = await api.database.listDocuments('asset', [Query.equal('ownerId', user.$id)])
    for (let i = 0; i < documents.length; i++) {
      await api.database.getDocument('stock', documents[i].stockId).then(res => {
        newNum += res.currentPrice * documents[i].shares

      })
    }
    await api.database.updateDocument('userInfo', userInfo.$id, {
      netWorth: newNum
    })
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
        "formated": Number(newNum.toFixed(0))
      })
      return ar
    })
  }, [userCash, user, stocks])


  // CALL CALC PORTF VALUE EVERTIME STOCKS LISTS CHANGES
  useEffect(() => {
    if (user) calculateBal()
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
          <Paper elevation={4} sx={{ p: { xs: 1, md: 3 }, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2'>Portfolio Value</Typography>
            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography sx={{ fontSize: '2.2rem !important' }} > <ImCoinDollar /></Typography>
              <Typography variant='h2'>{Number(balance.toFixed(0)).toLocaleString("en-US")}</Typography>
              <Typography variant='body2' color='grey.400' fontSize='1.5rem !important'>.{(balance % 1 * 100).toFixed(0)}</Typography>
            </FlexBox>
            <Box ref={graph}>
              <StockGraph data={data} width={width} color='#14AF7D' />
            </Box>
          </Paper>
          <FlexBox sx={{ px: 1, py: 3, alignItems: 'center' }}>
            <Typography variant='h5'><AiFillThunderbolt /> </Typography>
            <Typography variant='body2'>Buying Power: </Typography>
            <Typography variant='h5' sx={{ ml: 1 }}>${Number(userCash.toFixed(2)).toLocaleString("en-US")}</Typography>
          </FlexBox>
          <Divider sx={{ flex: '100% 1 1' }} />
        </> :
        <FlexBox sx={{ flexDirection: 'column', alignContent: 'center', minHeight: '400px', justifyContent: 'center', borderBottom: '1px solid grey' }}>
          <Typography variant='h6'>Login to start trading.</Typography>
          <Link href='/UserLogin'>
            <Button variant='contained'>Login</Button>
          </Link>
        </FlexBox>
      }
    </>
  )
}

export default PortfolioPanel