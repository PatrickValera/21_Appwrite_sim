import Head from 'next/head'
import { Container, Paper } from '@mui/material'
import PortfolioPanel from '../components/PanelPortfolio/PortfolioPanel'
import MarketPanel from '../components/PanelMarket/MarketPanel'
import ActionPanel from '../components/ActionPanel'
import { useEffect, useState } from 'react'
import api from '../api'
import { Query } from 'appwrite'
import Header from '../components/Header'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [focuseStock, setFocuseStock] = useState()
  const [assets, setAssets] = useState([])
  const [stocks, setStocks] = useState([])
  const [user, setUser] = useState()
  const [userInfo, setUserInfo] = useState()
  const [userCash, setUserCash] = useState(0)


  // FETCH STOCK AND ASSET LIST FUNC
  const fetchStocksAndAssets = async () => {
    try {
      const user = await api.account.get()
      const { documents: dataFromServerAssets } = await api.database.listDocuments('asset', [Query.equal('ownerId', user.$id)])
      const { documents: dataFromServerStocks } = await api.database.listDocuments('stock')
      setAssets(dataFromServerAssets)
      setStocks(dataFromServerStocks)
    } catch (e) {
      console.log(e)
    }

  }
  // CHANGE FOCUSED STOCK FOR ACTION PANEL
  const handleChangeFocus = (stock) => {
    setOpen(true)
    setFocuseStock(stock)
  }
  // FETCH USER INFO FUNC
  const fetchUser = async () => {
    try {
      let user = await api.account.get()
      let info = await api.database.listDocuments('userInfo', [
        Query.equal('userId', user.$id),
      ])
      setUserInfo(info.documents[0])
      setUserCash(info.documents[0].cash)
      setUser(user)
    } catch (e) {
      console.log(e.message)
    }
  }
  // FETCH User Assets EVERY 1 SECOND
  useEffect(() => {
    let interval
    if (user) {
      interval = setInterval(async () => {
        // const { documents: dataFromServerStocks } = await api.database.listDocuments('stock')
        const { documents: dataFromServerStocks } = await api.database.listDocuments('asset', [
          Query.equal('ownerId', user.$id),
        ])
        setAssets(dataFromServerStocks)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [user])
  // FETCH STOCK AND ASSET LIST ON LOAD
  useEffect(() => {
    fetchStocksAndAssets()
  }, [])
  // FETCH USER INFO ON LOAD
  useEffect(() => {
    fetchUser()
  }, [])
  // SUBSCRIBE TO USERINFO CASS
  useEffect(() => {
    if (userInfo) {
      let unsubscribe = api.subscribe(`collections.userInfo.documents.${userInfo.$id}`, (data) => {
        console.log('cash changes: ', data.payload.cash)
        setUserCash(data.payload.cash)
      })
      return () => unsubscribe()
    }
  }, [userInfo])

  return (
    <>
      <Header />

      <Container maxWidth='xl'>
        <Head>
          <title>Trading Sim</title>
          <meta name="description" content="Stock Simulator" />
          <link rel="icon" href="/favicon.ico" />
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Head>
        <>
          <Paper sx={{ p: {xs:1,md:2}, backdropFilter: 'blur(20px)' }}>
            <PortfolioPanel user={user} userInfo={userInfo} stocks={stocks} assets={assets} userCash={userCash} />
            <MarketPanel stocks={stocks} setFocuseStock={handleChangeFocus} />
          </Paper>
          {focuseStock && userInfo &&
            <ActionPanel open={open} setOpen={setOpen} stockId={focuseStock.$id} userInfo={userInfo} />
          }
        </>
      </Container>
    </>
  )
}
