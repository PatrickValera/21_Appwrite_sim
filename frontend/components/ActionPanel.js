import { Backdrop, Box, Button, Divider, Paper, Slider, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from './utilcomps/FlexBox'
import api from '../api'
import { Query } from "appwrite";
import StockInfo from './StockInfo';

const ActionPanel = ({ open, setOpen, stockId, userInfo }) => {
    const [intent, setIntent] = useState(1)
    const [stock, setStock] = useState(0)
    const [priceHistory, setPriceHistory] = useState([])
    const [error, setError] = useState("")
    // HANDLE BUY AND SELL ACTIONS
    const handleAction = async (action) => {
        // Get Users Id
        const user = await api.account.get()
        let UserCash
        await api.database.getDocument('userInfo', userInfo.$id).then(res => UserCash = res.cash)
        // Fetch all assets of User
        await api.database.listDocuments('asset', [
            Query.equal('ownerId', user.$id),
        ])
            // AFTER FETCHING ASSET, UPDATE/CREATE
            .then((response) => {
                try {
                    let exist = response.documents.find(x => x.stockId === stock.$id)
                    let value = intent * stock.currentPrice
                    console.log('value:', value)
                    // CREATE NEW ASSET DOC IF NOT EXIST=======================
                    if (!exist && action === 'buy') {
                        // console.log('Creating new asset')
                        // console.log('user cash:', UserCash)
                        if (value > UserCash) console.log('Not Enough cash')
                        else {
                            api.database.createDocument('asset', 'unique()', {
                                ownerId: user.$id,
                                stockName: stock.name,
                                shares: intent,
                                averageCost: stock.currentPrice,
                                stockId: stock.$id
                            })
                            let newCash = UserCash - value
                            api.database.updateDocument('userInfo', userInfo.$id, { cash: newCash })
                        }
                    }
                    // UPDATE ASSET DOC IF ASSET EXIST=========================
                    else {
                        // console.log('Updating asset')
                        let newShares = exist.shares
                        let newAvgCost = exist.averageCost
                        // IF ACTION IS TO SELL, SUBTRACT INTENT OT OWNED AND ADD CASH
                        if (action === 'sell') {
                            // console.log("SELLING")
                            newShares = exist.shares - intent
                            if (intent > exist.shares) newShares = intent
                            let newCash = UserCash + value
                            api.database.updateDocument('userInfo', userInfo.$id, { cash: newCash })

                        }
                        // IF ACTION IS TO BUY AND ASSET EXIST, ADD TO OWNED AND SUBTRACT CASH
                        else {
                            if (value > UserCash) console.log('Not Enough cash')
                            else {
                                // console.log("BUYING")
                                newShares = exist.shares + intent
                                newAvgCost = (exist.shares * exist.averageCost + intent * stock.currentPrice) / (intent + exist.shares)
                                let newCash = UserCash - value
                                api.database.updateDocument('userInfo', userInfo.$id, { cash: newCash })
                            }
                        }
                        // DELETE DOCUMENT IF SOLD ALL
                        if (newShares <= 0) api.database.deleteDocument('asset', exist.$id)
                        else api.database.updateDocument('asset', exist.$id, { shares: newShares, averageCost: newAvgCost })
                    }
                } catch (error) {
                    setError(error.message)
                }

            }, (error) => {
                console.log(error)
            });
    }
    // FETCH STOCK DATA USING ID THEN SET ACTIVE STOCK TO RES
    const fetchStockData = async () => {
        let promise = api.database.getDocument('stock', stockId)
        promise.then(function (response) {
            setStock(response)
        })
    }
    // FETCH STOCKDATA ON LOAD/OPEN PANEL
    useEffect(() => {
        fetchStockData()
    }, [stockId])
    // SUBSCRIBE TO STOCK DOC USING ID
    useEffect(() => {
        api.database.getDocument('stock', stockId).then(res => {
            setStock(res)
            let ar = res.priceHistory.map(x => ({
                "name": "Page A",
                "uv": x,
                "formated": Number(x.toFixed(0)),
            }))
            setPriceHistory(ar)
        })
        const unsubscribe = api.subscribe(`collections.stock.documents.${stockId}`, (data) => {
            let ar = data.payload.priceHistory.map(x => ({
                "name": "Page A",
                "uv": x,
                "formated": Number(x.toFixed(0)),
            }))
            setPriceHistory(ar)
            setStock(state => (data.payload))
        })
        return (() => {
            setPriceHistory([])
            setStock(0)
            unsubscribe()
        })
    }, [stockId])


    return (
        <Backdrop open={open} onClick={() => setOpen(false)} sx={{ display: `${open ? 'fixed' : 'none'}`, position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0 }}>
            {stock &&
                <Paper sx={{ flexWrap: 'wrap', display: 'flex', p: { xs: 2, sm: 2, md: 4 }, pointerEvents: 'all', width: '60vw', minWidth: '350px', maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
                    <Box sx={{ flex: '320px 1 0' }}>
                        <StockInfo stock={stock} priceHistory={priceHistory} />

                    </Box>
                    <Box sx={{ flex: '180px 0 0', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <Typography variant='body2' color='error.main'>{error && error} </Typography>
                        <FlexBox sx={{ flexWrap: 'noWrap', alignItems: 'center' }}>
                            <Typography variant='body2'>Intent: </Typography>
                            <TextField sx={{ display: 'flex',p:0,textAlign:'center' }} type='number' value={intent} onChange={(e) => setIntent(e.target.value)} />
                        </FlexBox>
                        <Slider aria-label="Volume" value={intent} min={1} max={10} onChange={(e) => setIntent(e.target.value)} />
                        <FlexBox sx={{ mb: 1,justifyContent:'center',my:1 }}>
                            <Button variant='outlined' color='error' onClick={() => handleAction('sell')}>SELL</Button>
                            <Button variant='outlined' color='success' onClick={() => handleAction('buy')}>BUY</Button>
                        </FlexBox>
                        <FlexBox>
                            <Typography variant='body2' sx={{flexGrow:'1'}}>Current Price: </Typography>
                            <Typography variant='body2'>${(stock.currentPrice).toFixed(2)} </Typography>
                        </FlexBox>
                        <FlexBox>
                            <Typography variant='body2' sx={{flexGrow:'1'}}>Total Cost: $ </Typography>
                            <Typography variant='body2'>${(intent * stock.currentPrice).toFixed(2)} </Typography>
                        </FlexBox>
                  
                    </Box>

                </Paper>}
        </Backdrop>
    )
}

export default ActionPanel