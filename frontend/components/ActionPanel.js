import { Backdrop, Button, Paper, Slider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FlexBox from './utilcomps/FlexBox'
import api from '../api'
import { Query } from "appwrite";
import StockInfo from './StockInfo';

const ActionPanel = ({ open, setOpen, stockId }) => {
    const [intent, setIntent] = useState(1)
    const [activeStock,setActiveStock] = useState(undefined)
    // HANDLE BUY AND SELL ACTIONS
    const handleAction = async (action) => {
        // Get Users Id
        const user = await api.account.get()
        // Fetch all assets of User
        let promise = api.database.listDocuments('asset', [
            Query.equal('ownerId', user.$id),
        ]);

        promise.then(function (response) {
            let exist = response.documents.find(x => x.stockId === activeStock.$id)
            // CREATE NEW ASSET DOC IF NOT EXIST` 
            if (!exist) {
                console.log('Creating new asset')
                api.database.createDocument('asset', 'unique()', {
                    ownerId: user.$id,
                    stockName: activeStock.name,
                    shares: intent,
                    averageCost: activeStock.currentPrice,
                    stockId: activeStock.$id
                })
            }
            // UPDATE ASSET DOC IF ASSET EXIST
            else {
                console.log('Updating asset')
                let newShares
                let newAvgCost=exist.averageCost
                if (action === 'sell') newShares = exist.shares - intent
                else {
                    newShares = exist.shares + intent
                    newAvgCost=(exist.shares*exist.averageCost+intent*activeStock.currentPrice)/(intent+exist.shares)

                }
                if (newShares<=0)api.database.deleteDocument('asset', exist.$id)
                else api.database.updateDocument('asset', exist.$id, { shares: newShares,averageCost:newAvgCost })
            }
        }, function (error) {
            console.log(error)
        });
    }
    // FETCH STOCK DATA USING ID THEN SET ACTIVE STOCK TO RES
    const fetchStockData=async()=>{
        let promise=api.database.getDocument('stock',stockId)
        promise.then(function(response){
            setActiveStock(response)
        })
    }
    useEffect(()=>{
        fetchStockData()
    },[stockId])
    return (
        <Backdrop open={open} onClick={() => setOpen(false)} sx={{ position:'fixed',width:'100vw',height:'100vh',top:0,left:0}}>
            {activeStock && 
            <Paper sx={{ p: 4, pointerEvents: 'all', width: '50vw',minWidth:'300px',maxWidth:'600px' }} onClick={(e) => e.stopPropagation()}>
                <StockInfo stockId={stockId}/>
                <Typography variant='body2'>Intent: {intent}</Typography>
                <Slider aria-label="Volume" value={intent} min={1} max={10} onChange={(e) => setIntent(e.target.value)} />
                <FlexBox>
                    <Button onClick={()=>handleAction('sell')}>SELL</Button>
                    <Button onClick={()=>handleAction('buy')}>BUY</Button>
                </FlexBox>
            </Paper>}
        </Backdrop>
    )
}

export default ActionPanel